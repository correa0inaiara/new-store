// import prisma from "./prisma"

import prisma from "./prisma";

export async function getAllProducts() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,    // Inclui os dados da categoria relacionada
        subcategory: true, // Inclui os dados da subcategoria relacionada
      },
    });
    return Response.json(products);
  } catch (error) {
    return Response.json({ error: 'Falha ao buscar produtos' }, { status: 500 });
  }
}

export async function getAllCategories() {
  try {
    const categories = await prisma.category.findMany()
    return Response.json(categories);
  } catch (error) {
    return Response.json({ error: 'Falha ao buscar categorias' }, { status: 500 });
  }
}

export async function getAllSubcategories() {
  try {
    const subcategories = await prisma.subcategory.findMany()
    return Response.json(subcategories);
  } catch (error) {
    return Response.json({ error: 'Falha ao buscar subcategorias' }, { status: 500 });
  }
}

// export async function getProducts(query?: string) {
//     await new Promise((resolve) => setTimeout(resolve, 1500))

//     if (query) {
//         return prisma.product.findMany({
//             where: {
//                 OR: [
//                     { title: { contains: query } },
//                     { description: { contains: query } }
//                 ]
//             }
//         })
//     }

//     return prisma.product.findMany()
// }

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
