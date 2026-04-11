import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { verifyPaytrCallbackHash } from "@/lib/paytr";
import { sendOrderConfirmationEmail } from "@/lib/email";

export async function POST(request: Request) {
  const formData = await request.formData();
  const merchantOid = String(formData.get("merchant_oid") ?? "");
  const status = String(formData.get("status") ?? "");
  const totalAmount = String(formData.get("total_amount") ?? "");
  const hash = String(formData.get("hash") ?? "");

  if (
    !verifyPaytrCallbackHash({
      merchant_oid: merchantOid,
      status,
      total_amount: totalAmount,
      hash
    })
  ) {
    return new NextResponse("PAYTR hash mismatch", {
      status: 400
    });
  }

  try {
    const callbackResult = await prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({
        where: {
          merchantOid
        },
        include: {
          items: true
        }
      });

      if (!order) {
        throw new Error("Order not found");
      }

      if (status !== "success") {
        if (order.status !== "PAID" && order.status !== "FAILED") {
          await tx.order.update({
            where: {
              id: order.id
            },
            data: {
              status: "FAILED"
            }
          });
        }

        return {
          order,
          shouldSendEmail: false
        };
      }

      if (order.status === "PAID") {
        return {
          order,
          shouldSendEmail: false
        };
      }

      const paymentAmount = Math.round(Number(order.totalAmount) * 100);

      if (paymentAmount !== Number(totalAmount)) {
        throw new Error("PAYTR total amount mismatch");
      }

      const transitionResult = await tx.order.updateMany({
        where: {
          id: order.id,
          status: {
            not: "PAID"
          }
        },
        data: {
          status: "PAID",
          paidAt: new Date()
        }
      });

      if (transitionResult.count === 0) {
        return {
          order,
          shouldSendEmail: false
        };
      }

      for (const item of order.items) {
        if (!item.productId) {
          continue;
        }

        const stockUpdateResult = await tx.product.updateMany({
          where: {
            id: item.productId,
            stock: {
              gte: item.quantity
            }
          },
          data: {
            stock: {
              decrement: item.quantity
            }
          }
        });

        if (stockUpdateResult.count === 0) {
          throw new Error(`Stok guncelleme basarisiz: ${item.productTitle}`);
        }
      }

      return {
        order: {
          ...order,
          status: "PAID" as const,
          paidAt: new Date()
        },
        shouldSendEmail: true
      };
    });

    if (callbackResult.shouldSendEmail) {
      try {
        await sendOrderConfirmationEmail({
          customerName: callbackResult.order.customerName,
          email: callbackResult.order.email,
          merchantOid: callbackResult.order.merchantOid,
          totalAmount: Number(callbackResult.order.totalAmount),
          items: callbackResult.order.items.map((item) => ({
            productTitle: item.productTitle,
            quantity: item.quantity,
            unitPrice: Number(item.unitPrice)
          }))
        });
      } catch (emailError) {
        console.error("Order confirmation email could not be sent", emailError);
      }
    }

    revalidatePath("/admin/orders");
    revalidatePath("/admin/products");
    revalidatePath("/products");
    revalidatePath("/");

    return new NextResponse("OK", {
      status: 200
    });
  } catch (error) {
    console.error("PAYTR callback processing failed", {
      merchantOid,
      status,
      totalAmount,
      error
    });

    return new NextResponse("Callback processing error", {
      status: 500
    });
  }
}
