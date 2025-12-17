// lib/prisma.ts

import { withAccelerate } from '@prisma/extension-accelerate';
import { PrismaClient } from '../../../prisma/generated/client';

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

function createPrismaClient() {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not defined');
  }

  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    accelerateUrl: databaseUrl,
  }).$extends(withAccelerate());
}

// Criação com configuração adequada
export const prisma = 
  globalForPrisma.prisma ?? 
  createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;