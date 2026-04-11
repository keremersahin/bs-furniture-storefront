import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

function normalizePassword(password: string) {
  return Buffer.from(password.normalize("NFKC"));
}

export function createPasswordHash(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = scryptSync(normalizePassword(password), salt, 64).toString("hex");
  return `${salt}:${derivedKey}`;
}

export function verifyPassword(password: string, storedHash: string) {
  const [salt, hash] = storedHash.split(":");

  if (!salt || !hash) {
    return false;
  }

  const suppliedKey = scryptSync(normalizePassword(password), salt, 64);
  const storedKey = Buffer.from(hash, "hex");

  if (suppliedKey.length !== storedKey.length) {
    return false;
  }

  return timingSafeEqual(suppliedKey, storedKey);
}

export function safeCompare(firstValue: string, secondValue: string) {
  const first = Buffer.from(firstValue);
  const second = Buffer.from(secondValue);

  if (first.length !== second.length) {
    return false;
  }

  return timingSafeEqual(first, second);
}
