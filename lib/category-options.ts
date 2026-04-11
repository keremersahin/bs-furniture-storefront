export const CATEGORY_OPTIONS = [
  {
    slug: "koltuk-takimi",
    name: "Koltuk Takimi",
    description: "Modern salonlar icin premium koltuk koleksiyonlari.",
    sortOrder: 1
  },
  {
    slug: "sandalye",
    name: "Sandalye",
    description: "Yemek odasi ve yasam alani icin sandalye gruplari.",
    sortOrder: 2
  },
  {
    slug: "sehpa",
    name: "Sehpa",
    description: "Orta sehpa ve yan sehpa alternatifleri.",
    sortOrder: 3
  }
] as const;

export type CategoryOption = (typeof CATEGORY_OPTIONS)[number];

const CATEGORY_SLUG_ALIASES: Record<string, CategoryOption["slug"]> = {
  "koltuk-takimlari": "koltuk-takimi",
  koltuk: "koltuk-takimi",
  sandalyeler: "sandalye",
  sehpalar: "sehpa"
};

export function getCategoryOptionBySlug(slug: string) {
  const normalizedSlug = CATEGORY_SLUG_ALIASES[slug] ?? slug;
  return CATEGORY_OPTIONS.find((option) => option.slug === normalizedSlug);
}
