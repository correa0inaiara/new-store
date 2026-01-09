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

export async function postSubcategory(
  title: string,
  name: string,
  category_id: string
) {

  await new Promise((resolve) => setTimeout(resolve, 1500))
  return prisma.subcategory.create({
    data: {
      name,
      title,
      category_id
    }
  })
}

export async function getSubcategory(subcategory_id: string) {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return prisma.subcategory.findUnique({
        where: {subcategory_id}
    })
}


export async function updateSubcategory(
    subcategory_id: string,
    title: string,
    name: string,
    category_id: string
) {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return prisma.subcategory.update({
        where: { subcategory_id },
        data: { name, title, category_id }
    })
}

export async function deleteSubcategory(subcategory_id: string) {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return prisma.subcategory.delete({
        where: {subcategory_id}
    })
}