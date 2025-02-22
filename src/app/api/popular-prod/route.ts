import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

async function fetchPopularProducts() {
  const result = await sql`
        SELECT p.id, p.product_name, p.image_url, ROUND(COALESCE(AVG(r.rate), 0), 1) AS rate, COUNT(r.id) AS review_count
        FROM products p
        LEFT JOIN reviews r ON p.id = r.product_id
        GROUP BY p.id
        ORDER BY rate DESC, review_count
        LIMIT 4
    `;
  return result.rows || [];
}

export async function GET() {
  try {
    const products = await fetchPopularProducts();

    if (products.length > 0) {
      return NextResponse.json(
        {
          message: "Fetch the most 3 popular products successfully",
          data: products,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "No popular products found",
          data: [],
        },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch the most 3 popular products",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
