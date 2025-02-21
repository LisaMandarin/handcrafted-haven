import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const products = await fetchPopularProducts();

    if (products.length > 0) {
      return res.status(200).json({
        message: "Fetch the most 3 popular products successfully",
        data: products,
      });
    } else {
      return res.status(404).json({
        message: "No popular products found",
        data: [],
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch the most 3 popular products",
      error: error instanceof Error ? error.message : error,
    });
  }
}
