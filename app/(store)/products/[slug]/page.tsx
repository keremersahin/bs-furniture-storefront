import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Download, ShieldCheck, Truck } from "lucide-react";
import { ProductGallery } from "@/components/product/product-gallery";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { ProductWhatsappButton } from "@/components/product/product-whatsapp-button";
import { getStorefrontProductBySlug } from "@/lib/storefront-products";
import { buildWhatsappUrl, getSiteUrl } from "@/lib/whatsapp";
import { formatCurrency } from "@/lib/utils";

type ProductDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getStorefrontProductBySlug(slug);

  if (!product) {
    return {
      title: "Urun Bulunamadi | BS Furniture",
      description: "Aradiginiz urun yayinda degil veya bulunamadi."
    };
  }

  return {
    title: `${product.title} | BS Furniture`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.title} | BS Furniture`,
      description: product.shortDescription,
      images: product.images[0]
        ? [
            {
              url: product.images[0].url,
              alt: product.images[0].alt
            }
          ]
        : undefined
    }
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getStorefrontProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const productUrl = `${getSiteUrl()}/products/${product.slug}`;
  const whatsappHref = buildWhatsappUrl(
    `Merhaba, ${product.title} (Link: ${productUrl}) hakkinda bilgi alabilir miyim?`
  );

  return (
    <section className="bg-white py-16">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <ProductGallery images={product.images} />

        <div className="space-y-8">
          <div className="space-y-4">
            <span className="inline-flex rounded-full bg-brand/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              {product.categoryName}
            </span>
            <h1 className="font-serif text-4xl text-slate-950 md:text-5xl">{product.title}</h1>
            <p className="text-lg leading-8 text-slate-600">{product.description}</p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Satis Fiyati</p>
                <p className="mt-2 text-4xl font-semibold text-brand">
                  {formatCurrency(product.price)}
                </p>
              </div>
              <div className="rounded-2xl bg-white px-4 py-3 text-sm text-slate-700">
                {product.stock > 0 ? `${product.stock} adet stokta` : "Stok tukenmis"}
              </div>
            </div>

            <div className="mt-6 grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-4">
                <p className="font-semibold text-slate-900">Malzeme</p>
                <p className="mt-2 leading-6">{product.materials || "Bilgi yakinda eklenecek."}</p>
              </div>
              <div className="rounded-2xl bg-white p-4">
                <p className="font-semibold text-slate-900">Olculer</p>
                <p className="mt-2 leading-6">{product.dimensions || "Bilgi yakinda eklenecek."}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <AddToCartButton
              product={{
                id: product.id,
                slug: product.slug,
                title: product.title,
                price: product.price,
                imageUrl: product.images[0]?.url
              }}
            />

            <ProductWhatsappButton href={whatsappHref} />

            {product.catalogUrl ? (
              <Link
                href={product.catalogUrl}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-6 py-4 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand"
              >
                <Download className="h-4 w-4" />
                Katalogu Indir (PDF)
              </Link>
            ) : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 p-4">
              <ShieldCheck className="h-5 w-5 text-brand" />
              <p className="mt-3 text-sm font-semibold text-slate-900">Guvenli Odeme</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                3D Secure destekli odeme akisina hazir.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 p-4">
              <Truck className="h-5 w-5 text-brand" />
              <p className="mt-3 text-sm font-semibold text-slate-900">Teslimat Plani</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Turkiye genelinde kurulum ve sevkiyat planlamasi.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 p-4">
              <Download className="h-5 w-5 text-brand" />
              <p className="mt-3 text-sm font-semibold text-slate-900">PDF Katalog</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Teknik cizimler ve ek urun detaylari katalogta sunulur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
