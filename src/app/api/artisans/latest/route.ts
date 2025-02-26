import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
async function listLatestArtisans() {
  const { rows } = await sql`
        SELECT 
            a.id, 
            a.first_name, 
            a.last_name, 
            a.address, 
            a.image_url, 
            a.created_at,
            COALESCE(json_agg(
                jsonb_build_object('id', c.id, 'name', c.category_name)
            ) FILTER (WHERE c.id IS NOT NULL), '[]') AS categories
        FROM artisans a
        LEFT JOIN artisan_categories ac ON ac.artisan_id = a.id
        LEFT JOIN categories c ON ac.category_id = c.id
        GROUP BY a.id 
        ORDER BY a.created_at DESC
    `;

  return rows || [];
}

export async function GET() {
    try {
        const result = await listLatestArtisans()

        if (result.length === 0) {
            return NextResponse.json({
                message: "No latest artisans found",
                data: []
            }, {status: 200})
        }

        return NextResponse.json({
            message: "List latest artisans successfully",
            data: result
        }, {status: 200})
    } catch (error) {
        console.error("Error while listing latest artisans: ", error)
        return NextResponse.json({
            message: `Server error: ${error}`
        }, {status: 500})
    }
}