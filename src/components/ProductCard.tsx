import Image from "next/image";
import Link from "next/link";
import { Rate } from "antd";

type ProductCardProps = {
  id: string;
  product_name: string;
  image_url: string;
  price?: number;
  rate?: number;
  review_count?: number;
};

export default function ProductCard({
  id,
  product_name,
  image_url,
  price = 0,
  rate = 0,
  review_count = 0
}: ProductCardProps) {
  return (
    <Link href={`/products/${id}`}>
      <div
        key={id}
        className="flex flex-col w-[150px] h-[210px] rounded-xl shadow-lg bg-white"
      >
        <div>
          <Image
            src={`${image_url}`}
            alt={`photo of ${product_name}`}
            width={150}
            height={150}
            className="rounded-t-xl"
          />
        </div>
        <p className="px-1 text-xs line-clamp-2 flex-grow">{product_name}</p>
        {price ? (
          <div className="px-1 text-sm text-red-600 font-bold text-right">
            {price}
          </div>
        ) : (
          <></>
        )}
        {rate ? (
          <div className="text-center">
            <Rate
              allowHalf
              value={Number(rate)}
              disabled
              className="text-sm"
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
