import { CategoryResponse } from "@//types/categories";
import prisma from "./prisma";
import { unstable_cache } from "next/cache";

const getCategoriesFromDb = unstable_cache(
    async () => {
        return await prisma.category.findMany()
    },
    ['categories'],
    { revalidate: 3600, tags: ['categories'] }
)

export async function getAllCategories(): Promise<CategoryResponse[] | Response> {
    try {
        return getCategoriesFromDb()
    } catch (error) {
        return Response.json({ error: 'Falha ao buscar categorias' }, { status: 500 });
    }
}

export async function getCategoryById(category_id: string) {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return prisma.category.findUnique({
        where: { category_id }
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

export async function getCategory(category_id: string) {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return prisma.category.findUnique({
        where: { category_id }
    })
}

export async function updateCategory(
    category_id: string,
    title: string,
    name: string
) {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return prisma.category.update({
        where: { category_id },
        data: { name, title }
    })
}

export async function deleteCategory(category_id: string) {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return prisma.category.delete({
        where: { category_id }
    })
}

export async function getCategoryByName(name: string) {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return prisma.category.findUnique({
        where: { name },
    })
}

export async function getSubcategoryByName(name: string) {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return prisma.subcategory.findUnique({
        include: {
            category: true
        },
        where: { name },
    })
}