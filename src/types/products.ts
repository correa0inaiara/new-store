import { Banner } from "./images"
import { Category, Subcategory } from "./menu"

export type Product = {
    product_id: string
    image: Banner
    title: string
    description: string
    price: number
    brand: string
    stock: number
    category: Category
    subcategory: Subcategory
}

export type Products = Product[]