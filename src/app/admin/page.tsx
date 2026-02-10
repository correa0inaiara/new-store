import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'

export default async function Admin() {

    // const { sessionClaims } = await auth()

    // if (sessionClaims?.metadata?.role !== "seller") {
    //     throw new Error("Not Authorized")
    // }

    return (
        <ul>
            <li>
                <Link href="/admin">Admin</Link>
            </li>
            <li>
                <Link href="/admin/categories">Categories</Link>
            </li>
            <li>
                <Link href="/admin/subcategories">Subcategories</Link>
            </li>
            <li>
                <Link href="/admin/products">Products</Link>
            </li>
            <li>
                <Link href="/admin/properties">Properties</Link>
            </li>
            <li>
                <Link href="/admin/property-options">Property Options</Link>
            </li>
            <li>
                <Link href="/dashboard">Voltar</Link>
            </li>
        </ul>
    )
}
