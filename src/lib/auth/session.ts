import { cookies, headers } from "next/headers";
import { prisma } from "@/lib/db/prisma";
import { verifyAuthToken } from "@/lib/auth/jwt";

export const AUTH_COOKIE_NAME = "hyena.session";

export const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
};

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

export async function getRequestAuthToken() {
  const cookieStore = await cookies();
  const cookieToken = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (cookieToken) {
    return cookieToken;
  }

  const requestHeaders = await headers();
  return parseBearerToken(requestHeaders.get("authorization"));
}

export async function getSessionUserId() {
  const token = await getRequestAuthToken();

  if (!token) {
    return null;
  }

  try {
    const payload = verifyAuthToken(token);
    return payload.userId;
  } catch {
    return null;
  }
}

export async function getSessionUser() {
  const token = await getRequestAuthToken();

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
