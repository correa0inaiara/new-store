import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['slick-carousel'],
  
  // Configuração atualizada para Next.js 16+
  serverExternalPackages: ['@prisma/client', '@prisma/engines'],
  
  // Configuração vazia do Turbopack para silenciar o warning
  // (a maioria dos apps funciona sem configuração específica)
  turbopack: {},
};

export default nextConfig;