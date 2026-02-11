
import { Prisma } from "@prisma/client/scripts/default-index.js";
import prisma from "./prisma";
import { Decimal } from "@prisma/client/runtime/client";
import { Product } from "@prisma-client/client";
import { Products } from "@//types/products";

export async function getProducts(query?: string) {
  console.log("query", query)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (query) {
        return prisma.product.findMany({
            where: {
                OR: [
                    { title: { contains: query } },
                    { description: { contains: query } }
                ]
            }
        })
    }

    return prisma.product.findMany()
}

export async function getAllProducts() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,    // Inclui os dados da categoria relacionada
        subcategory: true, // Inclui os dados da subcategoria relacionada
      },
    });
    return products;
  } catch (error) {
    throw error
  }
}

export async function getProductById(product_id: string) {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return prisma.product.findUnique({
        where: {product_id},
        include: {
          category: true,    // Inclui os dados da categoria relacionada
          subcategory: true, // Inclui os dados da subcategoria relacionada
        }
    })
}

export async function getProductsByCategory(category_id: string) {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return prisma.product.findMany({
      include: {
        category: true,
        subcategory: true
      },
      where: {category_id},
    })
}

export async function getProductsBySubcategory(subcategory_id: string) {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return prisma.product.findMany({
      include: {
        subcategory: true,
        category: true
      },
      where: {subcategory_id},
    })
}

export async function getProductsByBrands(brand_id: string) {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return prisma.product.findMany({
      include: {
        category: true,
        subcategory: true,
        brand: true
      },
      where: {brand_id},
    })
}

export async function postProduct(
    title: string,
    description: string,
    price: Decimal,
    stock: number,
    sku: string,
    brand_id: string,
    category_id: string,
    subcategory_id: string
) {

    await new Promise((resolve) => setTimeout(resolve, 1500))
    return prisma.product.create({
        data: { 
          title,
          description,
          price: price,
          stock: stock,
          sku,
          brand_id,
          category_id,
          subcategory_id
        }
    })
}

export async function updateProduct(
    product_id: string,
    title: string,
    description: string,
    price: Decimal,
    stock: number,
    brand_id: string,
    category_id: string,
    subcategory_id: string
) {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return prisma.product.update({
        where: { product_id },
        data: { 
          title,
          description,
          price: price,
          stock: stock,
          brand_id,
          category_id,
          subcategory_id
        }
    })
}

export async function deleteProduct(product_id: string) {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return prisma.product.delete({
        where: {product_id}
    })
}