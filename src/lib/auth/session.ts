import { headers } from "next/headers";
import { prisma } from "@/lib/db/prisma";
import { verifyAuthToken } from "@/lib/auth/jwt";

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

export async function getSessionUser() {
  const requestHeaders = await headers();
  const token = parseBearerToken(requestHeaders.get("authorization"));

  if (!token) {
    return null;
  }

  try {
    const payload = verifyAuthToken(token);

    return prisma.user.findUnique({
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
  } catch {
    return null;
  }
}
