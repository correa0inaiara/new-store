'use client'

import { useCategory } from "./CategoryContext"

/**
 * filtros
 * campo de busca
 * lista de produtos
 * paginação
 */
export default function CategoryPage() {
    const {slug, products} = useCategory()
    
    if (slug?.length === 2) {
        return (
            <h1>
                Viewing docs for feature {slug[0]} and concept {slug[1]}
            </h1>
        )
    } else if (slug?.length === 1) {
        return <h1>Viewing docs for feature {slug[0]}</h1>
    }
    
    return <h1>Category page</h1>
}