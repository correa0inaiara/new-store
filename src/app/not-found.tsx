import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <h2 className='text-2xl font-bold mb-4'>Page Not Found</h2>
            <p className='text-xl font-bold mb-4'>Could not find requested resource</p>
            <button className='btn'>
                <Link href="/">Home</Link>
            </button>
            <Image
                src="/not-found.png"
                alt="Image of a 3d blue document icon or card with a pale yellow (translucent) circle in the middle. 
                The circle contains a cracked question mark. 
                Four grayed-out icons are peeking out from behind the file: two shopping carts, a price tag and a gift box. 
                With a casting shadow beneath it."
                width={500}
                height={500}
            />
        </div>
    )
}