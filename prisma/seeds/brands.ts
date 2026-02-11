import { prisma } from './shared';
import { Prisma } from "../generated/client";

export interface BrandSeedResult {
  brands: Prisma.BrandGetPayload<{}>[]
}

export async function seedBrands(): Promise<BrandSeedResult> {
  console.log('🏭 Seeding brands...');

  const brandsData = [
    // Eletrônicos
    { name: 'Samsung' },
    { name: 'Apple' },
    { name: 'Motorola' },
    { name: 'Dell' },
    { name: 'Acer' },
    { name: 'Sony' },
    { name: 'JBL' },
    { name: 'Microsoft' },
    
    // Eletrodomésticos
    { name: 'Philco' },
    { name: 'Mondial' },
    
    // Moda
    { name: 'Dudalina' },
    { name: "Levi's" },
    { name: 'Zara' },
    { name: 'H&M' },
    { name: 'Nike' },
    { name: 'Ferracini' },
    
    // Esportes / Fitness
    { name: 'Movement' },
    { name: 'Iron' },
    
    // Livros
    { name: 'Objetiva' },
    { name: 'Rocco' },
    
    // Marcas adicionais
    { name: 'LG' },
    { name: 'Philips' },
    { name: 'Adidas' },
    { name: 'Puma' },
    { name: 'Logitech' },
    { name: 'Razer' },
    { name: 'Intel' },
    { name: 'AMD' },
    { name: 'Corsair' },
    { name: 'Kingston' },
  ];

  const brands: any[] = [];

  for (const brandData of brandsData) {
    try {
      // Verificar se a marca já existe
      let brand = await prisma.brand.findFirst({
        where: { name: brandData.name }
      });

      if (!brand) {
        brand = await prisma.brand.create({
          data: {
            name: brandData.name
          }
        });
        console.log(`  ✅ Created brand: ${brand.name}`);
      } else {
        console.log(`  ⏭️ Brand already exists: ${brand.name}`);
      }
      
      brands.push(brand);
    } catch (error) {
      console.error(`  ❌ Error creating brand ${brandData.name}:`, error);
      throw error;
    }
  }

  console.log(`🏭✅ Seeded ${brands.length} brands successfully`);
  return { brands };
}