import { headers } from "next/headers";

export async function getBaseUrl() {
  if (process.env.APP_URL) {
    return process.env.APP_URL.replace(/\/$/, "");
  }

  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";

  if (!host) {
    throw new Error("APP_URL tanimli degil ve host bilgisi alinamadi.");
  }

  return `${protocol}://${host}`;
}

export async function getUserIpAddress() {
  const requestHeaders = await headers();
  const forwardedFor = requestHeaders.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return (
    requestHeaders.get("x-real-ip") ??
    requestHeaders.get("cf-connecting-ip") ??
    "127.0.0.1"
  );
}
