import { getSessionUserId } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

export async function requireAdminUser() {
  const userId = await getSessionUserId();

  if (!userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, role: true },
  });

  if (!user || user.role !== "ADMIN") {
    return null;
  }

  return user;
}
