import { DashboardPurchaseType } from "@/types/data";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

async function updateReview(body: DashboardPurchaseType) {
    const result = await sql`
        UPDATE reviews
        SET comment=${body.comment}, rate=${body.rate}
        WHERE id=${body.id}
    `
    return result;
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const result = await updateReview(body);
        if ((result.rowCount ?? 0) > 0) {
            return NextResponse.json({
                message: "Review is updated successfully",
                success: true
            })
        } else {
            return NextResponse.json({
                message: "Failed to update the review",
                success: false
            }, {status: 404})
        }
    } catch (error) {
        return NextResponse.json({
            message: "Server error while updating the review",
            error: error instanceof Error? error.message : error,
            success: false
        }, {status: 500})

    }
}