import prisma from "@//app/lib/prisma";
import { Prisma } from "../generated/client";

export interface SeedDependencies {
  categories: Prisma.CategoryGetPayload<{}>[];
  subcategories: Prisma.SubcategoryGetPayload<{}>[];
  properties: Prisma.PropertyGetPayload<{ include: { property_option: true } }>[];
}

export async function seedProducts(deps: SeedDependencies): Promise<number> {
  console.log('🌱 Seeding products with properties...');
  
  const { categories, subcategories, properties } = deps;

  const subcategoryMap: Record<string, string> = {};
  for (const subcat of subcategories) {
    subcategoryMap[subcat.name] = subcat.subcategory_id;
  }

  // Função auxiliar para pegar ID de opção de propriedade
  const getOptionId = (propName: string, value: string) => {
    const prop = properties.find(p => p.name === propName);
    return prop?.property_option.find(o => o.option.toLowerCase() === value.toLowerCase())?.property_options_id;
  };

  const productsData = [
    // Eletrônicos (Smartphones, Laptops, Audio, Games)
    { title: 'Smartphone Galaxy S24', price: 3999.99, sub: 'smartphones', catIdx: 0, brand: 'Samsung', prop: ['cor:Preto', 'voltagem:110v'] },
    { title: 'iPhone 15 Pro', price: 7999.99, sub: 'smartphones', catIdx: 0, brand: 'Apple', prop: ['cor:Cinza', 'voltagem:220v'] },
    { title: 'Smartphone Motorola Edge 40', price: 2299.99, sub: 'smartphones', catIdx: 0, brand: 'Motorola', prop: ['cor:Azul'] },
    { title: 'Notebook Dell XPS 13', price: 8999.99, sub: 'laptops', catIdx: 0, brand: 'Dell', prop: ['cor:Preto', 'voltagem:110v'] },
    { title: 'MacBook Air M2', price: 9999.99, sub: 'laptops', catIdx: 0, brand: 'Apple', prop: ['cor:Cinza', 'voltagem:110v'] },
    { title: 'Notebook Gamer Acer Nitro 5', price: 5499.99, sub: 'laptops', catIdx: 0, brand: 'Acer', prop: ['cor:Preto', 'voltagem:220v'] },
    { title: 'Fone Sony WH-1000XM5', price: 2299.99, sub: 'audio', catIdx: 0, brand: 'Sony', prop: ['cor:Preto'] },
    { title: 'JBL Charge 5', price: 899.99, sub: 'audio', catIdx: 0, brand: 'JBL', prop: ['cor:Azul'] },
    { title: 'PlayStation 5', price: 4499.99, sub: 'gaming', catIdx: 0, brand: 'Sony', prop: ['cor:Branco', 'voltagem:110v'] },
    { title: 'Xbox Series X', price: 4199.99, sub: 'gaming', catIdx: 0, brand: 'Microsoft', prop: ['cor:Preto', 'voltagem:110v'] },

    // Eletrodomésticos
    { title: 'Air Fryer Philco 4.5L', price: 499.99, sub: 'kitchen', catIdx: 1, brand: 'Philco', prop: ['voltagem:110v', 'volume:10l'] },
    { title: 'Liquidificador Mondial Turbo', price: 299.99, sub: 'kitchen', catIdx: 1, brand: 'Mondial', prop: ['voltagem:220v', 'cor:Vermelho'] },

    // Moda (Mens, Womens, Shoes)
    { title: 'Camisa Social Slim Fit', price: 199.99, sub: 'mens-clothing', catIdx: 2, brand: 'Dudalina', prop: ['tamanho:M', 'cor:Branco'] },
    { title: 'Calça Jeans Masculina', price: 249.99, sub: 'mens-clothing', catIdx: 2, brand: 'Levi\'s', prop: ['tamanho:G', 'cor:Azul'] },
    { title: 'Vestido Floral Midi', price: 179.99, sub: 'womens-clothing', catIdx: 2, brand: 'Zara', prop: ['tamanho:P', 'cor:Roxo'] },
    { title: 'Blusa Feminina Básica', price: 89.99, sub: 'womens-clothing', catIdx: 2, brand: 'H&M', prop: ['tamanho:U', 'cor:Amarelo'] },
    { title: 'Tênis Nike Air Max', price: 699.99, sub: 'shoes', catIdx: 2, brand: 'Nike', prop: ['tamanho:G', 'cor:Preto'] },
    { title: 'Sapato Social Masculino', price: 349.99, sub: 'shoes', catIdx: 2, brand: 'Ferracini', prop: ['tamanho:M', 'cor:Preto'] },

    // Esportes / Fitness
    { title: 'Esteira Elétrica Pro', price: 2999.99, sub: 'fitness', catIdx: 3, brand: 'Movement', prop: ['voltagem:220v', 'peso:30kg'] },
    { title: 'Kit Halteres Ajustáveis', price: 499.99, sub: 'fitness', catIdx: 3, brand: 'Iron', prop: ['peso:20kg'] },

    // Livros
    { title: 'O Poder do Hábito', price: 49.99, sub: 'books', catIdx: 4, brand: 'Objetiva', prop: ['tamanho:U'] },
    { title: 'Box Harry Potter', price: 299.99, sub: 'books', catIdx: 4, brand: 'Rocco', prop: ['tamanho:U', 'cor:Preto'] },
  ];

  let createdCount = 0;

  for (const p of productsData) {
    const product = await prisma.product.create({
      data: {
        title: p.title,
        description: `Descrição de alta qualidade para ${p.title}`,
        price: new Prisma.Decimal(p.price.toString()),
        stock: 50,
        brand: p.brand,
        sku: `SKU-${p.title.toUpperCase().replace(/\s+/g, '-')}-${Math.random().toString(36).substring(7)}`,
        category_id: categories[p.catIdx].category_id,
        subcategory_id: subcategoryMap[p.sub],
      }
    });

    // Vincular propriedades
    for (const propStr of p.prop) {
      const [name, value] = propStr.split(':');
      const propId = properties.find(pr => pr.name === name)?.property_id;
      if (propId) {
        await prisma.product_Properties.create({
          data: {
            product_id: product.product_id,
            property_id: propId
          }
        });
      }
    }
    createdCount++;
  }

  console.log(`✅ Created ${createdCount} products with linked properties.`);
  return createdCount;
}