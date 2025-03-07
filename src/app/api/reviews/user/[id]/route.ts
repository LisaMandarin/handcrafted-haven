import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { ParamsType } from "@/types/data";

async function fetchReviewsByUserId(id: string) {
  const result = await sql`
        SELECT r.id, r.created_at, r.rate, r.comment, p.product_name, p.image_url
        FROM reviews r
        JOIN products p ON p.id = r.product_id
        WHERE r.user_id = ${id}
    `;
  return result.rows || [];
}


export async function GET(req: Request, {params} : {params: Promise<ParamsType>}) {
    try {
        const {id} = await params
        if (!id) {
            return NextResponse.json({
                message: "ID is missing",
                data: []
            }, {status: 400})
        }

        const result = await fetchReviewsByUserId(id)

        if (result.length === 0) {
            return NextResponse.json({
                message: `No reviews found by ID ${id}`,
                data: []
            }, {status: 404})
        }

        return NextResponse.json({
            message: `Fetch reviews by ID ${id} successfully`,
            data: result
        })

    } catch (error) {
        return NextResponse.json({
            message: "Server Error",
            error
        }, {status: 500})
    }
}