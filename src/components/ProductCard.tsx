import Image from "next/image";
import Link from "next/link";
import { Rate } from "antd";
import { ProductCardType } from "@/types/data";

export default function ProductCard({
  id,
  product_name,
  image_url,
  price = 0,
  rate = 0,
  review_count = 0,
}: ProductCardType) {
  
  return (
    <Link href={`/products/${id}`}>
      <div
        key={id}
        className="relative flex flex-col w-[150px] h-[220px] sm:w-[300px] sm:h-[420px] lg:w-[200px] lg:h-[315px] rounded-xl shadow-lg bg-white"
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
        {price ? (
          <div className="px-1 text-sm sm:text-xl sm:mb-4 sm:mr-4 text-red-600 font-bold text-right">
            {price}
          </div>
        ) : (
          <></>
        )}
        {rate ? (
          <div className="flex justify-center">
            <Rate
              allowHalf
              value={Number(rate)}
              disabled
              style={{
                paddingLeft: "0rem",
                fontSize: "0.9rem",
              }}
            />
            <span className="text-xs ml-1 text-gray-400">({review_count})</span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </Link>
  );
}
