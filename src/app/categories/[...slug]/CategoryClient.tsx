'use client'

import { Brand } from '@//types/menu'
import React, { useState } from 'react'
import { useCategory } from './CategoryContext'
import { Product, ProductResponse } from '@//types/products'
import { getProductsMinAndMax } from '../../lib/prisma-db-products'
import Filtros, { BrandsObj } from '../../components/filtros'
import FiltroBusca from '../../components/filtroBusca'
import ListaProdutos from '../../components/listaProdutos'
import Paginacao from '../../components/paginacao'

interface CategoryClientProps {
    brands: Brand[]
    minPrice: string,
    maxPrice: string
}

const filterBrandsByProducts = (brands: Brand[], products: ProductResponse[] | undefined) => {
    if (!products) return []
    return brands.filter(brand => {
        const filtered = products.filter(product => product.brand.brand_id === brand.brand_id)
        return filtered.length > 0
    })
}

/**
 * campo de busca
 * filtros
 * lista de produtos
 * paginação
 */

export default function CategoryClient({ brands, minPrice, maxPrice }: CategoryClientProps) {

    const {slug, products} = useCategory()
    const [produtosFiltrados, setProdutosFiltrados] = useState<Product[]>(products as Product[])

    const filteredBrands = filterBrandsByProducts(brands, products)
    console.log('filteredBrands', filteredBrands)
    console.log('min and max prices', minPrice, maxPrice)

    const filtraProdutosPorMarca = (marcas: BrandsObj) => {
        console.log('marcas', marcas)
        if (products && products.length > 0) {
            const _products = products.filter(produto => {
                return marcas[produto.brand.name]?.name
            })
            console.log('_products', _products)
            setProdutosFiltrados(_products as Product[])
        }
    }

  if (slug?.length === 2) {
        return (
            <h1>
                categoria {slug[0]} e subcategoria {slug[1]}
            </h1>
        )
    } else if (slug?.length === 1) {
        return (
            <>
                <h1>categoria {slug[0]}</h1>
                <FiltroBusca />
                <Filtros filteredBrands={filteredBrands} minPrice={minPrice} maxPrice={maxPrice} callback={filtraProdutosPorMarca} />
                <ListaProdutos products={produtosFiltrados} />
                <Paginacao />
            </>
        )
    }
    
    return <h1>Category page</h1>
}
