import { Banner } from "./images"
import { Category, Subcategory } from "./menu"

export type Product = {
    product_id: string
    image?: Banner
    title: string
    description: string
    price: number
    brand: string
    stock: number
    category: Category
    subcategory: Subcategory
}

export type ProductResponse = {
    product_id: string
    image?: Banner
    title: string
    description: string
    price: number
    brand: string
    stock: number
    category: Category
    subcategory: Subcategory
}

export type Products = Product[]

//     category_id: string;
//     title: string;
//     description: string;
//     price: Decimal;
//     product_id: string;
//     stock: number;
//     subcategory_id: string | null;