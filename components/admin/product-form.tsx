import type { Category } from "@prisma/client";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { FormSubmitButton } from "@/components/admin/form-submit-button";

type ProductFormImage = {
  id: string;
  url: string;
  alt: string;
};

type ProductFormProduct = {
  id: string;
  title: string;
  slug: string;
  sku: string;
  shortDescription: string;
  description: string;
  price: string;
  compareAtPrice: string;
  stock: number;
  materials: string;
  dimensions: string;
  isFeatured: boolean;
  isHeroBackground: boolean;
  isHeroCard: boolean;
  isPublished: boolean;
  catalogPdfUrl: string | null;
  categorySlug: string;
  images: ProductFormImage[];
  imageAlt: string;
};

type ProductFormProps = {
  title: string;
  description: string;
  submitLabel: string;
  pendingLabel: string;
  action: (formData: FormData) => void | Promise<void>;
  categories: Pick<Category, "id" | "name" | "slug">[];
  product?: ProductFormProduct;
};

export function ProductForm({
  title,
  description,
  submitLabel,
  pendingLabel,
  action,
  categories,
  product
}: ProductFormProps) {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card">
      <div className="space-y-2">
        <h2 className="font-serif text-3xl text-slate-950">{title}</h2>
        <p className="text-sm leading-7 text-slate-600">{description}</p>
      </div>

      <form action={action} className="mt-8 grid gap-5">
        <div className="grid gap-5 xl:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Baslik
            <input
              name="title"
              defaultValue={product?.title}
              required
              className="rounded-2xl border border-slate-300 px-4 py-3 font-normal outline-none transition focus:border-brand"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Slug
            <input
              name="slug"
              defaultValue={product?.slug}
              placeholder="bos birakilirsa basliktan uretilir"
              className="rounded-2xl border border-slate-300 px-4 py-3 font-normal outline-none transition focus:border-brand"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            SKU
            <input
              name="sku"
              defaultValue={product?.sku}
              required
              className="rounded-2xl border border-slate-300 px-4 py-3 font-normal outline-none transition focus:border-brand"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Kategori
            <select
              name="categorySlug"
              defaultValue={product?.categorySlug ?? categories[0]?.slug}
              required
              className="rounded-2xl border border-slate-300 px-4 py-3 font-normal outline-none transition focus:border-brand"
            >
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700 xl:col-span-2">
            Kisa aciklama
            <textarea
              name="shortDescription"
              defaultValue={product?.shortDescription}
              rows={3}
              required
              className="rounded-2xl border border-slate-300 px-4 py-3 font-normal outline-none transition focus:border-brand"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700 xl:col-span-2">
            Aciklama
            <textarea
              name="description"
              defaultValue={product?.description}
              rows={6}
              required
              className="rounded-2xl border border-slate-300 px-4 py-3 font-normal outline-none transition focus:border-brand"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Fiyat
            <input
              name="price"
              type="number"
              step="0.01"
              min="0"
              defaultValue={product?.price}
              required
              className="rounded-2xl border border-slate-300 px-4 py-3 font-normal outline-none transition focus:border-brand"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Eski fiyat
            <input
              name="compareAtPrice"
              type="number"
              step="0.01"
              min="0"
              defaultValue={product?.compareAtPrice}
              className="rounded-2xl border border-slate-300 px-4 py-3 font-normal outline-none transition focus:border-brand"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Stok
            <input
              name="stock"
              type="number"
              min="0"
              defaultValue={product?.stock ?? 0}
              required
              className="rounded-2xl border border-slate-300 px-4 py-3 font-normal outline-none transition focus:border-brand"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Olculer
            <input
              name="dimensions"
              defaultValue={product?.dimensions}
              className="rounded-2xl border border-slate-300 px-4 py-3 font-normal outline-none transition focus:border-brand"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700 xl:col-span-2">
            Malzeme bilgisi
            <input
              name="materials"
              defaultValue={product?.materials}
              className="rounded-2xl border border-slate-300 px-4 py-3 font-normal outline-none transition focus:border-brand"
            />
          </label>

          <ImageUploadField
            required={!product}
            existingImages={product?.images ?? []}
          />

          <label className="grid gap-2 text-sm font-medium text-slate-700 xl:col-span-2">
            Gorsel alt metni
            <input
              name="imageAlt"
              defaultValue={product?.imageAlt}
              className="rounded-2xl border border-slate-300 px-4 py-3 font-normal outline-none transition focus:border-brand"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700 xl:col-span-2">
            PDF katalog
            <input
              name="catalogFile"
              type="file"
              accept="application/pdf"
              className="rounded-2xl border border-dashed border-slate-300 px-4 py-3 font-normal file:mr-4 file:rounded-full file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
            />
            <span className="text-xs font-normal text-slate-500">
              PDF formatinda, en fazla 12 MB.
            </span>
            {product?.catalogPdfUrl ? (
              <a
                href={product.catalogPdfUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex text-sm font-semibold text-brand"
              >
                Mevcut PDF katalogu ac
              </a>
            ) : null}
          </label>
        </div>

        <div className="grid gap-4 rounded-3xl bg-slate-50 p-5 md:grid-cols-2">
          <label className="flex items-center gap-3 text-sm text-slate-700">
            <input
              name="isFeatured"
              type="checkbox"
              defaultChecked={product?.isFeatured ?? false}
              className="h-4 w-4 rounded border-slate-300 text-brand"
            />
            Anasayfada one cikar
          </label>

          <label className="flex items-center gap-3 text-sm text-slate-700">
            <input
              name="isHeroBackground"
              type="checkbox"
              defaultChecked={product?.isHeroBackground ?? false}
              className="h-4 w-4 rounded border-slate-300 text-brand"
            />
            Anasayfa Arka Plani Yap
          </label>

          <label className="flex items-center gap-3 text-sm text-slate-700">
            <input
              name="isHeroCard"
              type="checkbox"
              defaultChecked={product?.isHeroCard ?? false}
              className="h-4 w-4 rounded border-slate-300 text-brand"
            />
            Anasayfa One Cikan Karti Yap
          </label>

          <label className="flex items-center gap-3 text-sm text-slate-700">
            <input
              name="isPublished"
              type="checkbox"
              defaultChecked={product?.isPublished ?? true}
              className="h-4 w-4 rounded border-slate-300 text-brand"
            />
            Urun yayinda olsun
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <FormSubmitButton
            label={submitLabel}
            pendingLabel={pendingLabel}
            variant="primary"
          />
        </div>
      </form>
    </section>
  );
}
