import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
// const id = "06e99fdc-6d59-4532-8893-22f9a9ebda98"  // product
// const query = "candle"
// const newQuery = `%${query}%`
// const leatherCategory = "21dff6d8-3a79-4882-b8ef-78412b7ba946"
const country = "Australia"
async function listData() {
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
    return result.rows
}

export async function GET() {
    try {
        const data = await listData();
        return NextResponse.json({data}, {status: 200})
        
    } catch (error) {
        return NextResponse.json({ error}, {status: 500})
    }
}