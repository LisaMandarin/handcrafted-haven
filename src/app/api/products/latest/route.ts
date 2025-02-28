import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"

async function fetchLatestProducts() {
    const result = await sql`
        SELECT p.id, p.product_name, p.price, p.image_url, ROUND(COALESCE(AVG(r.rate), 0), 1) AS rate, COUNT(r.id) AS review_count 
        FROM products p
        LEFT JOIN reviews r ON p.id = r.product_id
        GROUP BY p.id
        ORDER BY p.created_at DESC
    `
    return result.rows || []
}

export async function GET() {
    try {
        const result = await fetchLatestProducts()

    if (result.length === 0) {
        return NextResponse.json({
            message: "No products found",
            data: []
        }, {status: 404})
    }

    return NextResponse.json({
        message: "Fetch latest products successfully",
        data: result
    })
    } catch (error) {
        return NextResponse.json({
            message: "Failed to fetch latest products",
            error
        }, {status: 500})
    }
}