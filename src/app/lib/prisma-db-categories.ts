import prisma from "./prisma";

export async function getAllCategories() {
  try {
    const categories = await prisma.category.findMany()
    return categories
  } catch (error) {
    return Response.json({ error: 'Falha ao buscar categorias' }, { status: 500 });
  }
}

export async function getCategoryById(category_id: string) {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return prisma.category.findUnique({
        where: {category_id}
    })
}

export async function postCategory(
    title: string,
    name: string
) {

    await new Promise((resolve) => setTimeout(resolve, 1500))
    return prisma.category.create({
        data: { 
            name, 
            title
        }
    })
}