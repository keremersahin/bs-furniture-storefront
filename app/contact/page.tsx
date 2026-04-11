import { siteConfig } from "@/lib/config";

export default function ContactPage() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-brand/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Iletisim
          </span>
          <h1 className="font-serif text-4xl text-slate-950">
            {siteConfig.companyName} ile dogrudan iletisime gecin
          </h1>
          <div className="space-y-2 text-sm leading-7 text-slate-600">
            <p>Acik Adres: {siteConfig.address}</p>
            <p>Telefon: {siteConfig.phoneDisplay}</p>
            <p>E-posta: {siteConfig.email}</p>
          </div>

          <form className="grid gap-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card">
            <input
              type="text"
              placeholder="Ad Soyad"
              className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-brand"
            />
            <input
              type="email"
              placeholder="E-posta"
              className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-brand"
            />
            <textarea
              placeholder="Mesajiniz"
              rows={5}
              className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-brand"
            />
            <button
              type="submit"
              className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              Mesaji Gonder
            </button>
          </form>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-card">
          <iframe
            title={`${siteConfig.companyName} konum`}
            src={siteConfig.googleMapsEmbedUrl}
            className="h-full min-h-[520px] w-full"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
