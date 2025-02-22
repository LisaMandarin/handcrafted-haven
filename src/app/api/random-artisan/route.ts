import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

async function fetchRandomArtisan() {
  const result = await sql`
        SELECT * FROM artisans
        ORDER BY RANDOM()
        LIMIT 1
    `;
  return result.rows[0] || null;
}

export async function GET() {
  try {
    const artisan = await fetchRandomArtisan();

    if (artisan) {
      return NextResponse.json(
        {
          message: "Fetch random Artisan successfully",
          data: artisan,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Random artisan not found",
          data: null,
        },
        { status: 404 }
      );
    }
  } catch (error) {
    NextResponse.json(
      {
        message: "Failed to fetch random artisan",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
