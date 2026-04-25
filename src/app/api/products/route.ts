import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { mockProducts } from "@/lib/data/mock-products";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      include: { variants: true },
      orderBy: { createdAt: "desc" },
    });

    if (products.length === 0) {
      return NextResponse.json({ products: mockProducts, source: "mock" });
    }

    return NextResponse.json({ products, source: "database" });
  } catch {
    // During early setup the database may not be reachable; fallback keeps UI operable.
    return NextResponse.json({ products: mockProducts, source: "mock" });
  }
}
