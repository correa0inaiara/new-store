import Image from "next/image"
import { Menu } from "./menu"
import { Search } from "./search"
import { Authentication } from "./authentication"
import Link from "next/link"

export const Header = () => {
    return (
        <div>
            <div className="flex mb-5">
                <div className="flex-auto">
                    <Link href="/">
                        <Image 
                            src="/logo.svg" 
                            alt="New Store Logo"
                            width={150}
                            height={150}
                            className="flex-none"
                        />
                    </Link>
                </div>
                <div className="flex-auto">
                    <Menu />
                </div>
                <div className="flex-auto">
                    <Search />
                </div>
                <div className="flex-auto">
                    <Authentication />
                </div>            
            </div>
        </div>
    )
}