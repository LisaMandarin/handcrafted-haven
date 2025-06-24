import { v4 as uuidv4 } from "uuid";
import { ProductType } from "@/types/data";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

async function addProductsByArtisanId(formData: ProductType) {
  const id = uuidv4();
  const created_at = new Date().toISOString();
  const {product_name, price, quantity, description, image_url, artisan_id, category_id} = formData

  const result = await sql`
        INSERT INTO products 
            (id, product_name, price, quantity, description, image_url, created_at, artisan_id, category_id)
            VALUES (${id}, ${product_name}, ${price}, ${quantity}, ${description}, ${image_url}, ${created_at}, ${artisan_id}, ${category_id})
            RETURNING id
    `;

    return result.rows
}

export async function POST(req: Request) {
    try {
        const body= await req.json();
        if (!body) {
            return NextResponse.json({
                message: "Invalid form data to add product"
            }, {status: 400})
        }
    
        const result = await addProductsByArtisanId(body);
    
        if (!result || result.length ===0) {
            return NextResponse.json({
                message: "Failed to add product",
            }, {status: 404})
        }
    
        return NextResponse.json({
            message: "Product added successfully",
            success: true
        }, {status: 200})
    } catch (error) {
        return NextResponse.json({
            message: "Server error: ",
            error
        }, {status: 500})
    }
}