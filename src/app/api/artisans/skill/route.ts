import { QueryResultRow, sql } from "@vercel/postgres"
import { NextResponse } from "next/server"

async function listArtisansByCategories(categoryId: string) {
    const result = await sql`
        SELECT
            a.id,
            a.first_name,
            a.last_name,
            a.address,
            a.image_url,
            a.created_at
        FROM artisans a
        JOIN artisan_categories ac ON a.id = ac.artisan_id
        WHERE ac.category_id = ${categoryId}
    `
    return result.rows || []
}

async function listCategories() {
    const result = await sql`
        SELECT * FROM categories
    `
    return result.rows || []
}

export async function GET() {
    try {
        const categories = await listCategories();
        const categoryIDs = categories.map((category) => category.id)

        const categoryResults = await Promise.all(
            categoryIDs.map(async (id) => {
                try {
                    const data = await listArtisansByCategories(id)
                    return {[id]: data}
                } catch (error) {
                    console.error(`Error fetching ${id} artisans: `, error)
                    return {[id]: "Error fetching data"}
                }
            }) 
        )

        const artisansData = categoryResults.reduce((acc: Record<string, QueryResultRow[]>, obj) => {
            return {...acc, ...obj}
        }, {})

        const allEmpty = Object.values(artisansData).every((category) => Array.isArray(category) && category.length === 0)

        if (allEmpty) {
            return NextResponse.json({
                message: "No artisans found",
                data: []
            }, {status: 400})
        }

        return NextResponse.json({
            message: "Fetch artisans by categories successfully",
            data: artisansData
        }, {status: 200})
    } catch (error) {
        return NextResponse.json({
            message: `Error while listing artisans by categories: ${error}`,
        }, {status: 500})
    }
}