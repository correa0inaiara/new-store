import { AgregacaoPorCategoria, AgregacaoPorSubcategoria, ContagemPorCategoria, ContagemPorSubcategoria } from '@//types/breadcrumbs'
import { getAllProducts, getProductsByCategory, getProductsBySubcategory } from '../lib/prisma-db'
import { StaticImageData } from 'next/image'
import { Products } from '@//types/products'

async function getProducts() {
    try {
        const results = await getAllProducts()
        return results.json()
    } catch (error) {
        console.log('algo deu errado com o retorno das categorias...')
    }
}

async function getAllProductsByCategory(category_id: string) {
    try {
        const results = await getProductsByCategory(category_id)
        return results
    } catch (error) {
        console.log('algo deu errado com o retorno da categoria do produto...')
    }
}

async function getAllProductsBySubcategory(subcategory_id: string) {
    try {
        const results = await getProductsBySubcategory(subcategory_id)
        return results
    } catch (error) {
        console.log('algo deu errado com o retorno da subcategoria do produto...')
    }
}

function filterProductsByCategory(products: Products) {
    // Agrupar produtos por categoria
    const produtosPorCategoria = products.reduce((acc: AgregacaoPorCategoria, product) => {
    if (!acc[product.category.category_id]) {
        acc[product.category.category_id] = [];
    }
    acc[product.category.category_id].push(product);
    return acc;
    }, {} as Record<string, Products>);

    // console.log('Produtos por categoria:', produtosPorCategoria);

    // Agrupar com contagem
    const contagemPorCategoria = products.reduce((acc: ContagemPorCategoria, product) => {
    acc[product.category.category_id] = (acc[product.category.category_id] || 0) + 1;
    return acc;
    }, {} as Record<string, number>);

    // console.log('Contagem por categoria:', contagemPorCategoria);

    return {produtosPorCategoria, contagemPorCategoria}
}

function filterProductsBySubcategory(products: Products) {
    // Agrupar produtos por categoria
    const produtosPorSubcategoria = products.reduce((acc: AgregacaoPorSubcategoria, product) => {
    if (!acc[product.subcategory.subcategory_id]) {
        acc[product.subcategory.subcategory_id] = [];
    }
    acc[product.subcategory.subcategory_id].push(product);
    return acc;
    }, {} as Record<string, Products>);

    // console.log('Produtos por subcategoria:', produtosPorSubcategoria);

    // Agrupar com contagem
    const contagemPorSubcategoria = products.reduce((acc: ContagemPorSubcategoria, product) => {
    acc[product.subcategory.subcategory_id] = (acc[product.subcategory.subcategory_id] || 0) + 1;
    return acc;
    }, {} as Record<string, number>);

    // console.log('Contagem por subcategoria:', contagemPorSubcategoria);

    return {produtosPorSubcategoria, contagemPorSubcategoria}
}

function mapProducts(products: Products) {

    let myImageData: StaticImageData = {
        src: '/sneakers.webp',
        width: 300,
        height: 180
    };
    
    products.forEach(product => {

        product.image = { ...myImageData, alt: 'Shoes' }
        // product.brand = 'Runners'
        // product.category = CategoryEnum.FASHION
        // product.subcategory = SubcategoryEnum.FITNESS
        // product.description = 'Calçados esportivos'
        // product.stock = 50.0
        // product.price = 150.00
        // product.title = 'Calçados Esportivos Runner Verde Limão'
    })

    console.log('forEach products', products)
    // debugger
    return products
}

export {
    getProducts,
    getAllProductsByCategory,
    getAllProductsBySubcategory,
    filterProductsByCategory,
    filterProductsBySubcategory,
    mapProducts
}