import { ProductResponse } from "@//types/products"
import { getAllProducts, getProductById } from "../../lib/prisma-db-products"
import { mapProduct } from "../../utils/products"
import Image from "next/image"
import produto_quebrado from './../../../../public/produto-quebrado.png'
import Link from "next/link"

export const dynamicParams = true // retorna página 404 quando o id sendo acessado não se encontra na lista predefinida (abaixo)

export async function generateStaticParams() {
    try {
        const products = await getAllProducts()
        return products.map((product) => ({
            id: product.product_id,
        }))
    } catch (error) {
        console.error('Erro ao gerar parâmetros estáticos:', error)
        return []
    }
}

export default async function ProductPage({
    params,
}: {
    params: Promise<{id:string}>
}) {
    const { id } = await params
    const product: ProductResponse | null = await getProductById(id)

    if (!product) {
        return <h1>Produto não encontrado</h1>
    }

    const mappedProduct = mapProduct(product)

    return (
        <>
            <h1>{mappedProduct.title}</h1>
            <Image
                src={mappedProduct?.image?.src ?? produto_quebrado}
                alt={mappedProduct?.image?.alt ?? 'product'}
                width={300}
                height={180}
                className="rounded-xl"
            />
            <p>Preço: {mappedProduct.price.toString()}</p>
            <p>Descrição: {mappedProduct.description}</p>
            <p>Marca: {mappedProduct.brand}</p>
            <Link href={`/categories/${mappedProduct.category.name}`}>{mappedProduct.category.title}</Link>
            <Link href={`/categories/${mappedProduct.category.name}/${mappedProduct.subcategory.name}`}>{mappedProduct.subcategory.title}</Link>
        </>

    )
} 