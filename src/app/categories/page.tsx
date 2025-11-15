import Link from "next/link"

type Subcategory = {
    name: string
}

type Category = {
    name: string
    title: string
    subcategories?: Subcategory[] | null
}

export default function Categories() {
    const categories: Category[] = [
        { 
            name: 'books-stationery',
            title: 'books & stationery',
            subcategories: [
                { name: 'books' },
                { name: 'office supplies' }
            ]
        },
        {
            name: 'electronics-appliances',
            title: 'electronics & appliances',
            subcategories: [
                { name: 'technology' },
                { name: 'home appliances' }
            ]
        },
        {
            name: 'apparel-accessories',
            title: 'apparel & accessories',
            subcategories: [
                { name: 'clothing' },
                { name: 'footwear' },
                { name: 'accessories' }
            ]
        },
    ]

    return (
        <div>
            {categories.map(({name}: Category) => (
                <Link href={`/categories/${name}`}>{name.toUpperCase()}</Link>
            ))}
            {/* <Category name="furniture" /> */}
            {/* <Category name="technology" />
            <Category name="fashion" />
            <Category name="appliances" /> */}
        </div>
    )
}