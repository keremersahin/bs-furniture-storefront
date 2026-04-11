import { prisma } from "@/lib/prisma";

export async function getAdminOrders() {
  if (!process.env.DATABASE_URL) {
    return {
      orders: [],
      databaseReady: false
    };
  }

  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc"
      },
      include: {
        items: true
      }
    });

    return {
      orders,
      databaseReady: true
    };
  } catch {
    return {
      orders: [],
      databaseReady: false
    };
  }
}
