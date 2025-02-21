import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "antd";
import dayjs from "dayjs";

type ProductDetailProps = {
  product_name: string;
  image_url: string;
  category_name: string;
  category_id: string;
  description: string;
  quantity: number;
  created_at: string;
  price: number;
  first_name: string;
  last_name: string;
  artisan_id: string;
}

export default function ProductDetail({
  product_name,
  image_url,
  category_name,
  category_id,
  description,
  quantity,
  created_at,
  price,
  first_name,
  last_name,
  artisan_id
}: ProductDetailProps) {
  const breadcrumbItems = [
    { title: "Home" },
    {
      title: (
        <Link
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/categories/${category_id}`}
        >
          {category_name}
        </Link>
      ),
    },
    { title: product_name },
  ];

  const postDate = dayjs(created_at).format("YYYY-MM-DD");

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} className="mb-4" />

      {/* product card */}
      <div className="bg-white flex flex-col items-center">
        <Image
          src={image_url}
          alt={`image of ${product_name}`}
          width={300}
          height={300}
          className="mt-4"
        />
        <p className="text-lg font-bold p-4">{product_name}</p>
      </div>

      {/* product detail section */}
      <div className="space-y-2 my-2">
        <div className="flex flex-row gap-2">
          <p className="w-[100px] flex-shrink-0">Price:</p>
          <div>{price}</div>
        </div>
        <div className="flex flex-row gap-2">
          <p className="w-[100px] flex-shrink-0">Quantity:</p>
          <div>{quantity}</div>
        </div>
        <div className="flex flex-row gap-2">
          <p className="w-[100px] flex-shrink-0">Description:</p>
          <div>{description}</div>
        </div>
        <div className="flex flex-row gap-2">
          <p className="w-[100px] flex-shrink-0">Artisan:</p>
          <div className="underline"><Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/artisans/${artisan_id}`}>{first_name} {last_name}</Link></div>
        </div>
        <div className="flex flex-row gap-2">
          <p className="w-[100px] flex-shrink-0">Post Date:</p>
          <div>{postDate}</div>
        </div>
      </div>
    </div>
  );
}
