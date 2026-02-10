import { unstable_cache } from "next/cache";
import prisma from "./prisma";

const getSubcategoriesFromDb = unstable_cache(
  async () => {
    return await prisma.subcategory.findMany()
  },
  ['subcategories'],
  { revalidate: 3600, tags: ['subcategories'] }
)

export async function getAllSubcategories() {
  try {
    return getSubcategoriesFromDb()
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