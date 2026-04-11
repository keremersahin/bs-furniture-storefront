import Image from "next/image";
import Link from "next/link";
import { FormSubmitButton } from "@/components/admin/form-submit-button";
import { formatCurrency } from "@/lib/utils";
import { deleteProductAction } from "@/app/admin/products/actions";

type ProductTableProduct = {
  id: string;
  title: string;
  price: number;
  stock: number;
  isPublished: boolean;
  categoryName: string;
  imageUrl: string | null;
};

type ProductTableProps = {
  products: ProductTableProduct[];
};

export function ProductTable({ products }: ProductTableProps) {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl text-slate-950">Urun tablosu</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            Mevcut urunleri listeleyin, duzenleyin veya silin.
          </p>
        </div>
        <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
          {products.length} kayit
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead>
            <tr className="text-slate-500">
              <th className="pb-4 pr-4 font-medium">Urun</th>
              <th className="pb-4 pr-4 font-medium">Kategori</th>
              <th className="pb-4 pr-4 font-medium">Fiyat</th>
              <th className="pb-4 pr-4 font-medium">Stok</th>
              <th className="pb-4 pr-4 font-medium">Durum</th>
              <th className="pb-4 font-medium">Islemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="py-4 pr-4">
                  <div className="flex items-center gap-4">
                    <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-slate-100">
                      {product.imageUrl ? (
                        <Image
                          src={product.imageUrl}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{product.title}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 pr-4 text-slate-600">{product.categoryName}</td>
                <td className="py-4 pr-4 font-semibold text-slate-900">
                  {formatCurrency(product.price)}
                </td>
                <td className="py-4 pr-4 text-slate-600">{product.stock}</td>
                <td className="py-4 pr-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      product.isPublished
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {product.isPublished ? "Yayinda" : "Taslak"}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-brand hover:text-brand"
                    >
                      Duzenle
                    </Link>
                    <form action={deleteProductAction.bind(null, product.id)}>
                      <FormSubmitButton
                        label="Sil"
                        pendingLabel="Siliniyor..."
                        variant="danger"
                      />
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 px-6 py-10 text-center text-sm text-slate-500">
            Henuz kayitli urun bulunmuyor.
          </div>
        ) : null}
      </div>
    </section>
  );
}
