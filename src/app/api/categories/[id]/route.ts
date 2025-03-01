import { ParamsType } from "@/types/data"
import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

async function listProductsByCategoryId(id: string) {
    const result = await sql`
        SELECT p.id, p.product_name, p.image_url, p.price, round(COALESCE(AVG(r.rate), 0), 1) AS rate, COUNT(r.id) AS review_count
        FROM products p
        LEFT JOIN reviews r ON p.id = r.product_id
        JOIN categories c ON p.category_id = c.id
        WHERE c.id = ${id}
        GROUP BY p.id
    `
    return result.rows || []
}

export async function GET(req: Request, {params}: {params: Promise<ParamsType>}) {
    try {
        const {id} = await params

    if (!id) {
        return NextResponse.json({
            message: "Invalid category ID",
            data: []
        }, {status: 400})
    }

    const result = await listProductsByCategoryId(id)

    if (result.length === 0) {
        return NextResponse.json({
            message: "No products in this category found",
            data: []
        }, {status: 404})
    }

    return NextResponse.json({
        message: `List products by category ${id} successfully: `,
        data: result
    })
    } catch (error) {
        return NextResponse.json({
            message: "Server error: ",
            error
        }, {status: 500})
    }
}