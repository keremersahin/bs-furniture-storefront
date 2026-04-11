import Link from "next/link";
import { ProductGrid } from "@/components/product/product-grid";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  getStorefrontCategories,
  getStorefrontProductsByCategory
} from "@/lib/storefront-products";

type ProductsPageProps = {
  searchParams?: Promise<{
    category?: string;
  }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const activeCategory = params?.category;
  const [filteredProducts, categories] = await Promise.all([
    getStorefrontProductsByCategory(activeCategory),
    getStorefrontCategories()
  ]);

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl space-y-10 px-6 lg:px-8">
        <SectionHeading
          eyebrow="Ürünler"
          title="Kategoriye göre filtrelenebilen ürün vitrini"
          description="Koltuk Takımı, Sandalye ve Sehpa filtreleriyle müşteri deneyimini sade ve yönlendirici tutan ürün listeleme altyapısı."
        />

        <div className="flex flex-wrap gap-3">
          <Link
            href="/products"
            className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
              !activeCategory
                ? "bg-brand text-white"
                : "border border-slate-300 text-slate-700 hover:border-brand hover:text-brand"
            }`}
          >
            Tümü
          </Link>

          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                activeCategory === category.slug
                  ? "bg-brand text-white"
                  : "border border-slate-300 text-slate-700 hover:border-brand hover:text-brand"
              }`}
            >
              {category.name}
            </Link>
          ))}
        </div>

        {filteredProducts.length > 0 ? (
          <ProductGrid
            products={filteredProducts}
            animationKey={activeCategory ?? "all-products"}
          />
        ) : (
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-8 text-sm leading-7 text-slate-500">
            Bu filtre icin yayinda urun bulunmuyor.
          </div>
        )}
      </div>
    </section>
  );
}
