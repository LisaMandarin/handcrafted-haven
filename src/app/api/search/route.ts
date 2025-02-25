import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
async function search(query: string) {
    const newQuery = `%${query}%`
    const { rows } = await sql`
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
    `;
    return rows;
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get("query");
        
        if (!query) {
            return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
        }

        const result = await search(query);
        
        return NextResponse.json({
            message: "Search successful",
            data: result
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }   
}