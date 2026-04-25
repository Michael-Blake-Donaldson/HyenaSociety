import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth/require-admin";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  const admin = await requireAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [orderCount, paidOrderCount, totalsByStatus] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: "PAID" } }),
    prisma.order.groupBy({
      by: ["status"],
      _sum: { total: true },
    }),
  ]);

  const revenueCents = totalsByStatus.reduce((sum, row) => sum + (row._sum.total ?? 0), 0);

  return NextResponse.json({
    metrics: {
      orderCount,
      paidOrderCount,
      revenueCents,
      averageOrderValueCents: orderCount > 0 ? Math.round(revenueCents / orderCount) : 0,
      totalsByStatus,
    },
  });
}
