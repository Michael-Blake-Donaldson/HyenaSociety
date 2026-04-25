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

export async function requireAdminUser() {
  const requestHeaders = await headers();
  const token = parseBearerToken(requestHeaders.get("authorization"));

  if (!token) {
    return null;
  }

  try {
    const payload = verifyAuthToken(token);
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, role: true },
    });

    if (!user || user.role !== "ADMIN") {
      return null;
    }

    return user;
  } catch {
    return null;
  }
}
