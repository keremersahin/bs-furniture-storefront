import { ProductForm } from "@/components/admin/product-form";
import { ProductTable } from "@/components/admin/product-table";
import { StatusBanner } from "@/components/admin/status-banner";
import { createProductAction } from "@/app/admin/products/actions";
import { getAdminCategories, getAdminProducts } from "@/lib/admin-products";

type AdminProductsPageProps = {
  searchParams?: Promise<{
    status?: string;
    error?: string;
  }>;
};

export default async function AdminProductsPage({
  searchParams
}: AdminProductsPageProps) {
  const params = await searchParams;
  const [{ products, databaseReady }, categories] = await Promise.all([
    getAdminProducts(),
    getAdminCategories()
  ]);

  const normalizedProducts = products.map((product) => ({
    id: product.id,
    title: product.title,
    price: Number(product.price),
    stock: product.stock,
    isPublished: product.isPublished,
    categoryName: product.category.name,
    imageUrl: product.images[0]?.url ?? null
  }));

  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] bg-white p-8 shadow-card">
        <h1 className="font-serif text-4xl text-slate-950">Urun Yonetimi</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          Prisma modeline bagli urun CRUD paneli. Gorsel ve PDF katalog dosyalari
          server action ile yuklenir, kategori secimi sabit secim listesinden yonetilir.
        </p>
      </div>

      <StatusBanner status={params?.status} error={params?.error} />

      {!databaseReady ? (
        <div className="rounded-3xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
          Veritabani baglantisi hazir degil. Formu gorebilirsin ancak kayit islemleri icin
          once `.env` icinde `DATABASE_URL` tanimlanmali ve Prisma migration uygulanmali.
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <ProductForm
          title="Yeni urun ekle"
          description="Baslik, fiyat, kategori, stok, birden fazla urun gorseli ve opsiyonel PDF katalog bilgileriyle yeni urun kaydi olusturun."
          submitLabel="Urunu kaydet"
          pendingLabel="Kaydediliyor..."
          action={createProductAction}
          categories={categories}
        />

        <ProductTable products={normalizedProducts} />
      </div>
    </section>
  );
}
