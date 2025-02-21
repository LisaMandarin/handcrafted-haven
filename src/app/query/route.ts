import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
const id = "06e99fdc-6d59-4532-8893-22f9a9ebda98"  // product
async function listData() {
    const result = await sql`
        SELECT p.id, p.product_name, p.price, p.quantity, p.description, p.image_url, p.created_at, a.id AS artisan_id, a.first_name, a.last_name, c.id AS category_id, c.category_name
        FROM products p
        JOIN artisans a ON p.artisan_id = a.id
        JOIN categories c ON p.category_id = c.id
        WHERE p.id = ${id}
        LIMIT 1
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