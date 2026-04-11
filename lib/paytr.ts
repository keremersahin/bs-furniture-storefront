import { createHmac, timingSafeEqual } from "crypto";

type PaytrTokenPayload = {
  merchantId: string;
  userIp: string;
  merchantOid: string;
  email: string;
  paymentAmount: number;
  userBasket: string;
  noInstallment: 0 | 1;
  maxInstallment: number;
  currency: string;
  testMode: 0 | 1;
};

type PaytrCallbackPayload = {
  merchant_oid: string;
  status: string;
  total_amount: string;
  hash: string;
};

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} tanimlanmamis.`);
  }

  return value;
}

export function getPaytrConfig() {
  return {
    merchantId: getRequiredEnv("PAYTR_MERCHANT_ID"),
    merchantKey: getRequiredEnv("PAYTR_MERCHANT_KEY"),
    merchantSalt: getRequiredEnv("PAYTR_MERCHANT_SALT"),
    testMode: process.env.PAYTR_TEST_MODE === "1" ? 1 : 0,
    debugOn: process.env.PAYTR_DEBUG === "1" ? 1 : 0,
    timeoutLimit: Number(process.env.PAYTR_TIMEOUT_LIMIT ?? "30"),
    noInstallment: process.env.PAYTR_NO_INSTALLMENT === "1" ? 1 : 0,
    maxInstallment: Number(process.env.PAYTR_MAX_INSTALLMENT ?? "0"),
    currency: process.env.PAYTR_CURRENCY ?? "TL",
    lang: process.env.PAYTR_LANG ?? "tr"
  } as const;
}

export function encodeUserBasket(
  items: Array<{
    title: string;
    unitPrice: number;
    quantity: number;
  }>
) {
  const basket = items.map((item) => [
    item.title,
    item.unitPrice.toFixed(2),
    item.quantity
  ]);

  return Buffer.from(JSON.stringify(basket)).toString("base64");
}

export function createPaytrToken(payload: PaytrTokenPayload) {
  const { merchantKey, merchantSalt } = getPaytrConfig();
  const hashString =
    payload.merchantId +
    payload.userIp +
    payload.merchantOid +
    payload.email +
    String(payload.paymentAmount) +
    payload.userBasket +
    String(payload.noInstallment) +
    String(payload.maxInstallment) +
    payload.currency +
    String(payload.testMode);

  return createHmac("sha256", merchantKey)
    .update(hashString + merchantSalt)
    .digest("base64");
}

export function verifyPaytrCallbackHash(payload: PaytrCallbackPayload) {
  const { merchantKey, merchantSalt } = getPaytrConfig();
  const token = createHmac("sha256", merchantKey)
    .update(payload.merchant_oid + merchantSalt + payload.status + payload.total_amount)
    .digest("base64");

  const tokenBuffer = Buffer.from(token, "utf8");
  const hashBuffer = Buffer.from(payload.hash, "utf8");

  if (tokenBuffer.length !== hashBuffer.length) {
    return false;
  }

  return timingSafeEqual(tokenBuffer, hashBuffer);
}
