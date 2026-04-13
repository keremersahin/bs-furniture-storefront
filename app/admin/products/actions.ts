"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { prisma } from "@/lib/prisma";
import { deleteUploadedFile, saveUploadedFile } from "@/lib/uploads";
import { getCategoryOptionBySlug } from "@/lib/category-options";
import { slugify } from "@/lib/utils";

const MAX_VERCEL_UPLOAD_TOTAL_SIZE = 4 * 1024 * 1024;
const MAX_IMAGE_FILE_SIZE = 4 * 1024 * 1024;
const MAX_CATALOG_FILE_SIZE = 4 * 1024 * 1024;

function getTextField(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function getRequiredField(formData: FormData, key: string, label: string) {
  const value = getTextField(formData, key);

  if (!value) {
    throw new Error(`${label} alani zorunludur.`);
  }

  return value;
}

function getOptionalNumber(formData: FormData, key: string) {
  const value = getTextField(formData, key);

  if (!value) {
    return null;
  }

  const parsed = Number(value.replace(",", "."));

  if (Number.isNaN(parsed)) {
    throw new Error(`${key} alani sayisal olmalidir.`);
  }

  return new Prisma.Decimal(parsed);
}

function getRequiredNumber(formData: FormData, key: string, label: string) {
  const value = getRequiredField(formData, key, label);
  const parsed = Number(value.replace(",", "."));

  if (Number.isNaN(parsed)) {
    throw new Error(`${label} alani sayisal olmalidir.`);
  }

  return parsed;
}

function getFileEntry(formData: FormData, key: string) {
  const value = formData.get(key);
  return value instanceof File && value.size > 0 ? value : null;
}

function getFileEntries(formData: FormData, key: string) {
  return formData
    .getAll(key)
    .filter((value): value is File => value instanceof File && value.size > 0);
}

function assertFileType(
  file: File | null,
  allowedType:
    | {
        startsWith: string;
        label: string;
      }
    | {
        exact: string;
        label: string;
      }
) {
  if (!file) {
    return;
  }

  if ("startsWith" in allowedType && file.type.startsWith(allowedType.startsWith)) {
    return;
  }

  if ("exact" in allowedType && file.type === allowedType.exact) {
    return;
  }

  throw new Error(`${allowedType.label} icin gecerli bir dosya seciniz.`);
}

function assertMaxFileSize(file: File | null, maxBytes: number, label: string) {
  if (!file) {
    return;
  }

  if (file.size > maxBytes) {
    const maxMb = Math.round((maxBytes / (1024 * 1024)) * 10) / 10;
    throw new Error(`${label} en fazla ${maxMb} MB olabilir.`);
  }
}

function assertImageFiles(imageFiles: File[]) {
  imageFiles.forEach((file, index) => {
    const label = `${index + 1}. urun gorseli`;
    assertFileType(file, {
      startsWith: "image/",
      label
    });
    assertMaxFileSize(file, MAX_IMAGE_FILE_SIZE, label);
  });
}

function assertUploadPayloadSize(imageFiles: File[], catalogFile: File | null) {
  const totalBytes =
    imageFiles.reduce((sum, file) => sum + file.size, 0) + (catalogFile?.size ?? 0);

  if (totalBytes > MAX_VERCEL_UPLOAD_TOTAL_SIZE) {
    throw new Error(
      "Secilen dosyalarin toplam boyutu Vercel canli limitleri nedeniyle en fazla 4 MB olabilir."
    );
  }
}

function buildErrorRedirect(pathname: string, message: string) {
  return `${pathname}?error=${encodeURIComponent(message)}`;
}

function getActionErrorMessage(error: unknown, fallbackMessage: string) {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002" &&
    Array.isArray(error.meta?.target)
  ) {
    const targets = error.meta.target.join(", ");

    if (targets.includes("slug")) {
      return "Bu slug zaten kullaniliyor. Lutfen farkli bir slug giriniz.";
    }

    if (targets.includes("sku")) {
      return "Bu SKU zaten kullaniliyor. Lutfen farkli bir SKU giriniz.";
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
}

async function ensureCategory(categorySlug: string) {
  const categoryOption = getCategoryOptionBySlug(categorySlug);

  if (!categoryOption) {
    const existingCategory = await prisma.category.findUnique({
      where: {
        slug: categorySlug
      }
    });

    if (existingCategory) {
      return existingCategory;
    }

    throw new Error("Gecerli bir kategori seciniz.");
  }

  return prisma.category.upsert({
    where: {
      slug: categoryOption.slug
    },
    update: {
      name: categoryOption.name,
      description: categoryOption.description,
      isActive: true,
      sortOrder: categoryOption.sortOrder
    },
    create: {
      name: categoryOption.name,
      slug: categoryOption.slug,
      description: categoryOption.description,
      isActive: true,
      sortOrder: categoryOption.sortOrder
    }
  });
}

function getBaseProductData(formData: FormData, categoryId: string) {
  const title = getRequiredField(formData, "title", "Baslik");
  const rawSlug = getTextField(formData, "slug");
  const shortDescription = getRequiredField(
    formData,
    "shortDescription",
    "Kisa aciklama"
  );
  const description = getRequiredField(formData, "description", "Aciklama");
  const sku = getRequiredField(formData, "sku", "SKU");
  const stock = Math.trunc(getRequiredNumber(formData, "stock", "Stok"));

  return {
    title,
    slug: rawSlug ? slugify(rawSlug) : slugify(title),
    shortDescription,
    description,
    sku,
    price: new Prisma.Decimal(getRequiredNumber(formData, "price", "Fiyat")),
    compareAtPrice: getOptionalNumber(formData, "compareAtPrice"),
    stock,
    materials: getTextField(formData, "materials") || null,
    dimensions: getTextField(formData, "dimensions") || null,
    isFeatured: formData.get("isFeatured") === "on",
    isHeroBackground: formData.get("isHeroBackground") === "on",
    isHeroCard: formData.get("isHeroCard") === "on",
    isPublished: formData.get("isPublished") === "on",
    currency: "TRY",
    categoryId
  };
}

export async function createProductAction(formData: FormData) {
  if (!process.env.DATABASE_URL) {
    redirect(
      buildErrorRedirect("/admin/products", "DATABASE_URL ayarlanmadan kayit yapilamaz.")
    );
  }

  try {
    const categorySlug = getRequiredField(formData, "categorySlug", "Kategori");
    const category = await ensureCategory(categorySlug);
    const imageFiles = getFileEntries(formData, "imageFiles");
    const catalogFile = getFileEntry(formData, "catalogFile");

    if (imageFiles.length === 0) {
      throw new Error("En az bir urun gorseli seciniz.");
    }

    assertImageFiles(imageFiles);
    assertFileType(catalogFile, {
      exact: "application/pdf",
      label: "PDF katalog"
    });
    assertMaxFileSize(catalogFile, MAX_CATALOG_FILE_SIZE, "PDF katalog");
    assertUploadPayloadSize(imageFiles, catalogFile);

    const baseData = getBaseProductData(formData, category.id);
    const imageAlt = getTextField(formData, "imageAlt") || baseData.title;
    let imageUrls: string[] = [];
    let catalogPdfUrl: string | null = null;

    try {
      imageUrls = (
        await Promise.all(
          imageFiles.map((file) => saveUploadedFile(file, "images", ".jpg"))
        )
      ).filter((url): url is string => Boolean(url));
      catalogPdfUrl = await saveUploadedFile(catalogFile, "catalogs", ".pdf");

      await prisma.product.create({
        data: {
          ...baseData,
          catalogPdfUrl,
          images: {
            create: imageUrls.map((url, index) => ({
              url,
              alt: imageUrls.length > 1 ? `${imageAlt} ${index + 1}` : imageAlt,
              sortOrder: index
            }))
          }
        }
      });
    } catch (error) {
      await Promise.all(imageUrls.map((imageUrl) => deleteUploadedFile(imageUrl)));
      await deleteUploadedFile(catalogPdfUrl);
      throw error;
    }

    revalidatePath("/admin/products");
    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath(`/products/${baseData.slug}`);
    redirect("/admin/products?status=created");
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    const message = getActionErrorMessage(error, "Urun eklenirken bir hata olustu.");
    redirect(buildErrorRedirect("/admin/products", message));
  }
}

export async function updateProductAction(productId: string, formData: FormData) {
  if (!process.env.DATABASE_URL) {
    redirect(
      buildErrorRedirect(
        `/admin/products/${productId}`,
        "DATABASE_URL ayarlanmadan guncelleme yapilamaz."
      )
    );
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        images: {
          orderBy: { sortOrder: "asc" }
        }
      }
    });

    if (!product) {
      throw new Error("Urun bulunamadi.");
    }

    const categorySlug = getRequiredField(formData, "categorySlug", "Kategori");
    const category = await ensureCategory(categorySlug);
    const baseData = getBaseProductData(formData, category.id);
    const imageFiles = getFileEntries(formData, "imageFiles");
    const catalogFile = getFileEntry(formData, "catalogFile");
    const imageAlt = getTextField(formData, "imageAlt") || baseData.title;

    assertImageFiles(imageFiles);
    assertFileType(catalogFile, {
      exact: "application/pdf",
      label: "PDF katalog"
    });
    assertMaxFileSize(catalogFile, MAX_CATALOG_FILE_SIZE, "PDF katalog");
    assertUploadPayloadSize(imageFiles, catalogFile);

    let catalogPdfUrl = product.catalogPdfUrl;
    let uploadedImageUrls: string[] = [];
    let uploadedCatalogUrl: string | null = null;

    if (imageFiles.length > 0) {
      uploadedImageUrls = (
        await Promise.all(
          imageFiles.map((file) => saveUploadedFile(file, "images", ".jpg"))
        )
      ).filter((url): url is string => Boolean(url));
    }

    if (catalogFile) {
      uploadedCatalogUrl = await saveUploadedFile(catalogFile, "catalogs", ".pdf");
      catalogPdfUrl = uploadedCatalogUrl;
    }

    try {
      await prisma.product.update({
        where: { id: productId },
        data: {
          ...baseData,
          catalogPdfUrl
        }
      });

      if (uploadedImageUrls.length > 0) {
        await prisma.productImage.deleteMany({
          where: {
            productId
          }
        });

        await prisma.productImage.createMany({
          data: uploadedImageUrls.map((url, index) => ({
            productId,
            url,
            alt: uploadedImageUrls.length > 1 ? `${imageAlt} ${index + 1}` : imageAlt,
            sortOrder: index
          }))
        });
      }

      if (uploadedImageUrls.length > 0) {
        await Promise.all(
          product.images.map((image) => deleteUploadedFile(image.url))
        );
      }

      if (uploadedCatalogUrl) {
        await deleteUploadedFile(product.catalogPdfUrl);
      }
    } catch (error) {
      await Promise.all(
        uploadedImageUrls.map((uploadedImageUrl) => deleteUploadedFile(uploadedImageUrl))
      );
      await deleteUploadedFile(uploadedCatalogUrl);
      throw error;
    }

    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${productId}`);
    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath(`/products/${product.slug}`);
    revalidatePath(`/products/${baseData.slug}`);
    redirect(`/admin/products/${productId}?status=updated`);
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    const message = getActionErrorMessage(error, "Urun guncellenirken bir hata olustu.");
    redirect(buildErrorRedirect(`/admin/products/${productId}`, message));
  }
}

export async function deleteProductAction(productId: string) {
  if (!process.env.DATABASE_URL) {
    redirect(
      buildErrorRedirect("/admin/products", "DATABASE_URL ayarlanmadan silme yapilamaz.")
    );
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        images: true
      }
    });

    if (!product) {
      throw new Error("Silinecek urun bulunamadi.");
    }

    const imageUrls = product.images.map((image) => image.url);
    const catalogUrl = product.catalogPdfUrl;

    await prisma.product.delete({
      where: { id: productId }
    });

    await Promise.all(imageUrls.map((imageUrl) => deleteUploadedFile(imageUrl)));
    await deleteUploadedFile(catalogUrl);

    revalidatePath("/admin/products");
    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath(`/products/${product.slug}`);
    redirect("/admin/products?status=deleted");
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    const message = getActionErrorMessage(error, "Urun silinirken bir hata olustu.");
    redirect(buildErrorRedirect("/admin/products", message));
  }
}
