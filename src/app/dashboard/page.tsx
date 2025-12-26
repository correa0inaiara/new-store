import Link from 'next/link'
import React from 'react'

export default function Dashboard() {
  return (
    <div>
        <h2>Dashboard</h2>
        <ul>
            <li>
                <Link href="/management">Manage Website</Link>
            </li>
            <li>
                <Link href="/user-profile">Manage Account</Link>
            </li>
        </ul>
    </div>
  )
}
