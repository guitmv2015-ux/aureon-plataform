import { PrismaClient } from "@prisma/client";

/**
 * Singleton do Prisma Client — evita esgotar conexões do Postgres em
 * desenvolvimento (hot reload do Next.js cria múltiplas instâncias se não
 * for cacheado no objeto global).
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
