import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

async function listCategories() {
  
    const result = await sql`
        SELECT * FROM categories
    `;
    return result.rows || [];
}

export async function GET() {
    try {
        const categories = await listCategories()
        if (categories.length > 0) {
            return NextResponse.json({
                message: 'List categories successfully',
                data: categories
            }, {status: 200})
        } else {
            return NextResponse.json({
                message: 'No categories found',
                data: []
            }, {status: 404})
        }
    } catch (error: unknown) {
        return NextResponse.json({
            message: 'Failed to list categories',
            error: error instanceof Error ? error.message : error
        }, {status: 500})
    }
    
}
