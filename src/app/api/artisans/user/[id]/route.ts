import { sql } from "@vercel/postgres";
import { ParamsType } from "@/types/data";
import { NextResponse } from "next/server";

async function fetchArtisanByUserId(id: string) {
  if (!id) return;
  const result = await sql`
        SELECT * FROM artisans a
        WHERE a.user_id = ${id}
        LIMIT 1
    `;
  return result.rows[0] || null;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<ParamsType> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        {
          message: "ID is missing",
        },
        { status: 400 }
      );
    }
    const result = await fetchArtisanByUserId(id);

    if (!result || result.length === 0) {
      return NextResponse.json({
        message: "Failed to fetch artisan",
        data: null,
      }, {status: 404});
    }

    return NextResponse.json(
      {
        message: "Fetch artisan by user ID successfully",
        data: result,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Server error: ",
        error,
      },
      { status: 500 }
    );
  }
}
