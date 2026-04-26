import { PrismaClient } from "@prisma/client";
import { env } from "@/lib/env";

// Validate env vars at import time
void env;

declare global {
  var prismaClient: PrismaClient | undefined;
}

export const prisma =
  global.prismaClient ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prismaClient = prisma;
}

// Export singleton for compatibility
export default prisma;
