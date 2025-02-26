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
        console.log('categoryIDs: ', categoryIDs)
        // const categories = {
        //     leather: "21dff6d8-3a79-4882-b8ef-78412b7ba946",
        //     mosaic: "34a76a1b-6d4c-4911-9f93-093129c3a4b6",
        //     textile: "712e774e-0ad4-4c10-8a1a-981f9df5f7e8",
        //     bath: "8761b01c-b6c3-4f3d-901a-196451de41fa",
        //     metal: "a5f1749f-89be-44e1-a6e1-f2c21b5eb930",
        //     woodcraft: "b9e1a526-77c1-4a9a-8e0f-6599b6e2f00c",
        //     paper: "c1a6319c-5825-4d83-8989-c05b4a3cb3cb",
        //     pottery: "d8e9f8b6-7cb4-4fbb-bc07-23dfeff30c2d",
        //     other: "e10d8d8d-8c91-44d3-b8c0-1dfb6d2179a3",
        //     glass: "f40f68b8-e8c3-473a-b6b3-324684703c19",
        //     candles: "f65053b2-3d83-4ef4-a6fa-e3b34f43f3d7",
        //   };

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