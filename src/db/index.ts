import { PrismaClient } from '@prisma/client';

declare global {
  var chachedPrimsa: PrismaClient;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.chachedPrimsa) global.chachedPrimsa = new PrismaClient();

  prisma = global.chachedPrimsa;
}

export const db = prisma;
