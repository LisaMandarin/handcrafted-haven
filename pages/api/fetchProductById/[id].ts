import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

async function fetchProductById(id: string) {
  const result = await sql`
        SELECT p.product_name, p.price, p.quantity, p.description, p.image_url, p.created_at, a.id AS artisan_id, a.first_name, a.last_name, c.id AS category_id, c.category_name
        FROM products p
        JOIN artisans a ON p.artisan_id = a.id
        JOIN categories c ON p.category_id = c.id
        WHERE p.id = ${id}
        LIMIT 1
    `;
  return result.rows[0] || null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;

    if (!id || typeof id !== "string") {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    const result = await fetchProductById(id);

    if (result) {
      res.status(200).json({
        message: "Fetch products by ID successfully",
        data: result,
      });
    } else {
      res.status(404).json({
        message: "No products ",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error while fetching product by id",
      error: error instanceof Error ? error.message : error,
    });
  }
}
