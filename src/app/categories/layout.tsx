import { Products } from "@//types/products"
import { Breadcrumbs } from "../components/breadcrumbs"
import { Recomendations } from "../components/recomendations"
import { getProducts, mapProducts } from "../utils/products"

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // let products: Products
    const products: Products = await getProducts()
    const mappedProducts = mapProducts(products)

    return (
        <div>
            <Breadcrumbs />
            {children}
            {mappedProducts && mappedProducts.length > 0 && (
                <Recomendations products={mappedProducts} />
            )}
        </div>
    )
}
