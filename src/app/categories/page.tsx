import Title from "@/components/Title"
import Link from "next/link"
import CategoryCard from "@/components/CategoryCard"
import { CategoryType } from "@/types/data"

async function fetchCategories() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`)

        if (!response.ok) {
            console.error('No categories found')
            return
        }

        const {data} = await response.json()

        return data
    } catch (error) {
        console.error('Unable to fetch Categories: ', error)
    }
}

export default async function CategoriesPage() {
    const breadcrumbItems = [
        {title: (
            <Link href="/">Home</Link>
        )},
        {
            title: "Categories"
        }
    ]
    const categories = await fetchCategories()
    

    return (
        <div>
            <Title name="categories" description="by alphabetial order" breadcrumbItems={breadcrumbItems}/>
            <div className="flex flex-row flex-wrap justify-center gap-4">
                {categories?.length > 0 && categories.map((category: CategoryType) => (
                    <CategoryCard key={category.id} category={category} />
                ))}

            </div>
        </div>
    )
}