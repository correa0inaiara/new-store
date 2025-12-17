export type Subcategory = {
    subcategory_id: string
    name: string
    title: string
    category_id: string
    category?: Category
}

export type Category = {
    category_id: string
    name: string
    title: string
    image: any
    hasSubcategories: boolean
}