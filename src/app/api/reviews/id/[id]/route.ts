import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { ParamsType } from "@/types/data";

async function deleteReviewById(id: string) {
  const result = await sql`
    DELETE FROM reviews WHERE id=${id}
  `
  return result;
}

export async function DELETE({params}: {params: Promise<ParamsType>}) {
    const {id} = await params;
    if (!id) {
            return NextResponse.json({ message: "Invalid review ID", success: false}, { status: 400 })
        }
    try {
        const result = await deleteReviewById(id);
        if ((result.rowCount ?? 0) > 0) {
            return NextResponse.json({ message: `Review ${id} deleted successfully`, success: true})
        } else {
            return NextResponse.json({ message: `Failed to delete Review ${id}`, success: false}, {status: 404})
        }
    } catch (error) {
        return NextResponse.json({
            message: "Server Error while deleting review by id",
            error: error instanceof Error ? error.message : error,
            success: false
         },{status: 500})
    }
}