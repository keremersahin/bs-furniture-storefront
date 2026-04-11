import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { StatusBanner } from "@/components/admin/status-banner";
import { updateProductAction } from "@/app/admin/products/actions";
import { getAdminCategories, getAdminProductById } from "@/lib/admin-products";

type AdminProductEditPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams?: Promise<{
    status?: string;
    error?: string;
  }>;
};

export default async function AdminProductEditPage({
  params,
  searchParams
}: AdminProductEditPageProps) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const [{ product, databaseReady }, categories] = await Promise.all([
    getAdminProductById(id),
    getAdminCategories()
  ]);

  if (!databaseReady) {
    return (
      <section className="space-y-6">
        <div className="rounded-[2rem] bg-white p-8 shadow-card">
          <h1 className="font-serif text-4xl text-slate-950">Urun duzenle</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Bu sayfanin calismasi icin veritabani baglantisi gereklidir.
          </p>
        </div>
      </section>
    );
  }

  if (!product) {
    notFound();
  }

  const editableProduct = {
    id: product.id,
    title: product.title,
    slug: product.slug,
    sku: product.sku,
    shortDescription: product.shortDescription,
    description: product.description,
    price: product.price.toString(),
    compareAtPrice: product.compareAtPrice?.toString() ?? "",
    stock: product.stock,
    materials: product.materials ?? "",
    dimensions: product.dimensions ?? "",
    isFeatured: product.isFeatured,
    isHeroBackground: product.isHeroBackground,
    isHeroCard: product.isHeroCard,
    isPublished: product.isPublished,
    catalogPdfUrl: product.catalogPdfUrl,
    categorySlug: product.category.slug,
    images: product.images.map((image) => ({
      id: image.id,
      url: image.url,
      alt: image.alt ?? product.title
    })),
    imageAlt: product.images[0]?.alt ?? product.title
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[2rem] bg-white p-8 shadow-card">
        <div>
          <h1 className="font-serif text-4xl text-slate-950">Urun duzenle</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Kayitli urun verisini guncelle, yeni gorseller yukle veya PDF katalogu degistir.
          </p>
        </div>

        <Link
          href="/admin/products"
          className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand"
        >
          Listeye don
        </Link>
      </div>

      <StatusBanner status={query?.status} error={query?.error} />

      <ProductForm
        title={product.title}
        description="Alanlari guncelleyip kaydedin. Yeni gorseller secildiginde mevcut galeri yeni liste ile degistirilir."
        submitLabel="Degisiklikleri kaydet"
        pendingLabel="Guncelleniyor..."
        action={updateProductAction.bind(null, product.id)}
        categories={categories}
        product={editableProduct}
      />
    </section>
  );
}
