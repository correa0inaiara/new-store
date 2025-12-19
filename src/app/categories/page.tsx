import banner_electronics from './../../..//public/electronics.png'
import banner_home_appliances from './../../..//public/home-appliances.png'
import banner_fashion from './../../..//public/fashion.png'
import banner_sports from './../../..//public/sports.png'
import banner_books_and_media from './../../../public/books-and-media.png'
import banner_travel from './../../..//public/travel.png'
import { Banners } from "@//types/images"
import Slider from "../components/slider"
import { Recomendations } from "../components/recomendations"
import { Products } from '@//types/products'
import { getAllProducts, getCategoryById, getSubcategoryById } from '../lib/prisma-db'
import { CategoryEnum, SubcategoryEnum } from '@//types/categories_subcategories'
import Image, { StaticImageData } from 'next/image'

async function getProducts() {
    try {
        const results = await getAllProducts()
        return results.json()
    } catch (error) {
        console.log('algo deu errado com o retorno das categorias...')
    }
}

async function getProductCategory(category_id: string) {
    try {
        const results = await getCategoryById(category_id)
        return results
    } catch (error) {
        console.log('algo deu errado com o retorno da categoria do produto...')
    }
}

async function getProductSubcategory(subcategory_id: string) {
    try {
        const results = await getSubcategoryById(subcategory_id)
        return results
    } catch (error) {
        console.log('algo deu errado com o retorno da subcategoria do produto...')
    }
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

export default async function Categories() {

    const banners: Banners = [
        banner_electronics,
        banner_home_appliances,
        banner_fashion,
        banner_sports,
        banner_books_and_media,
        banner_travel
    ]

    let products: Products = await getProducts()
    console.log("products", products)
    products = mapProducts(products)
    return (
        <div>
            {/* <Carousel images={banners} /> */}
            <Slider images={banners} />
            <Recomendations products={products} />
            {/* {categories.map(({name}: Category) => (
                <Link href={`/categories/${name}`}>{name.toUpperCase()}</Link>
            ))} */}
            {/* <Category name="furniture" /> */}
            {/* <Category name="technology" />
            <Category name="fashion" />
            <Category name="appliances" /> */}
            {/* testes
            
            <Image
                src="/home-appliances.png"
                alt="A 3d warning triangle sign icon with a black exclamation point in the center and a blue lightning bolt hovering the top-right of the triangle, emitting visual radiating lines.
                Five grayed-out icons are peeking out from behind the triangle: two shopping carts, two price tags and a gift box. 
                With a casting shadow beneath it."
                width={1000}
                height={1000}
            />
            <Image
                src="/fashion.png"
                alt="A 3d warning triangle sign icon with a black exclamation point in the center and a blue lightning bolt hovering the top-right of the triangle, emitting visual radiating lines.
                Five grayed-out icons are peeking out from behind the triangle: two shopping carts, two price tags and a gift box. 
                With a casting shadow beneath it."
                width={1000}
                height={1000}
            />
            <Image
                src="/sports.png"
                alt="A 3d warning triangle sign icon with a black exclamation point in the center and a blue lightning bolt hovering the top-right of the triangle, emitting visual radiating lines.
                Five grayed-out icons are peeking out from behind the triangle: two shopping carts, two price tags and a gift box. 
                With a casting shadow beneath it."
                width={1000}
                height={1000}
            />
            <Image
                src="/books-and-media.png"
                alt="A 3d warning triangle sign icon with a black exclamation point in the center and a blue lightning bolt hovering the top-right of the triangle, emitting visual radiating lines.
                Five grayed-out icons are peeking out from behind the triangle: two shopping carts, two price tags and a gift box. 
                With a casting shadow beneath it."
                width={1000}
                height={1000}
            />
            <Image
                src="/travel.png"
                alt="A 3d warning triangle sign icon with a black exclamation point in the center and a blue lightning bolt hovering the top-right of the triangle, emitting visual radiating lines.
                Five grayed-out icons are peeking out from behind the triangle: two shopping carts, two price tags and a gift box. 
                With a casting shadow beneath it."
                width={1000}
                height={1000}
            /> */}
        </div>
    )
}