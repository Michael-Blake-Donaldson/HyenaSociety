import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { verifyAuthToken } from "@/lib/auth/jwt";
import { prisma } from "@/lib/db/prisma";

function parseBearerToken(authHeader?: string | null) {
  if (!authHeader) {
    return null;
  }

  const [scheme, token] = authHeader.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) {
    return null;
  }

  return token;
}

export async function GET() {
  const requestHeaders = await headers();
  const token = parseBearerToken(requestHeaders.get("authorization"));

  if (!token) {
    return NextResponse.json({ error: "Missing auth token" }, { status: 401 });
  }

  try {
    const payload = verifyAuthToken(token);
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ error: "Invalid auth token" }, { status: 401 });
  }
}
