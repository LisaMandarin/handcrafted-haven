import Image from "next/image";
import { IoStorefrontOutline } from "react-icons/io5";
import GoogleMap from "./GoogleMap";
import dayjs from "dayjs";
import { CategoryTag } from "./CategoryTag";

type ArtisanDetailType = {
  id: string;
  first_name: string;
  last_name: string;
  address: string;
  image_url: string;
  introduction: string;
  created_at: string;
  categories: Category[];
};
type Category = {
  id: string;
  category_name: string;
};

export default function ArtisanDetail({
  artisan,
}: {
  artisan: ArtisanDetailType;
}) {
  return (
    <div>
      <h1 className="font-bold text-2xl mb-2">Meet the Artisan</h1>
      <div className="flex justify-center">
        <Image
          src={artisan.image_url}
          alt={`${artisan.first_name} ${artisan.last_name}`}
          width={300}
          height={400}
          className="rounded-2xl"
        />
      </div>
      <h2 className="font-semibold text-xl mt-2 text-center">
        {artisan.first_name} {artisan.last_name}
      </h2>
      <p className="flex justify-center text-xs">
        Joined on ${dayjs(artisan.created_at).format("YYYY-MM-DD")}
      </p>
      <div className="flex flex-row flex-wrap text-xs gap-2 mb-2">
        {artisan.categories &&
          artisan.categories.length > 0 &&
          artisan.categories.map((category) => (
            <CategoryTag key={category.id} category={category} />
          ))}
      </div>
      <div className="flex flex-col items-center">
        <div className="text-5xl">
          <IoStorefrontOutline />
        </div>
        <div className="text-sm">{artisan.address}</div>
        <GoogleMap address={artisan.address} />
      </div>
      <p className="indent-12 leading-loose">{artisan.introduction}</p>
      
    </div>
  );
}
