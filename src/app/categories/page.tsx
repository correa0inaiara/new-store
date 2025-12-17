import Link from "next/link"
import prisma from "../lib/prisma"
import { getAllCategories, getAllSubcategories } from "../lib/prisma-db"


export default async function Categories() {

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