'use client'

import { ProductResponse } from "@//types/products"
import { useCategory } from "./CategoryContext"

/**
 * filtros
 * campo de busca
 * lista de produtos
 * paginação
 */

const getFiltros = (slug: string[] | undefined, products: ProductResponse[] | undefined) => {
    if (slug && slug.length > 0 && products && products.length > 0) {
        const brands = getBrands()
        const prices = filterPrices()
    }
}

export default function CategoryPage() {
    const {slug, products} = useCategory()
    getFiltros(slug, products)
    
    if (slug?.length === 2) {
        return (
            <h1>
                categoria {slug[0]} e subcategoria {slug[1]}
            </h1>
        )
    } else if (slug?.length === 1) {
        return <h1>categoria {slug[0]}</h1>
    }
    
    return <h1>Category page</h1>
}