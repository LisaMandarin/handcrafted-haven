import ProductDetail from "@/components/ProductDetail";
import ReviewListing from "@/components/ReviewListing";
import { ParamsType, ReviewsType } from "@/types/data";
import { fetchProduct } from "@/lib/util";
import OrderForm from "@/components/OrderForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import LoginButton from "@/components/LoginButton";

async function listReviewsByProductId(id: string): Promise<ReviewsType[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews/product/${id}`,
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
  const session = await getServerSession(authOptions);

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
      {!session ? (
        <>
          <p>You will only see this if you are not authenticated.</p>
          <p className=" text-custom-brown-1">
            Please <LoginButton />
          </p>
        </>
      ) : (
        <OrderForm product={product} session={session}/>
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
