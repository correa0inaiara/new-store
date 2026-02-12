import { ProductResponse } from "@//types/products"
import { useCategory } from "./CategoryContext"
import { getBrands } from "../../lib/prisma-db-brands"
import { Brand } from "@//types/menu"
import { getProductsByBrands, getProductsMinAndMax } from "../../lib/prisma-db-products"
import { Suspense } from "react"
import CategoryClient from "./CategoryClient"

/**
 * filtros
 * campo de busca
 * lista de produtos
 * paginação
 */

// const filterPrices = () => {

// }

const getFiltros = async (params: any) => {
    let brands: Brand[] = []
//     if (slug && slug.length > 0 && products && products.length > 0) {
        brands = await getBrands()
//         console.log('brands', brands)
//         const productsByBrands = getProductsByBrands(brands[0].brand_id)
//         console.log('productsbybrand',productsByBrands)
//         // const prices = filterPrices()
//     }
    return brands
}

const minMaxPrices = async () => {
    // if (!products) return {min: 0, max: 0}

    const getPrices = await getProductsMinAndMax()
    console.log('getprices', getPrices) 
    return getPrices
    // getprices { _min: { price: 49.99 }, _max: { price: 9999.99 } }
}


export default async function CategoryPage({ params }: { params: { slug: string[] } }) {
    const brands = await getFiltros(params)
    
    const {_min, _max} = await minMaxPrices()
    const minPrice = _min.price ? _min.price.toString() : '0'
    const maxPrice = _max.price ? _max.price.toString() : '0'
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <CategoryClient brands={brands} minPrice={minPrice} maxPrice={maxPrice} />
        </Suspense>
    )
}