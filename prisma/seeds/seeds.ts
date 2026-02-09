import prisma from '@//app/lib/prisma';
import { seedCategories, SeedCategoriesResult } from './categories';
import { seedProperties } from './properties';
import { seedProducts } from './products';

async function main() {
  console.log('🌱 Starting seed for multi-department store...');
  
  try {
    // 1. Limpar dados existentes (opcional - cuidado em produção!)
    // await cleanDatabase();

    // 2. Seed propriedades
    const propertiesResult = await seedProperties();
    
    // 3. Seed categorias e subcategorias
    const categoriesResult: SeedCategoriesResult = await seedCategories();
    
    // 4. Seed produtos (depende das categorias e propriedades)
    const productsCount = await seedProducts({
      categories: categoriesResult.categories,
      subcategories: categoriesResult.subcategories,
      properties: propertiesResult.properties
    });
    
    // 5. Seed usuários
    // const usersCount = await seedUsers();

    console.log('🎉 Seed completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Categories: ${categoriesResult.categories.length}`);
    console.log(`   - Subcategories: ${categoriesResult.subcategories.length}`);
    console.log(`   - Properties: ${propertiesResult.properties.length}`);
    console.log(`   - Products: ${productsCount}`);
    // console.log(`   - Users: ${usersCount}`);
    
  } catch (error) {
    console.error('❌ Error during seed:', error);
    throw error;
  }
}

// Função para limpar o banco (use com cuidado!)
async function cleanDatabase() {
  console.log('🧹 Cleaning database...');
  
  // Ordem correta devido a constraints de chave estrangeira
  await prisma.order_Item.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cart_Item.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.product_Properties.deleteMany();
  await prisma.property_Options.deleteMany();
  await prisma.property.deleteMany();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();
  await prisma.product.deleteMany();
  await prisma.subcategory.deleteMany();
  await prisma.category.deleteMany();
  
  console.log('✅ Database cleaned');
}

main()
  .catch((error) => {
    console.error('❌ Fatal error during seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });