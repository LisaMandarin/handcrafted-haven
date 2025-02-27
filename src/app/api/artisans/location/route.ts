import { sql, QueryResultRow } from "@vercel/postgres"
import { NextResponse } from "next/server"

async function fetchLocations() {
    const result = await sql`
        SELECT DISTINCT 
            SPLIT_PART(address, ', ', COALESCE(ARRAY_LENGTH(STRING_TO_ARRAY(address, ', '), 1), 1)) AS country
        FROM artisans
        WHERE address IS NOT NULL AND address != ''
    `
    return result.rows || []
}

async function fetchArtisansByLocation(country: string) {
    const result = await sql`
         SELECT 
            a.id, 
            a.first_name, 
            a.last_name, 
            a.address, 
            a.image_url, 
            a.created_at,
            COALESCE(json_agg(
                jsonb_build_object('id', c.id, 'category_name', c.category_name)
            ) FILTER (WHERE c.id IS NOT NULL), '[]') AS categories
        FROM artisans a
        LEFT JOIN artisan_categories ac ON ac.artisan_id = a.id
        LEFT JOIN categories c ON ac.category_id = c.id
        WHERE address ILIKE ${'%' + country}
        GROUP BY a.id 
    `
    return result.rows || []
}

export async function GET() {
    try {
        const locations = await fetchLocations()
        const locationCountries = locations.map((location) => location.country)

        const locationResults = await Promise.all(
            locationCountries.map(async (country) => {
                try {
                    const data = await fetchArtisansByLocation(country)
                    return {[country]: data}
                } catch (error) {
                    console.error(`Error fetching ${country} artisans: `, error)
                    return {[country]: "Error fetching data"}
                }
            }) 
        )

        const artisansData = locationResults.reduce((acc: Record<string, QueryResultRow[]>, obj) => {
            return {...acc, ...obj}
        }, {})

        const allEmpty = Object.values(artisansData).every((location) => Array.isArray(location) && location.length === 0)

        if (allEmpty) {
            return NextResponse.json({
                message: "No artisans found",
                data: []
            }, {status: 400})
        }

        return NextResponse.json({
            message: "Fetch artisans by location successfully",
            data: artisansData
        }, {status: 200})
    } catch (error) {
        return NextResponse.json({
            message: `Server error: ${error}`
        }, {status: 500})
    }
}