import { sql } from "@vercel/postgres";
import { ParamsType } from "@/types/data";
import { NextResponse } from "next/server";

async function fetchCategory(id: string) {
  const result = await sql`
        SELECT * FROM categories
        WHERE id = ${id}
        LIMIT 1
    `;
  return result.rows[0] || [];
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
          message: "Invalid ID",
          data: [],
        },
        { status: 400 }
      );
    }

    const result = await fetchCategory(id);

    if (result.length === 0) {
      return NextResponse.json({
        message: `Failed to fetdch category ${id}`,
        data: [],
      }, {status: 404});
    }

    return NextResponse.json({
      message: "Fetch category successfully",
      data: result,
    }, {status: 200});
  } catch (error) {
    return NextResponse.json({
        message: "Server error", 
        error
    }, {status: 500})
  }
}
