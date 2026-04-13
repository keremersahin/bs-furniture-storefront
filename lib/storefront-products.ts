import { prisma } from "@/lib/prisma";
import { CATEGORY_OPTIONS } from "@/lib/category-options";
import type { Category, Product } from "@/types";

function decimalToNumber(value: { toNumber?: () => number } | number) {
  return typeof value === "number"
    ? value
    : value.toNumber
      ? value.toNumber()
      : Number(value);
}

function mapProduct(product: {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: { toNumber?: () => number } | number;
  stock: number;
  materials: string | null;
  dimensions: string | null;
  isFeatured: boolean;
  isHeroBackground: boolean;
  isHeroCard: boolean;
  catalogPdfUrl: string | null;
  category: {
    slug: string;
    name: string;
  };
  images: Array<{
    id: string;
    url: string;
    alt: string | null;
  }>;
}): Product {
  return {
    id: product.id,
    title: product.title,
    slug: product.slug,
    shortDescription: product.shortDescription,
    description: product.description,
    price: decimalToNumber(product.price),
    stock: product.stock,
    categorySlug: product.category.slug,
    categoryName: product.category.name,
    materials: product.materials ?? "",
    dimensions: product.dimensions ?? "",
    featured: product.isFeatured,
    isHeroBackground: product.isHeroBackground,
    isHeroCard: product.isHeroCard,
    catalogUrl: product.catalogPdfUrl ?? undefined,
    images: product.images.map((image) => ({
      id: image.id,
      url: image.url,
      alt: image.alt ?? product.title
    }))
  };
}

function mapCategory(category: {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  coverImage: string | null;
}): Category {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description ?? "",
    image: category.coverImage ?? undefined
  };
}

function getStaticStorefrontCategories(): Category[] {
  return CATEGORY_OPTIONS.map((category) => ({
    id: `static-${category.slug}`,
    name: category.name,
    slug: category.slug,
    description: category.description
  }));
}

export async function getStorefrontCategories() {
  try {
    const activeCategories = await prisma.category.findMany({
      where: {
        isActive: true
      },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }]
    });

    if (activeCategories.length > 0) {
      return activeCategories.map(mapCategory);
    }

    const publishedProductCategories = await prisma.category.findMany({
      where: {
        products: {
          some: {
            isPublished: true
          }
        }
      },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }]
    });

    if (publishedProductCategories.length > 0) {
      return publishedProductCategories.map(mapCategory);
    }

    return getStaticStorefrontCategories();
  } catch {
    return getStaticStorefrontCategories();
  }
}

export async function getStorefrontFeaturedProducts() {
  try {
    const dbProducts = await prisma.product.findMany({
      where: {
        isPublished: true,
        isFeatured: true
      },
      orderBy: {
        createdAt: "desc"
      },
      take: 3,
      include: {
        category: true,
        images: {
          orderBy: {
            sortOrder: "asc"
          }
        }
      }
    });

    return dbProducts.map(mapProduct);
  } catch {
    return [];
  }
}

export async function getStorefrontHeroBackgroundProduct() {
  try {
    const dbProduct = await prisma.product.findFirst({
      where: {
        isPublished: true,
        isHeroBackground: true
      },
      orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
      include: {
        category: true,
        images: {
          orderBy: {
            sortOrder: "asc"
          }
        }
      }
    });

    return dbProduct ? mapProduct(dbProduct) : undefined;
  } catch {
    return undefined;
  }
}

export async function getStorefrontHeroCardProduct() {
  try {
    const dbProduct = await prisma.product.findFirst({
      where: {
        isPublished: true,
        isHeroCard: true
      },
      orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
      include: {
        category: true,
        images: {
          orderBy: {
            sortOrder: "asc"
          }
        }
      }
    });

    return dbProduct ? mapProduct(dbProduct) : undefined;
  } catch {
    return undefined;
  }
}

export async function getStorefrontProductsByCategory(category?: string) {
  try {
    const dbProducts = await prisma.product.findMany({
      where: {
        isPublished: true,
        ...(category
          ? {
              category: {
                slug: category
              }
            }
          : {})
      },
      orderBy: {
        createdAt: "desc"
      },
      include: {
        category: true,
        images: {
          orderBy: {
            sortOrder: "asc"
          }
        }
      }
    });

    return dbProducts.map(mapProduct);
  } catch {
    return [];
  }
}

export async function getStorefrontProductBySlug(slug: string) {
  try {
    const dbProduct = await prisma.product.findUnique({
      where: {
        slug
      },
      include: {
        category: true,
        images: {
          orderBy: {
            sortOrder: "asc"
          }
        }
      }
    });

    if (!dbProduct || !dbProduct.isPublished) {
      return undefined;
    }

    return mapProduct(dbProduct);
  } catch {
    return undefined;
  }
}
