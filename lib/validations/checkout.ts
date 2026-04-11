import { z } from "zod";

const phonePattern = /^[0-9+\s()\-]{10,20}$/;

export const checkoutCustomerSchema = z.object({
  customerName: z
    .string()
    .trim()
    .min(2, "Ad Soyad en az 2 karakter olmali.")
    .max(100, "Ad Soyad en fazla 100 karakter olabilir."),
  email: z
    .string()
    .trim()
    .min(1, "E-posta alani zorunludur.")
    .email("Gecerli bir e-posta adresi giriniz.")
    .max(255, "E-posta adresi cok uzun."),
  phone: z
    .string()
    .trim()
    .min(1, "Telefon alani zorunludur.")
    .regex(phonePattern, "Telefon numarasini 10-20 karakter olacak sekilde giriniz."),
  address: z
    .string()
    .trim()
    .min(10, "Adres en az 10 karakter olmali.")
    .max(500, "Adres en fazla 500 karakter olabilir."),
  cartPayload: z.string().trim().min(1, "Sepet verisi bulunamadi.")
});

export const checkoutCartItemSchema = z.object({
  productId: z.string().trim().min(1, "Urun kimligi eksik."),
  quantity: z.number().int().min(1, "Urun adedi en az 1 olmali.").max(99, "Urun adedi cok yuksek.")
});

export const checkoutCartSchema = z
  .array(checkoutCartItemSchema)
  .min(1, "Sepet bos olamaz.");

export type CheckoutCustomerInput = z.infer<typeof checkoutCustomerSchema>;
export type CheckoutCartItemInput = z.infer<typeof checkoutCartItemSchema>;
