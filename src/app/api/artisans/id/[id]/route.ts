import { sql } from "@vercel/postgres"
import { ParamsType } from "@/types/data"
import { NextResponse } from "next/server"
import { ArtisanDetailType } from "@/types/data"

async function fetchArtisanById(id: string) {
    const result = await sql`
         SELECT 
            a.id, 
            a.first_name, 
            a.last_name, 
            a.address,
            a.image_url,
            a.introduction,
            a.created_at,
            COALESCE(json_agg(
                json_build_object('id', c.id, 'category_name', c.category_name)
            ) FILTER (WHERE c.id IS NOT NULL), '[]') AS categories
        FROM artisans a
        LEFT JOIN artisan_categories ac ON a.id = ac.artisan_id
        LEFT JOIN categories c ON ac.category_id = c.id
        WHERE a.id = ${id}
        GROUP BY a.id
        LIMIT 1
    `
    return result.rows[0] || []
}

async function updateArtisanById(id: string, data: ArtisanDetailType) {
    const result = sql`
    UPDATE artisans 
    SET first_name=${data.first_name}, last_name=${data.last_name}, address=${data.address}, image_url=${data.image_url}, introduction=${data.introduction}
    WHERE id = ${id}
    `
    return result;
}

export async function GET(req: Request, {params}: {params: Promise<ParamsType>}) {
    try {
        const { id } = await params

        if (!id) {
            return NextResponse.json({ message: "Invalid artisan ID" }, { status: 400 })
        }
        const result = await fetchArtisanById(id)
        
        if (result) {
            return NextResponse.json({
                message: "Fetch artisan by ID successfully",
                data: result
            })
        } else {
            return NextResponse.json(
                {
                    message: "No artisan found"
                },
                { status: 404 }
            )
        }
    } catch (error) {
        return NextResponse.json(
            {
                message: "Server Error while fetching artisan by id",
                error: error instanceof Error ? error.message : error
            },
            { status: 500 }
        )
    }

}

export async function PUT(req: Request, {params}: {params: Promise<ParamsType>}) {
    const {id} = await params;
    if (!id) {
            return NextResponse.json({ message: "Invalid artisan ID", success: false}, { status: 400 })
        }
    try {
        const body = await req.json();
        const result = await updateArtisanById(id, body);
        if ((result.rowCount ?? 0) > 0) {
            return NextResponse.json({ message: `Artisan ${id} updated successfully`, success: true})
        } else {
            return NextResponse.json({ message: `Failed to update Artisan ${id}`, success: false}, {status: 404})
        }
    } catch (error) {
        return NextResponse.json({
            message: "Server Error while updating artisan by id",
            error: error instanceof Error ? error.message : error,
            success: false
         },{status: 500})
    }
}