import { prisma } from "@/lib/prisma";
import { CATEGORY_OPTIONS } from "@/lib/category-options";

export async function getAdminCategories() {
  if (!process.env.DATABASE_URL) {
    return CATEGORY_OPTIONS.map((category) => ({
      id: category.slug,
      name: category.name,
      slug: category.slug
    }));
  }

  try {
    const categories = await prisma.category.findMany({
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }]
    });

    if (categories.length > 0) {
      return categories;
    }
  } catch {
    return CATEGORY_OPTIONS.map((category) => ({
      id: category.slug,
      name: category.name,
      slug: category.slug
    }));
  }

  return CATEGORY_OPTIONS.map((category) => ({
    id: category.slug,
    name: category.name,
    slug: category.slug
  }));
}

export async function getAdminProducts() {
  if (!process.env.DATABASE_URL) {
    return {
      products: [],
      databaseReady: false
    };
  }

  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        images: {
          orderBy: {
            sortOrder: "asc"
          },
          take: 1
        }
      }
    });

    return {
      products,
      databaseReady: true
    };
  } catch {
    return {
      products: [],
      databaseReady: false
    };
  }
}

export async function getAdminProductById(productId: string) {
  if (!process.env.DATABASE_URL) {
    return {
      product: null,
      databaseReady: false
    };
  }

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId
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

    return {
      product,
      databaseReady: true
    };
  } catch {
    return {
      product: null,
      databaseReady: false
    };
  }
}
