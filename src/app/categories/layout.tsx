import { Products } from "@//types/products"
import { Breadcrumbs } from "../components/breadcrumbs"
import { Recomendations } from "../components/recomendations"
import { getProducts, mapProducts } from "../utils/products"

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    let products: Products = await getProducts()
    console.log("products", products)
    products = mapProducts(products)

    return (
        <div>
            <Breadcrumbs />
            {children}
            <Recomendations products={products} />
        </div>
    )
}
