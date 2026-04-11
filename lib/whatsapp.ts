const DEFAULT_WHATSAPP_PHONE = "05396966538";

function normalizeWhatsappPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");

  if (digits.startsWith("90")) {
    return digits;
  }

  if (digits.startsWith("0")) {
    return `90${digits.slice(1)}`;
  }

  return digits;
}

export function getWhatsappPhone() {
  return normalizeWhatsappPhone(DEFAULT_WHATSAPP_PHONE);
}

export function buildWhatsappUrl(message?: string) {
  const phone = getWhatsappPhone();

  if (!message) {
    return `https://wa.me/${phone}`;
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function getSiteUrl() {
  return process.env.APP_URL?.replace(/\/$/, "") ?? "http://localhost:3000";
}
