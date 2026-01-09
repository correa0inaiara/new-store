import prisma from "./prisma";

export async function getAllSubcategories() {
  try {
    const subcategories = await prisma.subcategory.findMany({
      include: {
        category: true
      }
    })
    return subcategories
  } catch (error) {
    return Response.json({ error: 'Falha ao buscar subcategorias' }, { status: 500 });
  }
}

export async function getSubcategoryById(subcategory_id: string) {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return prisma.subcategory.findUnique({
    where: { subcategory_id }
  })
}

export async function postSubcategory(
  title: string,
  name: string,
  category_id: string
) {

  console.log('title', title)
  console.log('name', name)
  console.log('category_id', category_id)

  await new Promise((resolve) => setTimeout(resolve, 1500))
  return prisma.subcategory.create({
    data: {
      name,
      title,
      category_id
    }
  })
}