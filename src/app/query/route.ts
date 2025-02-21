import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
async function listData() {
    const result = await sql`
        SELECT p.id, p.product_name, p.image_url, ROUND(COALESCE(AVG(r.rate), 0), 1) AS "averageRate"
        FROM products p
        LEFT JOIN reviews r ON p.id = r.product_id
        GROUP BY (p.id)
        ORDER BY ROUND(COALESCE(AVG(r.rate), 0), 1) DESC
        LIMIT 3
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