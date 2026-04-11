import { BadgeCheck, CreditCard, ShieldCheck, Truck } from "lucide-react";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "SSL Güvenliği",
    description: "Tüm ödeme ve form verileri şifreli bağlantı üzerinden iletilir."
  },
  {
    icon: CreditCard,
    title: "3D Secure",
    description: "Türkiye sanal POS süreçleri için güven artıran ödeme akışı."
  },
  {
    icon: Truck,
    title: "Anlaşmalı Kargo",
    description: "Teslimat planı kargo ve lojistik partnerleriyle desteklenir."
  },
  {
    icon: BadgeCheck,
    title: "Yasal Uyum",
    description: "Footer üzerinden erişilebilir sözleşme ve politika sayfaları."
  }
];

export function TrustBar() {
  return (
    <section className="border-t border-slate-200 bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 lg:max-w-2xl">
          <span className="inline-flex self-start rounded-full border border-brand/10 bg-brand/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-brand">
            Confidence Layer
          </span>
          <h2 className="font-serif text-3xl text-slate-950 md:text-4xl">
            Premium interiors deneyimini guven veren altyapiyla tamamliyoruz
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-[1.9rem] border border-slate-200 bg-[#f8f5f0] p-6 shadow-[0_14px_32px_rgba(15,23,42,0.05)]"
              >
                <div className="mb-4 inline-flex rounded-2xl bg-[#121E2A] p-3 text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="font-semibold text-slate-900">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
