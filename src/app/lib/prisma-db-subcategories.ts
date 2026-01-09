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
        where: {subcategory_id}
    })
}

// export async function postSubcategory(
//     title: string,
//     name: string
// ) {

//     await new Promise((resolve) => setTimeout(resolve, 1500))
//     return prisma.subcategory.create({
//         data: { 
//             name, 
//             title
//         }
//     })
// }