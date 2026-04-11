import Link from "next/link";

export default function CheckoutFailPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
      <div className="rounded-[2rem] border border-red-200 bg-red-50 p-8 shadow-card">
        <h1 className="font-serif text-4xl text-slate-950">Odeme Tamamlanamadi</h1>
        <p className="mt-4 text-sm leading-7 text-slate-700">
          Odeme adiminda bir sorun olustu veya islem yarida kesildi. Sepetinizi tekrar
          kontrol ederek yeni bir odeme denemesi baslatabilirsiniz.
        </p>
        <Link
          href="/checkout"
          className="mt-6 inline-flex rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
        >
          Odeme Ekranina Don
        </Link>
      </div>
    </section>
  );
}
