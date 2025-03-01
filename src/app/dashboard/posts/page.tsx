import { getSession } from "@/utils/session"

async function fetchArtisan(id: string) {
    try {
        if (!id) {
            console.error("ID missing")
            return
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/artisans/user/${id}`)

        if (!response.ok) {
            console.error("Unable to fetch the artisan")
            return
        }

        const {data} = await response.json()
        return data

    } catch (error) {
        console.error(`Server error: ${error}`)
    }
}

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
    const artisan = await fetchArtisan(session?.user?.id)
    
    const products  = await fetchProducts(artisan.id)
        
    return (
        <>Posts page</>
    )
}