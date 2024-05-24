// global.d.ts
import { ExtendedPrismaClient } from "@/app/types/prisma";

declare global {
  var prisma: ExtendedPrismaClient | undefined;
  var prismaInitializationCount: number;
}

export {};
