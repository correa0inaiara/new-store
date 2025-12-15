import Link from "next/link"
import prisma from "../lib/prisma"
import { getAllCategories } from "../lib/prisma-db"

type Subcategory = {
    id: string
    name: string
    category_id: string
}

type Category = {
    id: string
    name: string
    title: string
}

async function getCategories() {
    try {
        const results = await getAllCategories()
        return results.json()
    } catch (error) {
        console.log('algo deu errado com o retorno das categorias...')
    }
}

export default async function Categories() {
    const results = await getCategories()
    console.log('results', results)

    return (
        <div>
            {/* {categories.map(({name}: Category) => (
                <Link href={`/categories/${name}`}>{name.toUpperCase()}</Link>
            ))} */}
            {/* <Category name="furniture" /> */}
            {/* <Category name="technology" />
            <Category name="fashion" />
            <Category name="appliances" /> */}
            testes
        </div>
    )
}