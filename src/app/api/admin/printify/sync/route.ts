import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth/require-admin";
import { syncPrintifyProducts } from "@/lib/printify/service";

export async function POST() {
  const admin = await requireAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await syncPrintifyProducts();
    return NextResponse.json({ result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown sync failure";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
