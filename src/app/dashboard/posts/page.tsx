import { getSession } from "@/utils/session"

async function fetchProducts(id: string) {
    try {
        if (!id) {
            console.error("ID is missing")
            return
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/artisan/${id}`)
        if (!response.ok) {
            console.error("Unable to fetch products")
            return
        }

        const {data} = await response.json()
        return data

    } catch (error) {
        console.error(`Server error: ${error}`)
    }
}


export default async function PostsPage() {
    const session = await getSession()
    // const products  = await fetchProducts(session?.id)
    
    
    return (
        <>Posts page</>
    )
}