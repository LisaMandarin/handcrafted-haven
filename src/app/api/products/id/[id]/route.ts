import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { ParamsType } from "@/types/data";
import { ProductDetailType } from "@/types/data";

async function fetchProductById(id: string) {
  const result = await sql`
        SELECT p.id, p.product_name, p.price, p.quantity, p.description, p.image_url, p.created_at, a.id AS artisan_id, a.first_name, a.last_name, c.id AS category_id, c.category_name
        FROM products p
        JOIN artisans a ON p.artisan_id = a.id
        JOIN categories c ON p.category_id = c.id
        WHERE p.id = ${id}
        LIMIT 1
    `;
  return result.rows[0] || null;
}

async function updateProductById(id: string, data: ProductDetailType ) {
  const result = await sql`
    UPDATE products
    SET product_name=${data.product_name}, description=${data.description}, quantity=${data.quantity}, price=${data.price}
    WHERE id=${id}
  `
  return result;
}

export async function GET(req: Request, {params} : {params: Promise<ParamsType>}) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ message: "Invalid product ID" }, { status: 400 });
    }

    const result = await fetchProductById(id);

    if (result) {
      return NextResponse.json({
        message: "Fetch products by ID successfully",
        data: result,
      });
    } else {
      return NextResponse.json(
        {
          message: "No products ",
        },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Server Error while fetching product by id",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}


export async function PUT(req: Request, {params}: {params: Promise<ParamsType>}) {
    const {id} = await params;
    if (!id) {
            return NextResponse.json({ message: "Invalid product ID", success: false}, { status: 400 })
        }
    try {
        const body = await req.json();
        const result = await updateProductById(id, body);
        if ((result.rowCount ?? 0) > 0) {
            return NextResponse.json({ message: `Product ${id} updated successfully`, success: true})
        } else {
            return NextResponse.json({ message: `Failed to update Product ${id}`, success: false}, {status: 404})
        }
    } catch (error) {
        return NextResponse.json({
            message: "Server Error while updating product by id",
            error: error instanceof Error ? error.message : error,
            success: false
         },{status: 500})
    }
}