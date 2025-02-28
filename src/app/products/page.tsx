import Link from "next/link";
import Title from "@/components/Title";
import { SearchParamsType, ProductCardType } from "@/types/data";
import { TbChartBarPopular } from "react-icons/tb";
import { GrLike } from "react-icons/gr";
import { MdOutlineDateRange } from "react-icons/md";
import ProductCard from "@/components/ProductCard";
import Trophy from "@/components/Trophy";

async function getProducts(query: string) {
  try {
    if (!query) {
      return;
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${query}`
    );

    if (!response.ok) {
      console.error(`Unable to fetch the products: `, response.statusText);
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParamsType>;
}) {
  const { query } = await searchParams;

  let description;
  if (query === "latest") {
    description = "from the newest to the oldest";
  } else if (query === "popularity") {
    description = "many people are buying";
  } else if (query === "rate") {
    description = "many people give good ratings to";
  }

  const showQuery = (query: string) => {
    if (query === "latest") {
      return "Latest Products";
    } else if (query === "popularity") {
      return "Popular Products";
    } else if (query === "rate") {
      return "Top Rated Products";
    }
  };

  const breadcrumbItems = [
    {
      title: (
        <Link href="/" className="hover:underline">
          Home
        </Link>
      ),
    },
    {
      title: (
        <Link href="/products" className="hover:underline">
          Products
        </Link>
      ),
    },
    query
      ? {
          title: showQuery(query),
        }
      : {},
  ];

  const latestProducts = await getProducts(query);
  const popularProducts = await getProducts(query);
  const ratedProducts = await getProducts(query);

  return (
    <div>
      <Title
        name="products"
        description={description}
        breadcrumbItems={breadcrumbItems}
      />

      {/* products page -- navigation section */}
      {!query && (
        <div className="flex flex-col lg:flex-row lg:justify-center gap-8 pt-8">
          {/* latest products */}
          <div className="mb-4 flex flex-row gap-2 justify-center items-end h-fit">
            <div>
              <MdOutlineDateRange className="text-4xl font-extrabold" />
            </div>
            <p>
              <Link href="/products?query=latest" className="hover:underline">
                Latest Products
              </Link>
            </p>
          </div>

          {/* popular products */}
          <div className="mb-4 flex flex-row gap-2 justify-center items-end h-fit">
            <div>
              <TbChartBarPopular className="text-4xl font-extrabold" />
            </div>
            <p>
              <Link
                href="/products?query=popularity"
                className="hover:underline"
              >
                Popular Products
              </Link>
            </p>
          </div>

          {/* top rated products */}
          <div className="mb-4 flex flex-row gap-2 justify-center items-end h-fit">
            <div>
              <GrLike className="text-4xl font-extrabold" />
            </div>
            <p>
              <Link href="/products?query=rate" className="hover:underline">
                Top Rated Products
              </Link>
            </p>
          </div>
        </div>
      )}

      {/* products page -- latest products */}
      <div className="flex flex-row flex-wrap justify-center gap-4">
        {query === "latest" &&
          latestProducts?.length > 0 &&
          latestProducts.map((product: ProductCardType) => (
            <ProductCard
              key={product.id}
              id={product.id}
              product_name={product.product_name}
              image_url={product.image_url}
              price={product.price}
              rate={product.rate}
              review_count={product.review_count}
            />
          ))}
      </div>

      {/* products page -- popular products */}
      <div className="flex flex-row flex-wrap justify-center gap-4">
        {query === "popularity" &&
          popularProducts?.length > 0 &&
          popularProducts.map((product: ProductCardType, index: number) => (
            <div key={product.id} className="relative">
              <Trophy index={index} />
              <ProductCard
              id={product.id}
              product_name={product.product_name}
              image_url={product.image_url}
              price={product.price}
              rate={product.rate}
              review_count={product.review_count}
            />
            </div>
            
            
          ))}
      </div>

      {/* products page -- rated products */}
      <div className="flex flex-row flex-wrap justify-center gap-4">
        {query === "rate" && ratedProducts?.length > 0 &&
          ratedProducts.map((product: ProductCardType, index: number) => (
            <div key={product.id} className="relative">
              <Trophy index={index} />
              <ProductCard
                id={product.id}
                product_name={product.product_name}
                price={product.price}
                image_url={product.image_url}
                rate={product.rate}
                review_count={product.review_count}
              />
            </div>
            
            
          ))}
      </div>
    </div>
  );
}
