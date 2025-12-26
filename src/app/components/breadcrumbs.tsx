import { BreadcrumbCategoria, BreadcrumbsType, BreadcrumbSubcategoria, CategoryEnum } from '@//types/categories_subcategories'
import Link from 'next/link'

// function mapBreadcrumbs(pathname: string[]) {
//     let categoria: string = ''
//     for (const key of Object.values(CategoryEnum)) {
//         if (key === pathname[0])
//             categoria = CategoryEnum[key as keyof typeof CategoryEnum]
//     }
    
    
// }

function getBreadcrumbs(location: Location): string[] {
    // pathname: "/categories/electronics/smartphones"
    let pathname = location.pathname.substring(11).split('/')
    pathname.shift()

    // mapBreadcrumbs()
    return pathname
}

function orderBreadcrumbs(breadcrumbs: BreadcrumbsType): BreadcrumbSubcategoria[] {
    if (breadcrumbs.subcategorias.length == 0)
        return breadcrumbs.subcategorias

    const subcategorias = breadcrumbs.subcategorias
    subcategorias.sort((a, b) => a.order - b.order)
    return subcategorias
}
// location: Location
export const Breadcrumbs = () => {
    // const breadcrumbs: string[] = getBreadcrumbs(location)
    // breadcrumbs.subcategorias = orderBreadcrumbs(breadcrumbs)
    return (
        <div className="breadcrumbs text-sm">
            <ul>
                {/* {breadcrumbs} */}
                <li><a>Home</a></li>
                <li><a>Documents</a></li>
                <li>Add Document</li>
                {/* <li>
                    <Link href='/categories'>Categories</Link>
                </li>
                <li>
                    <Link href={breadcrumbs.categoria.link}>{breadcrumbs.categoria.nome}</Link>
                </li>
                {breadcrumbs.subcategorias.length > 0
                    ? breadcrumbs.subcategorias.map((breadcrumb: BreadcrumbSubcategoria) => (
                        <Link href={breadcrumb.link}>{breadcrumbs.categoria.nome}</Link>
                    ))
                    : ''
                } */}
            </ul>
        </div>
    )
}
