import { ParamsType } from "@/types/data";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

async function fetchCartQuantityByUserID(id: string) {
    if (!id) return;

    const result = await sql`
        SELECT id, quantity, product_id, user_id, created_at FROM carts WHERE user_id = ${id}
    `
    return result.rows || []
}

export async function GET(req: Request, {params}: {params: Promise<ParamsType>}) {
    try {
        const {id} = await params
        if (!id) {
            return NextResponse.json({
                message: "Invalid user ID",
                success: false
            }, {status: 400})
        }

        const result = await fetchCartQuantityByUserID(id)
        if (!result || result.length === 0) {
            return NextResponse.json({
                message: "No cart quantity by this user",
                data: [],
                success: true
            }, {status: 200})
        }

        return NextResponse.json({
            message: "Fetch cart quantity successfully",
            data: result,
            success: true
        }, {status: 200})
    } catch(error) {
        return NextResponse.json({
            message: "", error
        }, {status: 500})
    }
}