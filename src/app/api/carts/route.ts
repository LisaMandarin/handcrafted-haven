import { NextResponse } from "next/server";
import { cartType } from "@/types/data";
import { sql } from "@vercel/postgres";
import { v4 as uuidv4 } from "uuid";

async function addProductToCart(body: cartType) {
  const id = uuidv4();
  const created_at = new Date().toISOString();
  const result = await sql`
        INSERT INTO carts (id, created_at, product_id, user_id, quantity)
        VALUES (${id}, ${created_at}, ${body.product_id}, ${body.user_id}, ${body.quantity})
    `;
  return result;
}
export async function POST(req: Request) {
  try {
    const body: cartType = await req.json();
    if (!body) {
      return NextResponse.json(
        {
          message: "Invalid payload",
        },
        { status: 400 }
      );
    }
    const result = await addProductToCart(body);
    if ((result.rowCount ?? 0) > 0) {
      return NextResponse.json(
        {
          message: "",
          success: true,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "",
          success: false,
        },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Server error",
        error,
      },
      { status: 500 }
    );
  }
}
