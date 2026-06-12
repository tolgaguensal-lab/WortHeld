import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function findUserById(id: string) {
  return prisma.user.findUnique({ where: { id }, include: { profile: true } });
}

export async function getUserProfile(userId: string) {
  return prisma.userProfile.findUnique({ where: { userId } });
}

export async function getUserProgress(userId: string) {
  return prisma.userProgress.findMany({
    where: { userId },
    include: { lesson: { include: { unit: { include: { course: true } } } } },
    orderBy: { updatedAt: "desc" },
  });
}
