import { getAllCategories, getAllSubcategories } from "../lib/prisma-db"
import { Category, Subcategory } from "@//types/menu"
import Link from "next/link"

async function getCategories() {
    try {
        const results = await getAllCategories()
        return results.json()
    } catch (error) {
        console.log('algo deu errado com o retorno das categorias...')
    }
}

async function getSubcategories() {
  try {
    const results = await getAllSubcategories()
    return results.json()
  } catch (error) {
    console.log('algo deu errado com o retorno das categorias...')
  }
}

async function criaMenu(): Promise<[Category[], Subcategory[]]> {
    const categorias: Category[] = await getCategories()
    const subcategorias: Subcategory[] = await getSubcategories()

    let categorias_vazias:Category[] = []
    categorias_vazias = categorias.filter((categoria: Category) =>
        !subcategorias.some((subcategoria: Subcategory) =>
            subcategoria.category_id === categoria.category_id
        )
    )
    
    categorias.map((categoria: Category) => {
        if (categorias_vazias.includes(categoria)) {
            categoria.hasSubcategories = false
        }
        categoria.hasSubcategories = true
    })

    return [categorias, subcategorias]
}

export const Menu = async () => {
    const [categorias, subcategorias] = await criaMenu()
    return (
        <li>
                <details>
                    <summary>
                        <Link href={`/categories`}>
                            Categorias
                        </Link>
                    </summary>
                    {categorias.map((categoria: Category) => (
                        !categoria.hasSubcategories ? (
                            <li key={categoria.category_id}>
                                <Link href={`/categories/${categoria.name}`}>
                                    {categoria.title}
                                </Link>
                            </li>
                        ) : 
                        (
                            <li key={categoria.category_id}>
                                <details>
                                    <summary><Link href={`/categories/${categoria.name}`}>{categoria.title}</Link></summary>
                                    <ul>
                                        {subcategorias.map((subcategoria: Subcategory) => (
                                            subcategoria.category_id == categoria.category_id && (
                                                <li key={subcategoria.subcategory_id}>
                                                    <Link href={`/categories/${categoria.name}/${subcategoria.name}`}>
                                                        {subcategoria.title}
                                                    </Link>
                                                </li>
                                            )
                                        ))}
                                    </ul>
                                </details>
                            </li>
                        )
                    ))}
                </details>
        </li>
    )
}