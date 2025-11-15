import Link from "next/link"

export const Category = ({name}: {name: string}) => {

    

    return (
        <div>
            <p>{name.toUpperCase()} Page</p>
            <Link href={`/categories/${name}/`}>{name.toUpperCase()} Products</Link>
        </div>
    )
}