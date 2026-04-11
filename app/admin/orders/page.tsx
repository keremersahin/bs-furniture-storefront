import { getAdminOrders } from "@/lib/admin-orders";
import { formatCurrency } from "@/lib/utils";

export default async function AdminOrdersPage() {
  const { orders, databaseReady } = await getAdminOrders();

  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] bg-white p-8 shadow-card">
        <h1 className="font-serif text-4xl text-slate-950">Siparis Yonetimi</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          Checkout asamasinda olusan siparis kayitlari burada listelenir. Bu ekran,
          PayTR odeme sonucu ile durum guncelleme akisi icin temel hazirliktir.
        </p>
      </div>

      {!databaseReady ? (
        <div className="rounded-3xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
          Siparisleri goruntulemek icin once `DATABASE_URL` tanimlanmali ve Prisma
          migration uygulanmalidir.
        </div>
      ) : null}

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl text-slate-950">Gelen siparisler</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Merchant OID, musteri bilgisi, tutar ve odeme durumu bu tablodan takip edilir.
            </p>
          </div>
          <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
            {orders.length} kayit
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead>
              <tr className="text-slate-500">
                <th className="pb-4 pr-4 font-medium">Merchant OID</th>
                <th className="pb-4 pr-4 font-medium">Musteri</th>
                <th className="pb-4 pr-4 font-medium">Tutar</th>
                <th className="pb-4 pr-4 font-medium">Durum</th>
                <th className="pb-4 font-medium">Kalemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="py-4 pr-4 font-semibold text-slate-900">{order.merchantOid}</td>
                  <td className="py-4 pr-4 text-slate-600">
                    <div>
                      <p>{order.customerName}</p>
                      <p>{order.email}</p>
                    </div>
                  </td>
                  <td className="py-4 pr-4 font-semibold text-slate-900">
                    {formatCurrency(Number(order.totalAmount))}
                  </td>
                  <td className="py-4 pr-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        order.status === "PAID"
                          ? "bg-emerald-50 text-emerald-700"
                          : order.status === "FAILED"
                            ? "bg-red-50 text-red-700"
                            : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 text-slate-600">{order.items.length}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {orders.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 px-6 py-10 text-center text-sm text-slate-500">
              Henuz siparis kaydi bulunmuyor.
            </div>
          ) : null}
        </div>
      </section>
    </section>
  );
}
