import { ParamsType, ProductCardType } from "@/types/data";
import ProductCard from "@/components/ProductCard";

async function fetchProductsByCategoryId(id: string) {
  try {
    if (!id) {
      console.error("Invalid category ID");
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/${id}`
    );

    if (!response.ok) {
      console.error(`Unable to fetch products by category ID: ${id}`);
      return;
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(`Server error: ${error}`);
  }
}

export default async function CategoryIDPage({
  params,
}: {
  params: Promise<ParamsType>;
}) {
  const { id } = await params;
  const productsByCategoryId = await fetchProductsByCategoryId(id);

  return (
    <div className="flex flex-row justify-center flex-wrap gap-4">
      {productsByCategoryId &&
        productsByCategoryId.length > 0 &&
        productsByCategoryId.map((product: ProductCardType) => (
          <ProductCard
            key={product.id}
            id={product.id}
            product_name={product.product_name}
            price={product.price}
            image_url={product.image_url}
            rate={product.rate}
            review_count={product.review_count}
          />
        ))}
    </div>
  );
}
