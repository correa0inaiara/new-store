'use server'

import { auth, clerkClient } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { Roles } from "../../types/roles"

export async function setRole(formData: FormData) {
    const { sessionClaims } = await auth()

    if (sessionClaims?.metadata?.role !== "seller") {
        throw new Error("Not Authorized")
    }

    const client = await clerkClient()
    const id = formData.get("id") as string
    const role = formData.get("role") as Roles

    try {
        await client.users.updateUser(id, {
            publicMetadata: { role }
        })
        revalidatePath("/seller")
    } catch {
        throw new Error("Failed to set role")
    }
}