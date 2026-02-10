'use client'

import { ProductResponse } from "@//types/products"
import { createContext, useContext } from "react"

interface CategoryData {
    slug: string[] | undefined,
    products: ProductResponse[] | undefined
}

const CategoryContext = createContext<CategoryData | null>(null)

export const useCategory = () => {
    const context = useContext(CategoryContext)
    if (!context) {
        throw new Error('useCategory must be used within CategoryProvider')
    }
    return context
}

export function CategoryProvider({
    slug,
    products,
    children
}: {
    slug: string[] | undefined,
    products: ProductResponse[] | undefined,
    children: React.ReactNode
}) {
    return (
        <CategoryContext.Provider value={{slug, products}}>
            {children}
        </CategoryContext.Provider>
    )
}