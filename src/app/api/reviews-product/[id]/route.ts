import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

async function listReviewsByProductId(id: string) {
  const result = await sql`
        SELECT r.id, r.created_at, r.rate, r.comment, u.username FROM reviews r
        JOIN users u ON r.user_id = u.id
        WHERE product_id = ${id}
    `;
  return result.rows || [];
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          message: "Invalid ID",
          data: [],
        },
        { status: 404 }
      );
    }

    const reviews = await listReviewsByProductId(id);

    return NextResponse.json(
      {
        message: "List reviews by product ID",
        data: reviews,
      },
      { status: 200 }
    );
  } catch (error) {
    NextResponse.json(
      {
        message: "Failed to list reviews by product ID",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
