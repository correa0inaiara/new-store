import prisma from "@//app/lib/prisma";
import { Prisma } from "../generated/client";

// prisma/seeds/categories.ts
export interface SeedCategoriesResult {
  categories: Prisma.CategoryGetPayload<{}>[];
  subcategories: Prisma.SubcategoryGetPayload<{}>[];
}

export async function seedCategories(): Promise<SeedCategoriesResult> {
  console.log('🌱 Seeding categories and subcategories...');

  // 1. Criar Categorias principais
  const categories = await prisma.category.createManyAndReturn({
    data: [
      {
        name: 'electronics',
        title: 'Electrônicos',
      },
      {
        name: 'home-appliances', 
        title: 'Eletrodomésticos',
      },
      {
        name: 'fashion',
        title: 'Moda',
      },
      {
        name: 'sports',
        title: 'Esportes',
      },
      {
        name: 'books-media',
        title: 'Livros e Mídia',
      },
    ],
  });

  console.log(`✅ Created ${categories.length} categories`);

  // 2. Criar Subcategorias para cada categoria
  const subcategoriesData = [
    // Eletrônicos
    { name: 'smartphones', title: 'Smartphones', category_id: categories[0].category_id },
    { name: 'laptops', title: 'Notebooks', category_id: categories[0].category_id },
    { name: 'audio', title: 'Áudio', category_id: categories[0].category_id },
    { name: 'gaming', title: 'Games', category_id: categories[0].category_id },
    
    // Eletrodomésticos
    { name: 'kitchen', title: 'Cozinha', category_id: categories[1].category_id },
    { name: 'cleaning', title: 'Limpeza', category_id: categories[1].category_id },
    { name: 'climate', title: 'Climatização', category_id: categories[1].category_id },
    
    // Moda
    { name: 'mens-clothing', title: 'Roupas Masculinas', category_id: categories[2].category_id },
    { name: 'womens-clothing', title: 'Roupas Femininas', category_id: categories[2].category_id },
    { name: 'shoes', title: 'Calçados', category_id: categories[2].category_id },
    { name: 'accessories', title: 'Acessórios', category_id: categories[2].category_id },
    
    // Esportes
    { name: 'fitness', title: 'Fitness', category_id: categories[3].category_id },
    { name: 'outdoor', title: 'Ar Livre', category_id: categories[3].category_id },
    { name: 'team-sports', title: 'Esportes Coletivos', category_id: categories[3].category_id },
    
    // Livros e Mídia
    { name: 'books', title: 'Livros', category_id: categories[4].category_id },
    { name: 'music', title: 'Música', category_id: categories[4].category_id },
    { name: 'movies', title: 'Filmes', category_id: categories[4].category_id },
  ];

  const subcategories = await prisma.subcategory.createManyAndReturn({
    data: subcategoriesData,
  });

  console.log(`✅ Created ${subcategories.length} subcategories`);

  return { categories, subcategories };
}