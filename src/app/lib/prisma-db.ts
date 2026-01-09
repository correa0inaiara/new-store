// import prisma from "./prisma"

import * as products from './prisma-db-products';
import * as categories from './prisma-db-categories';
import * as subcategories from './prisma-db-subcategories';

export default {
  products, categories, subcategories
}

// export async function getProduct(id: number) {
//     await new Promise((resolve) => setTimeout(resolve, 1500))
//     return prisma.product.findUnique({
//         where: {id}
//     })
// }

// export async function addProduct(
//     title: string,
//     price: number,
//     description: string
// ) {
//     await new Promise((resolve) => setTimeout(resolve, 1500))
//     return prisma.product.create({
//         data: { title, price, description }
//     })
// }

// export async function updateProduct(
//     id: number,
//     title: string,
//     price: number,
//     description: string
// ) {
//     await new Promise((resolve) => setTimeout(resolve, 1500))
//     return prisma.product.update({
//         where: { id },
//         data: { title, price, description }
//     })
// }

// export async function deleteProduct(id: number) {
//     await new Promise((resolve) => setTimeout(resolve, 1500))
//     return prisma.product.delete({
//         where: {id}
//     })
// }

// Exemplo: Em uma API Route (/app/api/products/route.ts)
