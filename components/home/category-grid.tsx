import Link from "next/link";
import { ArrowUpRight, Armchair, LampDesk, Sofa } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { getStorefrontCategories } from "@/lib/storefront-products";

const categoryVisualMap = {
  "koltuk-takimi": {
    icon: Sofa,
    accent: "from-[#121E2A] via-[#223447] to-[#34485c]",
    glow: "bg-[#121E2A]",
    label: "Lounge Edit"
  },
  sandalye: {
    icon: Armchair,
    accent: "from-[#a76d3a] via-[#be8551] to-[#d3a577]",
    glow: "bg-[#9b6031]",
    label: "Dining Lines"
  },
  sehpa: {
    icon: LampDesk,
    accent: "from-[#d5c0a1] via-[#eadbc7] to-[#f5efe7]",
    glow: "bg-[#c89f66]",
    label: "Accent Layer"
  }
} as const;

const fallbackVisual = {
  icon: Sofa,
  accent: "from-[#121E2A] via-[#223447] to-[#34485c]",
  glow: "bg-[#121E2A]",
  label: "Premium Edit"
};

export async function CategoryGrid() {
  const categories = await getStorefrontCategories();

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl space-y-10 px-6 lg:px-8">
        <SectionHeading
          eyebrow="Shop Popular Categories"
          title="Yasam alaninizi karakterize eden koleksiyonlara tek bakista ulasin"
          description="Koltuk takimi, sandalye ve sehpa secimlerini premium bir showroom hissi veren sade ama etkili kartlarla grupladik."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.length > 0 ? (
            categories.map((category) => {
              const visual = categoryVisualMap[
                category.slug as keyof typeof categoryVisualMap
              ] ?? fallbackVisual;
              const Icon = visual.icon;

              return (
                <Link
                  key={category.id}
                  href={`/products?category=${category.slug}`}
                  className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[#f7f4ef] p-7 shadow-[0_20px_45px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)]"
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-40 bg-gradient-to-br opacity-95 ${visual.accent}`}
                  />
                  <div className="absolute inset-x-5 top-5 flex items-start justify-between">
                    <span className="rounded-full border border-white/25 bg-white/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/92 backdrop-blur">
                      {visual.label}
                    </span>
                    <span className="rounded-full bg-white/12 p-2.5 text-white backdrop-blur">
                      <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>

                  <div className="relative z-10 flex min-h-[270px] flex-col justify-between">
                    <div className="pt-20">
                      <div
                        className={`inline-flex rounded-[1.5rem] p-5 text-white shadow-[0_18px_38px_rgba(15,23,42,0.16)] ${visual.glow}`}
                      >
                        <Icon className="h-10 w-10" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-serif text-4xl leading-none text-slate-950">
                        {category.name}
                      </h3>
                      <p className="max-w-sm text-sm leading-7 text-slate-600">
                        {category.description ||
                          "Bu koleksiyon altindaki premium parcalari, premium interiors kurgusuyla inceleyin."}
                      </p>
                      <div className="flex items-center justify-between pt-1 text-sm font-semibold text-slate-900">
                        <span>Koleksiyonu ac</span>
                        <span className="text-slate-400 transition group-hover:text-brand">
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 p-8 text-sm leading-7 text-slate-500 md:col-span-2 xl:col-span-3">
              Aktif kategori bulunmuyor. Admin paneli uzerinden kategori kayitlarinin olustugundan
              emin olun.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
