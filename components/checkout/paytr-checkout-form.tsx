"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useActionState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { initializePaytrCheckoutAction } from "@/app/checkout/actions";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";

const initialState = {
  error: undefined,
  fieldErrors: undefined,
  iframeToken: undefined,
  merchantOid: undefined,
  values: undefined
};

const premiumEase = [0.22, 1, 0.36, 1] as const;

function getInputClassName(hasError: boolean) {
  return clsx(
    "w-full rounded-2xl border px-4 py-3 outline-none transition",
    hasError
      ? "border-red-300 bg-red-50/70 text-red-950 placeholder:text-red-400 focus:border-red-500"
      : "border-slate-300 bg-white focus:border-brand"
  );
}

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) {
    return null;
  }

  return <p className="mt-2 text-xs font-medium text-red-600">{errors[0]}</p>;
}

export function PaytrCheckoutForm() {
  const items = useCartStore((state) => state.items);
  const hydrated = useCartStore((state) => state.hydrated);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const [state, formAction, pending] = useActionState(
    initializePaytrCheckoutAction,
    initialState
  );

  const cartPayload = JSON.stringify(
    items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity
    }))
  );

  const estimatedTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const hasFieldErrors = Boolean(
    state.fieldErrors &&
      Object.values(state.fieldErrors).some((messages) => Array.isArray(messages) && messages.length > 0)
  );

  if (!hydrated) {
    return (
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-card">
        <h1 className="font-serif text-4xl text-slate-950">Sepet Yukleniyor</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          Tarayicidaki sepet verisi hazirlaniyor. Birkac saniye icinde odeme ekrani aktif
          hale gelecektir.
        </p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-card">
        <h1 className="font-serif text-4xl text-slate-950">Sepetiniz Bos</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          Odeme adimina gecmeden once urun eklemeniz gerekiyor. Urun detay sayfasindan
          sepete urun eklediginizde bu alan otomatik dolacaktir.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
        >
          Urunlere Git
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
      <form
        action={formAction}
        className="space-y-6 rounded-[2rem] border border-slate-200 bg-slate-50 p-8"
      >
        <div>
          <h1 className="font-serif text-4xl text-slate-950">Odeme Adimi</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Sepetteki urun kimlikleri sunucuda tekrar dogrulanir, fiyatlar veritabanindan
            okunur ve PayTR tokeni yalnizca server-side tarafta olusturulur.
          </p>
        </div>

        {state.error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            <p className="font-semibold text-red-800">Formu tekrar kontrol edelim</p>
            <p className="mt-1 leading-6">{state.error}</p>
            {hasFieldErrors ? (
              <p className="mt-2 text-xs text-red-600">
                Isaretlenen alanlari duzelttiginizde odeme adimina sorunsuz devam edebiliriz.
              </p>
            ) : null}
          </div>
        ) : null}

        {state.merchantOid ? (
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
            Siparis kaydi hazirlandi. Merchant OID: <strong>{state.merchantOid}</strong>
          </div>
        ) : null}

        <input type="hidden" name="cartPayload" value={cartPayload} readOnly />

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Ad Soyad</span>
            <input
              type="text"
              name="customerName"
              placeholder="Ad Soyad"
              required
              defaultValue={state.values?.customerName ?? ""}
              aria-invalid={Boolean(state.fieldErrors?.customerName)}
              className={getInputClassName(Boolean(state.fieldErrors?.customerName))}
            />
            <FieldError errors={state.fieldErrors?.customerName} />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Telefon</span>
            <input
              type="tel"
              name="phone"
              placeholder="Telefon"
              required
              defaultValue={state.values?.phone ?? ""}
              aria-invalid={Boolean(state.fieldErrors?.phone)}
              className={getInputClassName(Boolean(state.fieldErrors?.phone))}
            />
            <FieldError errors={state.fieldErrors?.phone} />
          </label>
          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-700">E-posta</span>
            <input
              type="email"
              name="email"
              placeholder="E-posta"
              required
              defaultValue={state.values?.email ?? ""}
              aria-invalid={Boolean(state.fieldErrors?.email)}
              className={getInputClassName(Boolean(state.fieldErrors?.email))}
            />
            <FieldError errors={state.fieldErrors?.email} />
          </label>
          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-700">Teslimat adresi</span>
            <textarea
              rows={4}
              name="address"
              placeholder="Teslimat adresi"
              required
              defaultValue={state.values?.address ?? ""}
              aria-invalid={Boolean(state.fieldErrors?.address)}
              className={clsx(
                getInputClassName(Boolean(state.fieldErrors?.address)),
                "min-h-28 md:col-span-2"
              )}
            />
            <FieldError errors={state.fieldErrors?.address} />
          </label>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? "PayTR odemesi hazirlaniyor..." : "Guvenli Odemeye Gec"}
        </button>

        {state.iframeToken ? (
          <div className="space-y-4 rounded-[2rem] border border-slate-200 bg-white p-5">
            <div>
              <h2 className="font-serif text-3xl text-slate-950">PayTR Odeme Formu</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Odeme formu iFrame icinde guvenli olarak yuklenir. Kesin odeme sonucu
                callback endpointi uzerinden siparis kaydina yazilir.
              </p>
            </div>

            <Script
              src="https://www.paytr.com/js/iframeResizer.min.js"
              strategy="afterInteractive"
            />
            <iframe
              src={`https://www.paytr.com/odeme/guvenli/${state.iframeToken}`}
              id="paytriframe"
              frameBorder="0"
              scrolling="no"
              className="min-h-[600px] w-full rounded-3xl"
            />
            <Script id="paytr-iframe-resize" strategy="afterInteractive">
              {`if (typeof iFrameResize !== "undefined") { iFrameResize({}, "#paytriframe"); }`}
            </Script>
          </div>
        ) : null}
      </form>

      <div className="rounded-[2rem] border border-slate-200 bg-brand p-8 text-white shadow-card">
        <p className="text-sm uppercase tracking-[0.2em] text-white/70">Sepet Ozeti</p>
        <motion.div layout className="mt-6 space-y-4 border-b border-white/15 pb-6">
          <AnimatePresence initial={false} mode="popLayout">
            {items.map((item) => (
              <motion.div
                layout
                key={item.productId}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.96 }}
                transition={{ duration: 0.24, ease: premiumEase }}
                className="rounded-3xl border border-white/10 bg-white/5 p-4"
              >
                <div className="flex items-start gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-white/10">
                    {item.imageUrl ? (
                      <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-sm text-white/75">
                      Birim fiyat: {formatCurrency(item.price)}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="rounded-full border border-white/15 p-2 transition hover:bg-white/10"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-8 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="rounded-full border border-white/15 p-2 transition hover:bg-white/10"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(item.productId)}
                          className="rounded-full border border-white/15 p-2 transition hover:bg-white/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <motion.div layout className="flex items-center justify-between text-sm">
            <span>Kargo</span>
            <span>Ucretsiz</span>
          </motion.div>
        </motion.div>
        <div className="mt-6 flex items-center justify-between text-lg font-semibold">
          <span>Tahmini Toplam</span>
          <span>{formatCurrency(estimatedTotal)}</span>
        </div>
        <p className="mt-6 text-sm leading-7 text-white/75">
          Kesin toplam sunucuda guncel fiyatlarla tekrar hesaplanir. Buradaki tutar sadece
          sepet onizlemesidir.
        </p>
      </div>
    </div>
  );
}
