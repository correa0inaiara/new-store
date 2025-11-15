import { withAccelerate } from '@prisma/extension-accelerate'
import { Prisma, PrismaClient } from '../generated/client';

const prisma = new PrismaClient().$extends(withAccelerate())

const categoriesData: Prisma.CategoryCreateInput[] = [
  {
    name: 'books-stationery',
    title: 'Books & Stationery',
    subcategory: {
        create: [
            {
                name: 'books',
                title: 'Books'
            },
            {
                name: 'office-supplies',
                title: 'Office Supplies'
            }
        ]
    }
  },
  {
    name: 'electronics-appliances',
    title: 'Electronics & Appliances',
    subcategory: {
        create: [
            {
                name: 'technology',
                title: 'Technology'
            },
            {
                name: 'home appliances',
                title: 'Home Appliances'
            }
        ]
    }
  },
  {
    name: 'apparel-accessories',
    title: 'Apparel & Accessories',
    subcategory: {
        create: [
            {
                name: 'clothing',
                title: 'Clothing'
            },
            {
                name: 'footwear',
                title: 'Footwear'
            },
            {
                name: 'accessories',
                title: 'Accessories'
            }
        ]
    }
  }
];

export async function main() {
  for (const category of categoriesData) {
    await prisma.category.create({ data: category });
  }
}

main();