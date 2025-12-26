import banner_electronics from './../../..//public/electronics.png'
import banner_home_appliances from './../../..//public/home-appliances.png'
import banner_fashion from './../../..//public/fashion.png'
import banner_sports from './../../..//public/sports.png'
import banner_books_and_media from './../../../public/books-and-media.png'
import banner_travel from './../../..//public/travel.png'
import { Banners } from "@//types/images"
import { Products } from '@//types/products'
import Image from 'next/image'
import { filterProductsByCategory, filterProductsBySubcategory, getProducts, mapProducts } from '../utils/products'

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

    const { produtosPorCategoria, contagemPorCategoria } = filterProductsByCategory(products)
    const { produtosPorSubcategoria, contagemPorSubcategoria } = filterProductsBySubcategory(products)
    console.log('produtosPorCategoria', produtosPorCategoria)
    console.log('contagemPorCategoria', contagemPorCategoria)
    console.log('produtosPorSubcategoria', produtosPorSubcategoria)
    console.log('contagemPorSubcategoria', contagemPorSubcategoria)

    return (
        <div>
            <Image
                src="/electronics.png"
                alt="A 3d warning triangle sign icon with a black exclamation point in the center and a blue lightning bolt hovering the top-right of the triangle, emitting visual radiating lines.
                Five grayed-out icons are peeking out from behind the triangle: two shopping carts, two price tags and a gift box. 
                With a casting shadow beneath it."
                width={1024}
                height={1024}
            />

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