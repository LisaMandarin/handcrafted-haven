import ProductDetail from "@/components/ProductDetail";
import ReviewListing from "@/components/ReviewListing";
import { ParamsType } from "@/types/data";

async function fetchProduct(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`,
    {cache: "no-store"}
  );

  if (!res.ok) {
    console.error("Unable to fetch the product by ID: ", res.statusText);
  }
  const { data } = await res.json();
  return data;
}

type ReviewsProps = {
  id: string;
  created_at: string;
  rate: number;
  comment: string;
  username: string;
};

async function listReviewsByProductId(id: string): Promise<ReviewsProps[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews-product/${id}`,
    {cache: "no-store"}
  );

  if (!res.ok) {
    console.error("Unable to list reviews: ", res.statusText);
  }

  const { data } = await res.json();
  return data;
}

export default async function ProductIdPage({
  params,
}: {
  params: Promise<ParamsType>;
}) {
  const { id } = await params;
  const [product, reviews] = await Promise.all([
    fetchProduct(id),
    listReviewsByProductId(id),
  ]);

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
      <h2 className="text-2xl font-bold my-2">Reviews</h2>
      <div className="flex flex-col">
        {reviews.length > 0 ?
          reviews.map((review) => (
            <ReviewListing
              key={review.id}
              id={review.id}
              created_at={review.created_at}
              rate={review.rate}
              comment={review.comment}
              username={review.username}
            />
          )): (
            <>No reviews yet</>
          )}
      </div>
    </div>
  );
}
