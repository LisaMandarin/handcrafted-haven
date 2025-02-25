import Image from "next/image";
import Link from "next/link";


type ProductCardProps = {
  id: string;
  product_name: string;
  image_url: string;
  price: number;
};

export default function SearchProductCard({
  id,
  product_name,
  image_url,
  price,
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
      </div>
    </Link>
  );
}
