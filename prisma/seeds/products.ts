import prisma from "@//app/lib/prisma";
import { Prisma } from "../generated/client";

export interface SeedDependencies {
  categories: Prisma.CategoryGetPayload<{}>[];
  subcategories: Prisma.SubcategoryGetPayload<{}>[];
}

export async function seedProducts(deps: SeedDependencies): Promise<number> {
  console.log('🌱 Seeding products...');
  
  const { categories, subcategories } = deps;

  // Mapear subcategorias por nome para fácil acesso
  const subcategoryMap: Record<string, string> = {};
  for (const subcat of subcategories) {
    subcategoryMap[subcat.name] = subcat.subcategory_id;
  }

  // 3. Criar Produtos diversificados
  const productsData = [
    // Smartphones
    {
      title: 'Smartphone Galaxy S24',
      price: new Prisma.Decimal('3999.99'),
      description: 'Smartphone flagship com câmera de 200MP e IA integrada',
      stock: 50,
      category_id: categories[0].category_id,
      subcategory_id: subcategoryMap['smartphones'],
    },
    {
      title: 'iPhone 15 Pro',
      price: new Prisma.Decimal('7999.99'),
      description: 'iPhone com chip A17 Pro e design em titânio',
      stock: 30,
      category_id: categories[0].category_id,
      subcategory_id: subcategoryMap['smartphones'],
    },
    {
      title: 'Smartphone Motorola Edge 40',
      price: new Prisma.Decimal('2299.99'),
      description: 'Smartphone intermediário com tela pOLED e carregamento rápido',
      stock: 75,
      category_id: categories[0].category_id,
      subcategory_id: subcategoryMap['smartphones'],
    },

    // Notebooks
    {
      title: 'Notebook Dell XPS 13',
      price: new Prisma.Decimal('8999.99'),
      description: 'Notebook ultrafino com tela InfinityEdge e processador Intel Core i7',
      stock: 25,
      category_id: categories[0].category_id,
      subcategory_id: subcategoryMap['laptops'],
    },
    {
      title: 'MacBook Air M2',
      price: new Prisma.Decimal('9999.99'),
      description: 'Notebook Apple com chip M2 e bateria de longa duração',
      stock: 20,
      category_id: categories[0].category_id,
      subcategory_id: subcategoryMap['laptops'],
    },
    {
      title: 'Notebook Gamer Acer Nitro 5',
      price: new Prisma.Decimal('5499.99'),
      description: 'Notebook gamer com RTX 3050 e processador Intel Core i5',
      stock: 15,
      category_id: categories[0].category_id,
      subcategory_id: subcategoryMap['laptops'],
    },

    // Áudio
    {
      title: 'Fone de Ouvido Sony WH-1000XM5',
      price: new Prisma.Decimal('2299.99'),
      description: 'Fone over-ear com cancelamento de ruído líder do mercado',
      stock: 40,
      category_id: categories[0].category_id,
      subcategory_id: subcategoryMap['audio'],
    },
    {
      title: 'Caixa de Som JBL Charge 5',
      price: new Prisma.Decimal('899.99'),
      description: 'Caixa de som Bluetooth à prova d\'água com grave potente',
      stock: 60,
      category_id: categories[0].category_id,
      subcategory_id: subcategoryMap['audio'],
    },

    // Cozinha
    {
      title: 'Air Fryer Philco 4.5L',
      price: new Prisma.Decimal('499.99'),
      description: 'Fritadeira elétrica sem óleo com capacidade de 4,5 litros',
      stock: 35,
      category_id: categories[1].category_id,
      subcategory_id: subcategoryMap['kitchen'],
    },
    {
      title: 'Liquidificador Mondial Turbo',
      price: new Prisma.Decimal('299.99'),
      description: 'Liquidificador com 8 velocidades e copo de vidro',
      stock: 45,
      category_id: categories[1].category_id,
      subcategory_id: subcategoryMap['kitchen'],
    },

    // Roupas Masculinas
    {
      title: 'Camisa Social Slim Fit',
      price: new Prisma.Decimal('199.99'),
      description: 'Camisa social masculina slim fit em algodão 100%',
      stock: 100,
      category_id: categories[2].category_id,
      subcategory_id: subcategoryMap['mens-clothing'],
    },
    {
      title: 'Calça Jeans Masculina',
      price: new Prisma.Decimal('249.99'),
      description: 'Calça jeans masculina no corte skinny',
      stock: 80,
      category_id: categories[2].category_id,
      subcategory_id: subcategoryMap['mens-clothing'],
    },

    // Roupas Femininas
    {
      title: 'Vestido Floral Midi',
      price: new Prisma.Decimal('179.99'),
      description: 'Vestido floral feminino midi com tecido leve',
      stock: 65,
      category_id: categories[2].category_id,
      subcategory_id: subcategoryMap['womens-clothing'],
    },
    {
      title: 'Blusa Feminina Básica',
      price: new Prisma.Decimal('89.99'),
      description: 'Blusa feminina básica em algodão com várias cores',
      stock: 120,
      category_id: categories[2].category_id,
      subcategory_id: subcategoryMap['womens-clothing'],
    },

    // Calçados
    {
      title: 'Tênis Nike Air Max',
      price: new Prisma.Decimal('699.99'),
      description: 'Tênis esportivo com tecnologia Air Max de amortecimento',
      stock: 55,
      category_id: categories[2].category_id,
      subcategory_id: subcategoryMap['shoes'],
    },
    {
      title: 'Sapato Social Masculino',
      price: new Prisma.Decimal('349.99'),
      description: 'Sapato social masculino em couro legítimo',
      stock: 40,
      category_id: categories[2].category_id,
      subcategory_id: subcategoryMap['shoes'],
    },

    // Fitness
    {
      title: 'Esteira Elétrica Pro',
      price: new Prisma.Decimal('2999.99'),
      description: 'Esteira elétrica com motor 3.0HP e sistema de amortecimento',
      stock: 10,
      category_id: categories[3].category_id,
      subcategory_id: subcategoryMap['fitness'],
    },
    {
      title: 'Kit Halteres Ajustáveis',
      price: new Prisma.Decimal('499.99'),
      description: 'Kit de halteres ajustáveis de 10kg a 40kg',
      stock: 25,
      category_id: categories[3].category_id,
      subcategory_id: subcategoryMap['fitness'],
    },

    // Livros
    {
      title: 'O Poder do Hábito',
      price: new Prisma.Decimal('49.99'),
      description: 'Best-seller sobre como transformar hábitos na vida e nos negócios',
      stock: 85,
      category_id: categories[4].category_id,
      subcategory_id: subcategoryMap['books'],
    },
    {
      title: 'Box Harry Potter Completo',
      price: new Prisma.Decimal('299.99'),
      description: 'Coleção completa dos 7 livros de Harry Potter em capa dura',
      stock: 30,
      category_id: categories[4].category_id,
      subcategory_id: subcategoryMap['books'],
    },

    // Games
    {
      title: 'PlayStation 5',
      price: new Prisma.Decimal('4499.99'),
      description: 'Console de última geração com SSD ultrarrápido',
      stock: 15,
      category_id: categories[0].category_id,
      subcategory_id: subcategoryMap['gaming'],
    },
    {
      title: 'Xbox Series X',
      price: new Prisma.Decimal('4199.99'),
      description: 'Console com processador Zen 2 e GPU RDNA 2',
      stock: 12,
      category_id: categories[0].category_id,
      subcategory_id: subcategoryMap['gaming'],
    },
  ];

  // Criar produtos em lotes menores para melhor performance
  const batchSize = 10;
  let createdCount = 0;
  
  for (let i = 0; i < productsData.length; i += batchSize) {
    const batch = productsData.slice(i, i + batchSize);
    await prisma.product.createMany({
      data: batch,
    });
    createdCount += batch.length;
  }

  console.log(`✅ Created ${createdCount} products across all categories`);
  return createdCount;
}