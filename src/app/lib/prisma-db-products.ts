import prisma from "./prisma";

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
    return Response.json(products);
  } catch (error) {
    return Response.json({ error: 'Falha ao buscar produtos' }, { status: 500 });
  }
}

export async function getProductById(product_id: string) {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return prisma.product.findUnique({
        where: {product_id}
    })
}

export async function getProductsByCategory(category_id: string) {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return prisma.product.findMany({
      include: {
        category: true,
      },
      where: {category_id},
    })
}

export async function getProductsBySubcategory(subcategory_id: string) {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return prisma.product.findMany({
      include: {
        subcategory: true,
      },
      where: {subcategory_id},
    })
}