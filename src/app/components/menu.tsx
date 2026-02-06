import { Category, Subcategory } from "@//types/menu"
import Link from "next/link"
import { getAllCategories } from "../lib/prisma-db-categories"
import { getAllSubcategories } from "../lib/prisma-db-subcategories"
import { CategoryResponse } from "@//types/categories"
import { SubcategoryResponse } from "@//types/subcategories"

async function getCategories() {
    try {
        const results = await getAllCategories()
        return results as CategoryResponse[]
    } catch (error) {
        console.log('algo deu errado com o retorno das categorias...')
    }
}

async function getSubcategories() {
  try {
    const results = await getAllSubcategories()
    return results as SubcategoryResponse[]
  } catch (error) {
    console.log('algo deu errado com o retorno das categorias...')
  }
}

async function criaMenu(): Promise<[Category[], Subcategory[]]> {
    let _categorias: Category[] = []
    let _subcategorias: Subcategory[] = []
    try {
        const categorias = await getCategories() as CategoryResponse[]
        const subcategorias = await getSubcategories() as SubcategoryResponse[]
        _categorias = categorias as Category[]
        _subcategorias = subcategorias as Subcategory[]

        let categorias_vazias = []
        categorias_vazias = _categorias.filter((categoria: Category) =>
            !_subcategorias.some((subcategoria: Subcategory) =>
                subcategoria.category_id === categoria.category_id
            )
        )
        
        _categorias.map((categoria: CategoryResponse) => {
            const _categoria = categoria as Category
            if (categorias_vazias.includes(_categoria)) {
                _categoria.hasSubcategories = false
            }
            _categoria.hasSubcategories = true
        })

    } catch (error) {
        console.error('Algo deu errado ao carregar as categorias e subcategorias')
    }

    return [_categorias, _subcategorias]
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