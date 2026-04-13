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
  address: "Mahmudiye, 6. Mobilya Sk. No:14, 16400 İnegöl/Bursa, Türkiye",
  googleMapsEmbedUrl:
    "https://www.google.com/maps?q=Mahmudiye%2C%206.%20Mobilya%20Sk.%20No%3A14%2C%2016400%20%C4%B0neg%C3%B6l%2FBursa%2C%20T%C3%BCrkiye&z=15&output=embed"
} as const;
