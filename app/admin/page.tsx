import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] bg-white p-8 shadow-card">
        <h1 className="font-serif text-4xl text-slate-950">Admin Dashboard</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          Buradan urun CRUD akisina gecip mobilya katalogunu yonetebilir, siparis
          ekranina ilerleyebilir ve odeme oncesi gerekli vitrin iceriklerini duzenleyebilirsiniz.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Link
          href="/admin/products"
          className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card transition hover:-translate-y-1"
        >
          <h2 className="font-serif text-3xl text-slate-950">Urunler</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Yeni urun ekle, mevcut urunleri duzenle, gorsel ve PDF katalog yukle.
          </p>
        </Link>

        <Link
          href="/admin/orders"
          className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card transition hover:-translate-y-1"
        >
          <h2 className="font-serif text-3xl text-slate-950">Siparisler</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Gelen siparisleri ve odeme durumunu ayri bir panelde takip edin.
          </p>
        </Link>
      </div>
    </section>
  );
}
