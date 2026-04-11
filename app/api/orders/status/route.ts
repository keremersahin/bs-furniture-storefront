import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const merchantOid = searchParams.get("merchant_oid")?.trim();

  if (!merchantOid) {
    return NextResponse.json(
      {
        status: "UNKNOWN"
      },
      {
        status: 400,
        headers: {
          "Cache-Control": "no-store"
        }
      }
    );
  }

  const order = await prisma.order.findUnique({
    where: {
      merchantOid
    },
    select: {
      status: true
    }
  });

  return NextResponse.json(
    {
      status: order?.status ?? "UNKNOWN"
    },
    {
      headers: {
        "Cache-Control": "no-store"
      }
    }
  );
}
