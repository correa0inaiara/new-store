import { auth, currentUser } from '@clerk/nextjs/server'
import React from 'react'

export default async function Breadcrumbs() {
    //  const { sessionClaims } = await auth()
  
    //   if (sessionClaims?.metadata?.role !== "seller") {
    //       throw new Error("Not Authorized")
    //   }
  return (
    <div>Breadcrumbs</div>
  )
}
