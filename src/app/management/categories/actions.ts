'use server'

import { auth } from "@clerk/nextjs/server"
import { getAllSubcategories } from "../../lib/prisma-db"

export async function getCategories() {
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
