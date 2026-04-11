const rawPhone = "05396966538";

function formatPhoneForDisplay(phone: string) {
  const digits = phone.replace(/\D/g, "");

  if (digits.length === 11 && digits.startsWith("0")) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 9)} ${digits.slice(9, 11)}`;
  }

  return phone;
}

export const siteConfig = {
  companyName: "BS Furniture",
  email: "ersahinethem@gmail.com",
  phone: rawPhone,
  phoneDisplay: formatPhoneForDisplay(rawPhone),
  address: "Mahmudiye Mahallesi 6. Sokak No:14, Inegol/Bursa",
  googleMapsEmbedUrl:
    "https://www.google.com/maps?q=Mahmudiye%20Mahallesi%206.%20Sokak%20No%3A14%2C%20Inegol%2FBursa&z=15&output=embed"
} as const;
