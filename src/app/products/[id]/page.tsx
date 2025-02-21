import ProductDetail from "@/components/ProductDetail";

async function fetchProduct(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/fetchProductById/${id}`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    console.error("Unable to fetch the product by ID: ", res.statusText);
  }
  const { data } = await res.json();
  return data;
}

export default async function ProductIdPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await fetchProduct(params.id);
  return (
    <div>
      {product && (
        <ProductDetail
          product_name={product.product_name}
          image_url={product.image_url}
          category_name={product.category_name}
          category_id={product.category_id}
          description={product.description}
          quantity={product.quantity}
          created_at={product.created_at}
          price={product.price}
          first_name={product.first_name}
          last_name={product.last_name}
          artisan_id={product.artisan_id}
        />
      )}
    </div>
  );
}
