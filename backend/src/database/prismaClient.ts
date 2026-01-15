import { PrismaClient } from "../../generated/prisma";

declare global {
  var prisma: PrismaClient | undefined;
}

if (global.prisma === undefined) {
  global.prisma = new PrismaClient();
}

export const prisma = global.prisma;