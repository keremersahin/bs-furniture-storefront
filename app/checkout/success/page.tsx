import { ClearCartOnSuccess } from "@/components/checkout/clear-cart-on-success";

type CheckoutSuccessPageProps = {
  searchParams?: Promise<{
    merchant_oid?: string;
  }>;
};

export default async function CheckoutSuccessPage({
  searchParams
}: CheckoutSuccessPageProps) {
  const params = await searchParams;

  return (
    <section className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
      <ClearCartOnSuccess merchantOid={params?.merchant_oid} />
      <div className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-8 shadow-card">
        <h1 className="font-serif text-4xl text-slate-950">Odeme Sonucu Bekleniyor</h1>
        <p className="mt-4 text-sm leading-7 text-slate-700">
          PayTR sizi basarili sonuc sayfasina yonlendirdi. Siparisinizin kesin durumunu
          arka planda callback bildirimi belirler; admin panelindeki siparis kaydindan da
          takip edebilirsiniz.
        </p>
        {params?.merchant_oid ? (
          <p className="mt-4 text-sm font-semibold text-slate-900">
            Siparis Numaraniz: {params.merchant_oid}
          </p>
        ) : null}
      </div>
    </section>
  );
}
