// prisma/seeds/shared.ts
import { PrismaClient } from '../generated/client';
import { withAccelerate } from '@prisma/extension-accelerate';

// Verifica se o DATABASE_URL está disponível
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not defined');
}

console.log('DATABASE_URL disponível?', !!databaseUrl);

// Para Prisma Accelerate (prisma+postgres://)
export const prisma = new PrismaClient({
  log: ['error', 'warn'],
  accelerateUrl: databaseUrl,
}).$extends(withAccelerate());

// Prisma base sem extensions para operações de seed
export const prismaBase = new PrismaClient({
  log: ['error', 'warn'],
  accelerateUrl: databaseUrl,
});