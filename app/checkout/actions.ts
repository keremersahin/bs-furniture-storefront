"use server";

import { randomBytes } from "crypto";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { prisma } from "@/lib/prisma";
import { createPaytrToken, encodeUserBasket, getPaytrConfig } from "@/lib/paytr";
import { checkRateLimit } from "@/lib/rate-limit";
import { getBaseUrl, getUserIpAddress } from "@/lib/url";
import {
  checkoutCartSchema,
  checkoutCustomerSchema,
  type CheckoutCartItemInput,
  type CheckoutCustomerInput
} from "@/lib/validations/checkout";

type CheckoutActionState = {
  error?: string;
  iframeToken?: string;
  merchantOid?: string;
  fieldErrors?: Partial<Record<keyof CheckoutCustomerInput, string[]>>;
  values?: Omit<CheckoutCustomerInput, "cartPayload">;
};

function getTextField(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function getCheckoutValues(formData: FormData) {
  return {
    customerName: getTextField(formData, "customerName"),
    email: getTextField(formData, "email"),
    phone: getTextField(formData, "phone"),
    address: getTextField(formData, "address")
  };
}

function buildValidationState(
  values: Omit<CheckoutCustomerInput, "cartPayload">,
  error: ZodError<CheckoutCustomerInput>
): CheckoutActionState {
  const flattenedErrors = error.flatten().fieldErrors;

  return {
    error: "Lutfen formdaki alanlari kontrol edip tekrar deneyin.",
    fieldErrors: {
      customerName: flattenedErrors.customerName,
      email: flattenedErrors.email,
      phone: flattenedErrors.phone,
      address: flattenedErrors.address
    },
    values
  };
}

function parseCartPayload(rawValue: string): CheckoutCartItemInput[] {
  let parsed: unknown;

  try {
    parsed = JSON.parse(rawValue);
  } catch {
    throw new Error("Sepet verisi gecersiz.");
  }

  const parseResult = checkoutCartSchema.safeParse(
    Array.isArray(parsed)
      ? parsed.map((item) => ({
          productId: String(item?.productId ?? "").trim(),
          quantity: Math.max(1, Math.trunc(Number(item?.quantity)))
        }))
      : parsed
  );

  if (!parseResult.success) {
    throw new Error(parseResult.error.issues[0]?.message ?? "Sepet verisi gecersiz.");
  }

  const normalizedItems = parseResult.data;

  const quantitiesByProduct = new Map<string, number>();

  for (const item of normalizedItems) {
    quantitiesByProduct.set(
      item.productId,
      (quantitiesByProduct.get(item.productId) ?? 0) + item.quantity
    );
  }

  return Array.from(quantitiesByProduct.entries()).map(([productId, quantity]) => ({
    productId,
    quantity
  }));
}

function generateMerchantOid() {
  return `HNDX-${Date.now()}-${randomBytes(4).toString("hex").toUpperCase()}`;
}

function toMinorUnits(amount: number) {
  return Math.round(amount * 100);
}

function formatRetryAfterMinutes(retryAfterMs: number) {
  const retryAfterMinutes = Math.max(1, Math.ceil(retryAfterMs / 60000));
  return `${retryAfterMinutes} dakika`;
}

export async function initializePaytrCheckoutAction(
  _previousState: CheckoutActionState,
  formData: FormData
): Promise<CheckoutActionState> {
  if (!process.env.DATABASE_URL) {
    return {
      error: "DATABASE_URL ayarlanmadan odeme hazirlanamaz."
    };
  }

  let createdMerchantOid: string | null = null;
  const values = getCheckoutValues(formData);

  try {
    const parsedInput = checkoutCustomerSchema.parse({
      ...values,
      cartPayload: getTextField(formData, "cartPayload")
    });
    const { customerName, email, phone, address, cartPayload } = parsedInput;
    const userIp = await getUserIpAddress();
    const rateLimit = checkRateLimit(`checkout:${userIp}`, {
      maxRequests: 10,
      windowMs: 10 * 60 * 1000
    });

    if (!rateLimit.allowed) {
      throw new Error(
        `Cok fazla odeme denemesi yaptiniz. Lutfen ${formatRetryAfterMinutes(
          rateLimit.retryAfterMs
        )} sonra tekrar deneyin.`
      );
    }

    const cartItems = parseCartPayload(cartPayload);
    const productIds = cartItems.map((item) => item.productId);

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds
        },
        isPublished: true
      },
      include: {
        images: {
          orderBy: {
            sortOrder: "asc"
          },
          take: 1
        }
      }
    });

    const productMap = new Map(products.map((product) => [product.id, product]));

    if (productMap.size !== new Set(productIds).size) {
      throw new Error("Sepetteki bir veya daha fazla urun bulunamadi.");
    }

    const normalizedItems = cartItems.map((item) => {
      const product = productMap.get(item.productId);

      if (!product) {
        throw new Error("Sepetteki urunlerden biri gecersiz.");
      }

      if (product.stock < item.quantity) {
        throw new Error(`${product.title} icin yeterli stok bulunmuyor.`);
      }

      return {
        productId: product.id,
        productTitle: product.title,
        quantity: item.quantity,
        unitPrice: Number(product.price),
        imageUrl: product.images[0]?.url ?? null
      };
    });

    const totalAmount = normalizedItems.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    );
    const paymentAmount = toMinorUnits(totalAmount);
    const merchantOid = generateMerchantOid();
    const baseUrl = await getBaseUrl();
    const paytrConfig = getPaytrConfig();
    const userBasket = encodeUserBasket(
      normalizedItems.map((item) => ({
        title: item.productTitle,
        unitPrice: item.unitPrice,
        quantity: item.quantity
      }))
    );

    await prisma.order.create({
      data: {
        merchantOid,
        customerName,
        email,
        phone,
        address,
        totalAmount: new Prisma.Decimal(totalAmount.toFixed(2)),
        status: "PENDING",
        items: {
          create: normalizedItems.map((item) => ({
            productId: item.productId,
            productTitle: item.productTitle,
            unitPrice: new Prisma.Decimal(item.unitPrice.toFixed(2)),
            quantity: item.quantity,
            imageUrl: item.imageUrl
          }))
        }
      }
    });
    createdMerchantOid = merchantOid;

    const paytrToken = createPaytrToken({
      merchantId: paytrConfig.merchantId,
      userIp,
      merchantOid,
      email,
      paymentAmount,
      userBasket,
      noInstallment: paytrConfig.noInstallment,
      maxInstallment: paytrConfig.maxInstallment,
      currency: paytrConfig.currency,
      testMode: paytrConfig.testMode
    });

    const payload = new URLSearchParams({
      merchant_id: paytrConfig.merchantId,
      user_ip: userIp,
      merchant_oid: merchantOid,
      email,
      payment_amount: String(paymentAmount),
      paytr_token: paytrToken,
      user_basket: userBasket,
      debug_on: String(paytrConfig.debugOn),
      no_installment: String(paytrConfig.noInstallment),
      max_installment: String(paytrConfig.maxInstallment),
      user_name: customerName,
      user_address: address,
      user_phone: phone,
      merchant_ok_url: `${baseUrl}/checkout/success?merchant_oid=${encodeURIComponent(merchantOid)}`,
      merchant_fail_url: `${baseUrl}/checkout/fail?merchant_oid=${encodeURIComponent(merchantOid)}`,
      timeout_limit: String(paytrConfig.timeoutLimit),
      currency: paytrConfig.currency,
      test_mode: String(paytrConfig.testMode),
      lang: paytrConfig.lang,
      iframe_v2: "1"
    });

    const response = await fetch("https://www.paytr.com/odeme/api/get-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: payload.toString(),
      cache: "no-store"
    });

    const result = (await response.json()) as
      | { status: "success"; token: string }
      | { status: "failed"; reason: string };

    if (!response.ok || result.status !== "success" || !("token" in result)) {
      await prisma.order.update({
        where: {
          merchantOid
        },
        data: {
          status: "FAILED"
        }
      });

      return {
        error:
          "reason" in result
            ? `PayTR token olusturma basarisiz: ${result.reason}`
            : "PayTR token olusturma basarisiz.",
        values
      };
    }

    revalidatePath("/admin/orders");

    return {
      error: undefined,
      fieldErrors: undefined,
      iframeToken: result.token,
      merchantOid,
      values
    };
  } catch (error) {
    if (createdMerchantOid) {
      await prisma.order.updateMany({
        where: {
          merchantOid: createdMerchantOid,
          status: "PENDING"
        },
        data: {
          status: "FAILED"
        }
      });
    }

    if (error instanceof ZodError) {
      return buildValidationState(values, error);
    }

    return {
      error:
        error instanceof Error ? error.message : "Odeme hazirlanirken bir hata olustu.",
      values
    };
  }
}
