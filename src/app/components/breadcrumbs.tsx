'use client'

import { BreadcrumbCategoria, BreadcrumbsType, BreadcrumbSubcategoria, CategoryEnum } from '@//types/breadcrumbs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// function mapBreadcrumbs(pathname: string[]) {
//     let categoria: string = ''
//     for (const key of Object.values(CategoryEnum)) {
//         if (key === pathname[0])
//             categoria = CategoryEnum[key as keyof typeof CategoryEnum]
//     }


// }

// location: Location
export const Breadcrumbs = () => {
    const pathname = usePathname();
    const breadcrumbs: string[] = getBreadcrumbs()


    function getBreadcrumbs(): string[] {
        // pathname: "/categories/electronics/smartphones"
        // let pathname = location.pathname.substring(11).split('/')
        const segments = pathname.substring(11).split('/')
        segments.shift()
        
        const _segments = segments.map((segment): string => {
            return segment.charAt(0).toUpperCase() + segment.slice(1)
        })
        console.log('_segments', _segments)
        
        // mapBreadcrumbs()
        return _segments
    }

    function orderBreadcrumbs(breadcrumbs: BreadcrumbsType): BreadcrumbSubcategoria[] {
        if (breadcrumbs.subcategorias.length == 0)
            return breadcrumbs.subcategorias

        const subcategorias = breadcrumbs.subcategorias
        subcategorias.sort((a, b) => a.order - b.order)
        return subcategorias
    }

    // breadcrumbs.subcategorias = orderBreadcrumbs(breadcrumbs)
    return (
        <div className="breadcrumbs text-sm">
            <ul>
                {breadcrumbs.map((breadcrumb) => (
                    <li key={breadcrumb}>
                        <Link href={breadcrumb}>{breadcrumb}</Link>
                    </li>
                ))}
                {/* {breadcrumbs} */}
                {/* <li><a>Home</a></li>
                <li><a>Documents</a></li>
                <li>Add Document</li> */}
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
