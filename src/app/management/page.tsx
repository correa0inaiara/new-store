import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'

export default async function Management() {

    // const { sessionClaims } = await auth()

    // if (sessionClaims?.metadata?.role !== "seller") {
    //     throw new Error("Not Authorized")
    // }

    return (
        <ul>
            <li>
                <Link href="/management">Management</Link>
            </li>
            <li>
                <Link href="/management/breadcrumbs">Breadcrumbs</Link>
            </li>
            <li>
                <Link href="/dashboard">Voltar</Link>
            </li>
        </ul>
    )
}
