import { sql } from "@vercel/postgres";
import { ParamsType } from "@/types/data";
import { NextResponse } from "next/server";

async function fetchProductsByArtisanId(id: string) {
  if (!id) return;

  const result = await sql`
        SELECT p.id, p.product_name, p.price, p.quantity, p.description, p.image_url, p.created_at, c.category_name
        FROM products p
        JOIN categories c ON c.id = p.category_id
        WHERE p.artisan_id = ${id}
    `;

    return result.rows || []
}

export async function GET(req: Request, {params}: {params: Promise<ParamsType>}) {
    try {
        const {id} = await params

        if (!id) {
            return NextResponse.json({
                message: "ID is missing",
                data: []
            }, {status: 400})
        }
    
        const result = await fetchProductsByArtisanId(id);
    
        if (!result || result.length ===0) {
            return NextResponse.json({
                message: "No products belonging to this artisan",
                data: []
            }, {status: 404})
        }
    
        return NextResponse.json({
            message: "Fetch products belonging to this artisan successfully",
            data: result
        }, {status: 200})
    } catch (error) {
        return NextResponse.json({
            message: "Server error: ",
            error
        }, {status: 500})
    }
}
