import Image from "next/image"
import Link from "next/link"
import { Search } from "./search"
import { Authentication } from "./authentication"
import { Menu } from "./menu"
import { CategoryResponse } from "@//types/categories"
import { SubcategoryResponse } from "@//types/subcategories"
import { CacheObject, getCache, setCache } from "../utils/cache"
import { getAllCategories } from "../lib/prisma-db-categories"
import { getAllSubcategories } from "../lib/prisma-db-subcategories"

async function getCategories() {
  try {
    const results = await getAllCategories()
    return results as CategoryResponse[]
  } catch (error) {
    console.log('algo deu errado com o retorno das categorias...')
  }
}

async function getSubcategories() {
  try {
    const results = await getAllSubcategories()
    return results as SubcategoryResponse[]
  } catch (error) {
    console.log('algo deu errado com o retorno das categorias...')
  }
}

export const Navbar = async () => {


//   const cache_cat: CacheObject<[]> = getCache('categorias')
//   const cache_sub: CacheObject<[]> = getCache('subcategorias')
//   let categorias = cache_cat.data
//   let subcategorias = cache_sub.data
//   if (!cache_cat.data) {
    const categorias = await getCategories() as CategoryResponse[]
//     const cache_cat_result: CacheObject<[]> = setCache('categorias', categorias)
//     if (cache_cat_result.error) {
//       console.error(cache_cat_result.error)
//     }
//   }
//   if (!cache_sub.data) {
    const subcategorias = await getSubcategories() as SubcategoryResponse[]
    // const cache_sub_result: CacheObject<[]> = setCache('subcategorias', subcategorias)
    // if (cache_sub_result.error) {
    //   console.error(cache_sub_result.error)
    // }
//   }

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={-1}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                        <Menu categorias={categorias} subcategorias={subcategorias} />
                    </ul>
                </div>
                <Link href="/">
                    <Image 
                        src="/logo2.svg" 
                        alt="New Store Logo"
                        width={150}
                        height={150}
                        className="flex-none"
                    />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 z-10">
                    <Menu categorias={categorias} subcategorias={subcategorias} />
                </ul>
            </div>
            <div className="navbar-end flex justify-between">
                <Search />
                <Authentication />
            </div>
        </div>
    )
}