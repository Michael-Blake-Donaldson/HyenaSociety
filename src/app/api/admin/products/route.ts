import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminUser } from "@/lib/auth/require-admin";
import { prisma } from "@/lib/db/prisma";

const updateSchema = z.object({
  productId: z.string(),
  isActive: z.boolean().optional(),
  basePrice: z.number().int().positive().optional(),
});

export async function GET() {
  const admin = await requireAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const products = await prisma.product.findMany({
    include: { variants: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ products });
}

export async function PATCH(request: Request) {
  const admin = await requireAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const json = await request.json();
    const payload = updateSchema.parse(json);

    const product = await prisma.product.update({
      where: { id: payload.productId },
      data: {
        isActive: payload.isActive,
        basePrice: payload.basePrice,
      },
    });

    return NextResponse.json({ product });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid product payload", details: error.flatten() }, { status: 400 });
    }

    return NextResponse.json({ error: "Unable to update product" }, { status: 500 });
  }
}
