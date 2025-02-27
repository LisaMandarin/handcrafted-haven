import Link from "next/link";
import Title from "@/components/Title";
import { SearchParamsType } from "@/types/data";
import { TbChartBarPopular } from "react-icons/tb";
import { GrLike } from "react-icons/gr";
import { MdOutlineDateRange } from "react-icons/md";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParamsType>;
}) {
  const {query} = await searchParams
  console.log(query);
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
  
  return (
    <div>
      <Title
        name="Products"
        description={description}
        breadcrumbItems={breadcrumbItems}
      />
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
    </div>
  );
}
