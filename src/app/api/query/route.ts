import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
// const id = "06e99fdc-6d59-4532-8893-22f9a9ebda98"  // product
const query = "candle"
const newQuery = `%${query}%`
async function listData() {
    const result = await sql`
        SELECT DISTINCT on (p.id)
            p.id,
            p.product_name,
            p.image_url,
            p.price
        FROM products p
        LEFT JOIN artisans a ON p.artisan_id = a.id
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN reviews r ON p.id = r.product_id
        LEFT JOIN users u ON r.user_id = u.id
        WHERE p.product_name ILIKE ${newQuery}
            OR p.description ILIKE ${newQuery}
            OR a.first_name ILIKE ${newQuery}
            OR a.last_name ILIKE ${newQuery}
            OR a.address ILIKE ${newQuery}
            OR a.introduction ILIKE ${newQuery}
            OR c.category_name ILIKE ${newQuery}
            OR r.comment ILIKE ${newQuery}
            OR u.username ILIKE ${newQuery}
        LIMIT 50
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