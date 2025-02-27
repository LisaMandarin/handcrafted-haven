import Image from "next/image";
import dayjs from "dayjs";
import { IoStorefrontOutline } from "react-icons/io5";
import GoogleMap from "./GoogleMap";
import { CategoryTag } from "./CategoryTag";
import { Breadcrumb } from "antd";
import { ArtisanDetailType } from "@/types/data";
import Link from "next/link";

export default function ArtisanDetail({
  artisan,
}: {
  artisan: ArtisanDetailType;
}) {
  const breadcrumbItems = [
    { title: (
      <Link href='/'>
        Home
      </Link>
    ) },
    { title: (
      <Link href='/artisans'>
        Artisans
      </Link>
    ) },
    { title: `${artisan.first_name} ${artisan.last_name}` },
  ];

  return (
    <>
    <Breadcrumb items={breadcrumbItems} className="mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* title */}
        <h1 className="relative font-bold text-2xl mb-2 col-span-full">
          Meet the Artisan
          <div className="absolute bottom-2 bg-custom-yellow-2 w-full h-1 -z-10"></div>
        </h1>

        {/* image */}
        <div>
          <div className="flex justify-center">
            <Image
              src={artisan.image_url}
              alt={`${artisan.first_name} ${artisan.last_name}`}
              width={300}
              height={400}
              className="rounded-2xl"
            />
          </div>
        </div>

        {/* name+date+category tags+address */}
        <div>
          {/* name */}
          <h2 className="font-semibold text-xl mt-2 text-center">
            {artisan.first_name} {artisan.last_name}
          </h2>

          {/* date */}
          <p className="flex justify-center text-xs">
            Joined on ${dayjs(artisan.created_at).format("YYYY-MM-DD")}
          </p>

          {/* category tags */}
          <div className="flex flex-row flex-wrap justify-center text-xs gap-2 mb-2">
            {artisan.categories &&
              artisan.categories.length > 0 &&
              artisan.categories.map((category) => (
                <CategoryTag key={category.id} category={category} />
              ))}
          </div>

          {/* address */}
          <div className="flex flex-col items-center">
            <div className="text-5xl">
              <IoStorefrontOutline />
            </div>
            <div className="text-sm">{artisan.address}</div>
            <GoogleMap address={artisan.address} />
          </div>
        </div>

        {/* introduction */}
        <p className="indent-12 leading-loose col-span-full">
          {artisan.introduction}
        </p>
      </div>
    </>
  );
}
