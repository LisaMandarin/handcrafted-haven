import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
// const id = "06e99fdc-6d59-4532-8893-22f9a9ebda98"  // product
const query = "candle"
// const newQuery = `%${query}%`
async function listData() {
    const leatherCategory = "21dff6d8-3a79-4882-b8ef-78412b7ba946"
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
        WHERE ac.category_id = ${leatherCategory}
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