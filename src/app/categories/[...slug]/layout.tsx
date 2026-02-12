import { ProductResponse } from "@//types/products"
import { Breadcrumbs } from "../../components/breadcrumbs"
import { Recomendations } from "../../components/recomendations"
import { getProducts, mapProducts } from "../../utils/products"
import Banner from "../../components/banner"
import React from "react"
import { getCache } from "../../utils/cache"
import { getProductsByCategory, getProductsBySubcategory } from "../../lib/prisma-db-products"
import { getCategoryByName, getSubcategoryByName } from "../../lib/prisma-db-categories"
import { CategoryResponse } from "@//types/categories"
import { CategoryProvider } from "./CategoryContext"
import { SubcategoryResponse } from "@//types/subcategories"

export default async function AuthLayout({
    children,
    params
}: {
    children: React.ReactNode,
    params: Promise<{ slug?: string[] }>
}) {
    const { slug } = await params
    // const products = await getProducts()
    // const mappedProducts = mapProducts(products)
    let mappedProducts
    if (slug) {
        console.log('if 0')
        if (slug.length === 1) {
            console.log('if')
            const category: CategoryResponse | null = await getCategoryByName(slug[0])
            if (category) {
                const products: ProductResponse[] = await getProductsByCategory(category.category_id)
                mappedProducts = mapProducts(products)
            } else {
                console.log('else 1')
                const products: ProductResponse[] = await getProducts()
                mappedProducts = mapProducts(products)
            }
        } else {
            console.log('else 2')
            const subcategory: SubcategoryResponse | null = await getSubcategoryByName(slug[1])
            console.log('subcategory', subcategory)
            if (subcategory) {
                console.log('if 2')
                const products: ProductResponse[] = await getProductsBySubcategory(subcategory.subcategory_id)
                mappedProducts = mapProducts(products)
            } else {
                console.log('else 3')
                const products: ProductResponse[] = await getProducts()
                mappedProducts = mapProducts(products)
            }
        }
    } else {
        console.log('else 4')
        const products: ProductResponse[] = await getProducts()
        mappedProducts = mapProducts(products)
    }

    console.log('slug', slug)
    // console.log('mappedProducts', mappedProducts)

    return (
        <CategoryProvider slug={slug} products={mappedProducts}>
            <div>
                <Breadcrumbs />
                <Banner />
                {mappedProducts && mappedProducts.length > 0 && (
                    <>
                        {children}
                        <Recomendations products={mappedProducts} />
                    </>
                )}
            </div>
        </CategoryProvider>
    )
}
