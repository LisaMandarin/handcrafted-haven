import Image from "next/image";
import Link from "next/link";
import { Rate } from "antd";

type ProductCardProps = {
  id: string;
  product_name: string;
  image_url: string;
  price: number;
  rate: number;
  review_count: number;
};

export default function SearchProductCard({
  id,
  product_name,
  image_url,
  price,
  rate,
  review_count,
}: ProductCardProps) {
  return (
    <Link href={`/products/${id}`}>
      <div
        key={id}
        className="flex flex-col w-[150px] h-[210px] sm:w-[300px] sm:h-[420px] lg:w-[200px] lg:h-[300px] rounded-xl shadow-lg bg-white"
      >
        <div>
          <Image
            src={`${image_url}`}
            alt={`photo of ${product_name}`}
            width={300}
            height={300}
            className="rounded-t-xl"
          />
        </div>
        <p className="px-1 sm:px-3 text-xs sm:text-lg line-clamp-2 flex-grow">
          {product_name}
        </p>

        <div className="px-1 text-sm sm:text-xl sm:mb-4 sm:mr-4 text-red-600 font-bold text-right">
          {price}
        </div>

        <div className="text-center">
          <Rate
            allowHalf
            value={Number(rate)}
            disabled
            className="text-sm sm:text-xl sm:mb-4"
          />
          <span className="text-xs ml-1 text-gray-400">({review_count})</span>
        </div>
      </div>
    </Link>
  );
}
