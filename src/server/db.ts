import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

/**
 * Shared Prisma client (Next.js dev-safe singleton).
 *
 * Milestone 0: the schema intentionally contains no business models yet.
 * Database tables arrive with later milestones. Do not import this client
 * in client components.
 */
export const db: PrismaClient = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
