import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import {
  getStorefrontHeroBackgroundProduct,
  getStorefrontHeroCardProduct
} from "@/lib/storefront-products";
import { formatCurrency } from "@/lib/utils";

const fallbackHeroImage = "/uploads/images/1775905635950-img-0817.jpg";

export async function HeroSection() {
  const [heroBackgroundProduct, heroCardProduct] = await Promise.all([
    getStorefrontHeroBackgroundProduct(),
    getStorefrontHeroCardProduct()
  ]);

  const heroImage = heroBackgroundProduct?.images[0]?.url ?? fallbackHeroImage;
  const heroCardImage = heroCardProduct?.images[0]?.url;

  return (
    <section className="relative min-h-[70vh] overflow-hidden bg-[#f3efe8] sm:min-h-[76vh] lg:min-h-0">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt={heroBackgroundProduct?.title ?? "BS Furniture premium interiors hero"}
          fill
          priority
          className="object-cover object-[68%_center] sm:object-[72%_center] lg:object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,18,27,0.9)_0%,rgba(12,18,27,0.74)_38%,rgba(12,18,27,0.38)_62%,rgba(12,18,27,0.08)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(213,169,106,0.24),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.14),transparent_28%)]" />
      </div>

      <div className="relative mx-auto grid min-h-[70vh] max-w-7xl items-start gap-10 overflow-hidden px-6 py-12 sm:min-h-[76vh] sm:py-14 lg:min-h-[82vh] lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:px-8 lg:py-16">
        <div className="max-w-[18rem] space-y-7 pt-8 text-white sm:max-w-[22rem] sm:pt-12 md:max-w-[28rem] lg:max-w-3xl lg:space-y-8 lg:pb-10 lg:pt-0">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/90 backdrop-blur">
            <Sparkles className="h-4 w-4 text-[#d5a96a]" />
            Premium Interiors
          </span>

          <div className="space-y-5">
            <p className="text-sm font-medium uppercase tracking-[0.45em] text-[#d5a96a]">
              BS Furniture
            </p>
            <h1 className="max-w-3xl font-serif text-[3.15rem] leading-[0.95] text-white sm:text-6xl xl:text-7xl">
              Evinizin Ruhunu Kesfedin
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-white/78 md:text-xl">
              Dogal dokular, heykelsi formlar ve premium malzeme secimleriyle yasam
              alanlarini galeri hissi veren sicak bir atmosfere donusturuyoruz.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#121E2A] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_20px_45px_rgba(18,30,42,0.32)] transition hover:bg-[#1a2938]"
            >
              Kesfet
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/18"
            >
              Ozel Koleksiyon Talep Et
            </Link>
          </div>

          <div className="hidden max-w-2xl gap-4 pt-2 sm:grid-cols-3 lg:grid">
            <div className="rounded-[1.75rem] border border-white/12 bg-white/8 px-5 py-5 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.22em] text-white/55">Malzeme</p>
              <p className="mt-3 text-lg font-semibold text-white">Secili premium dokular</p>
            </div>
            <div className="rounded-[1.75rem] border border-white/12 bg-white/8 px-5 py-5 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.22em] text-white/55">Odeme</p>
              <p className="mt-3 text-lg font-semibold text-white">SSL ve 3D Secure hazir</p>
            </div>
            <div className="rounded-[1.75rem] border border-white/12 bg-white/8 px-5 py-5 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.22em] text-white/55">Teslimat</p>
              <p className="mt-3 text-lg font-semibold text-white">Tum Turkiye planli sevkiyat</p>
            </div>
          </div>
        </div>

        <div className="hidden items-end justify-end lg:flex">
          <div className="w-full max-w-md rounded-[2rem] border border-white/18 bg-white/12 p-5 text-white shadow-[0_28px_60px_rgba(6,10,16,0.28)] backdrop-blur-md">
            <div className="mb-5 flex items-center justify-between">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                <ShieldCheck className="h-4 w-4 text-[#d5a96a]" />
                Onerilen Parca
              </span>
              <span className="rounded-full bg-[#d5a96a]/18 px-3 py-1 text-xs font-semibold text-[#f3d7af]">
                Premium Edit
              </span>
            </div>

            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/12 bg-white/8">
              {heroCardImage ? (
                <div className="relative aspect-[4/3]">
                  <Image
                    src={heroCardImage}
                    alt={heroCardProduct?.title ?? "BS Furniture urun gorseli"}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex aspect-[4/3] items-end bg-[radial-gradient(circle_at_top_left,rgba(214,176,122,0.28),transparent_24%),linear-gradient(145deg,rgba(18,30,42,0.88),rgba(30,44,60,0.62))] p-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.32em] text-white/45">
                      Hero Card
                    </p>
                    <p className="mt-3 max-w-[14rem] font-serif text-3xl leading-tight text-white">
                      Farkli bir urunu hero karti icin secebilirsiniz
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3 px-1 pt-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                    Koleksiyon Onerisi
                  </p>
                  <h2 className="mt-2 font-serif text-3xl text-white">
                    {heroCardProduct?.title ?? "Hero Karti Icin Urun Secin"}
                  </h2>
                </div>
                <p className="text-right text-lg font-semibold text-[#f3d7af]">
                  {heroCardProduct ? formatCurrency(heroCardProduct.price) : "Teklif ile"}
                </p>
              </div>

              <p className="text-sm leading-7 text-white/72">
                {heroCardProduct?.shortDescription ??
                  "Admin panelinde 'Anasayfa One Cikan Karti Yap' secenegini kullanarak bu alana farkli bir urun atayabilirsiniz."}
              </p>

              <div className="flex flex-wrap gap-2 pt-1 text-xs font-medium uppercase tracking-[0.24em] text-white/55">
                <span className="rounded-full border border-white/12 px-3 py-2">
                  {heroCardProduct?.categoryName ?? "Koleksiyon"}
                </span>
                <span className="rounded-full border border-white/12 px-3 py-2">
                  BS Furniture Edit
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
