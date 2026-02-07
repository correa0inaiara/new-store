import { Decimal } from "@prisma/client/runtime/client"
import { Banner } from "./images"
import { Category, Subcategory } from "./menu"
import { CategoryResponse } from "./categories"
import { SubcategoryResponse } from "./subcategories"

export type Product = {
    product_id: string
    image?: Banner
    title: string
    description: string
    price: Decimal | number
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
    price: Decimal | number
    brand: string
    stock: number
    category: CategoryResponse
    subcategory: SubcategoryResponse
}

export type Products = Product[]

//     category_id: string;
//     title: string;
//     description: string;
//     price: Decimal;
//     product_id: string;
//     stock: number;
//     subcategory_id: string | null;