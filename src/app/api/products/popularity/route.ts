import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

async function fetchPopularProducts() {
    const result = await sql`
        SELECT p.id, p.product_name, p.image_url, p.price, ROUND(COALESCE(AVG(r.rate), 0), 1) AS rate, COUNT(r.id) AS review_count 
        FROM products p
        LEFT JOIN reviews r ON p.id = r.product_id
        GROUP BY p.id
        HAVING COUNT(r.id) > 0
        ORDER BY review_count DESC
    `
    return result.rows || []
}

export async function GET() {
    try {
        const result = await fetchPopularProducts()

        if (!result || result.length === 0) {
            return NextResponse.json({
                message: "No popular products found",
                data: []
            }, {status: 404})
        }

        return NextResponse.json({
            message: "Popular products found",
            data: result
        })
    } catch (error) {
        console.error("Error fetching popular products", error)
        return NextResponse.json({
            message: "Error fetching popular products",
            error
    }, {status: 500})   
    }
}