import { Category, Subcategory, UserAuth } from "@//types/menu"
import Link from "next/link"
import { getAllCategories } from "../lib/prisma-db-categories"
import { getAllSubcategories } from "../lib/prisma-db-subcategories"
import { CategoryResponse } from "@//types/categories"
import { SubcategoryResponse } from "@//types/subcategories"
import { getUserAuth } from "../utils/menu"

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

/* 
não autenticado
{
    "tokenType": "session_token",
    "sessionClaims": null,
    "sessionId": null,
    "sessionStatus": null,
    "userId": null,
    "actor": null,
    "orgId": null,
    "orgRole": null,
    "orgSlug": null,
    "orgPermissions": null,
    "factorVerificationAge": null,
    "isAuthenticated": false
}

autenticado
{
    "tokenType": "session_token",
    "sessionClaims": {
        "azp": "http://localhost:3000",
        "exp": 1770381074,
        "fva": [
            0,
            -1
        ],
        "iat": 1770381014,
        "iss": "https://brief-condor-52.clerk.accounts.dev",
        "jti": "89ed7b16f45a5fd55005",
        "metadata": {
            "role": "seller"
        },
        "nbf": 1770381004,
        "sid": "sess_39IQH3qK0QjGog81FhL5VZs7Qyr",
        "sts": "active",
        "sub": "user_37NV8CBhziwB8MnnAQ5NOiC4IM3",
        "v": 2
    },
    "sessionId": "sess_39IQH3qK0QjGog81FhL5VZs7Qyr",
    "sessionStatus": "active",
    "userId": "user_37NV8CBhziwB8MnnAQ5NOiC4IM3",
    "factorVerificationAge": [
        0,
        -1
    ],
    "isAuthenticated": true
}

*/

export const Menu = async () => {
    const userAuth = await getUserAuth() as UserAuth
    const usuarioVendedor = userAuth?.role === 'seller'

    const [categorias, subcategorias] = await criaMenu()
    return (
        <>
            {usuarioVendedor && (
                <li>
                    <details>
                        <summary>
                            <Link href={`/dashboard`}>
                                Dashboard
                            </Link>
                        </summary>
                        <li>
                            <Link href="/user-profile">
                                Manage Account
                            </Link>
                        </li>
                        <li>
                            <details>
                                <summary>
                                    <Link href="/management">
                                        Manage Website
                                    </Link>
                                </summary>
                                <ul>
                                    <li>
                                        <Link href="/management/categories">
                                            Manage Categories
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/management/subcategories">
                                            Manage Subcategories
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/management/categories">
                                            Manage Products
                                        </Link>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </details>
                </li>
            )}
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
        </>
    )
}