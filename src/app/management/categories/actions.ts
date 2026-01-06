'use server'

import { auth } from "@clerk/nextjs/server"
import { getAllCategories, getAllSubcategories } from "../../lib/prisma-db"

export async function getSubcategoriasWithCategories() {
    const { sessionClaims } = await auth()

    if (sessionClaims?.metadata?.role !== "seller") {
        throw new Error("Not Authorized")
    }

    const subcategorias = await getAllSubcategories()
    return subcategorias.json().then((data) => {
        console.log('data', data)
        return data
    })
}

export async function getCategories() {
    const { sessionClaims } = await auth()

    if (sessionClaims?.metadata?.role !== "seller") {
        throw new Error("Not Authorized")
    }

    const categorias = await getAllCategories()
    return categorias.json().then((data) => {
        console.log('data', data)
        return data
    })
}