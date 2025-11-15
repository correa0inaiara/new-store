'use client'

import Link from 'next/link'
import './globals.css'
import Image from 'next/image'

export default function GlobalError() {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <h2 className='text-2xl font-bold mb-4'>Something went wrong!</h2>
            <button className='btn'>
                <Link href="/">Home</Link>
            </button>
            <Image
                src="/global-error.png"
                alt="A 3d warning triangle sign icon with a black exclamation point in the center and a blue lightning bolt hovering the top-right of the triangle, emitting visual radiating lines.
                Five grayed-out icons are peeking out from behind the triangle: two shopping carts, two price tags and a gift box. 
                With a casting shadow beneath it."
                width={500}
                height={500}
            />
        </div>
    )
}