import { PrismaClient } from "~/generated/prisma";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

/**
 * @description prisma client
 */
export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
