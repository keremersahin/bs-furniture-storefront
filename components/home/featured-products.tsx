import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductGrid } from "@/components/product/product-grid";
import { SectionHeading } from "@/components/ui/section-heading";
import { getStorefrontFeaturedProducts } from "@/lib/storefront-products";

export async function FeaturedProducts() {
  const featuredProducts = await getStorefrontFeaturedProducts();

  return (
    <section className="bg-[#f8f5f0] py-20">
      <div className="mx-auto max-w-7xl space-y-10 px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Curated Selection"
            title="Premium Interiors koleksiyonumuzdan one cikan parcalar"
            description="Yumusak golgeler, daha gorunur sepet aksiyonlari ve premium renk kontrastlariyla vitrin kartlarini yeniden yorumladik."
          />

          <Link
            href="/products"
            className="inline-flex items-center gap-2 self-start rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-brand hover:text-brand"
          >
            Tum urunleri incele
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {featuredProducts.length > 0 ? (
          <ProductGrid products={featuredProducts} animationKey="featured-home" />
        ) : (
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-8 text-sm leading-7 text-slate-500">
            One cikan urun bulunmuyor. Admin panelinden urun ekleyip "Anasayfada one cikar"
            secenegini acabilirsiniz.
          </div>
        )}
      </div>
    </section>
  );
}
