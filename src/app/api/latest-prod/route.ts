import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

async function fetchLatest3Products() {
  const result = await sql`
        SELECT p.id, p.product_name, p.price, p.image_url
        FROM products p
        ORDER BY p.created_at DESC
        LIMIT 4
    `;
  return result.rows || [];
}

export async function GET() {
  try {
    const products = await fetchLatest3Products();

    if (products.length > 0) {
      return NextResponse.json(
        {
          message: "Fetch the latest 3 products successfully",
          data: products,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "No products found",
          data: [],
        },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch the latest 3 products",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
