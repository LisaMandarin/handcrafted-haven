
import { ProductDetailType } from "@/types/data";

export async function fetchProduct(id: string): Promise<ProductDetailType> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/id/${id}`,
    {cache: "no-store"}
  );

  if (!res.ok) {
    console.error("Unable to fetch the product by ID: ", res.statusText);
  }
  const { data } = await res.json();
  return data;
}