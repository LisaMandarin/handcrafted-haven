import Image from "next/image";
import dayjs from "dayjs";
import Link from "next/link";
import { CategoryTag } from "./CategoryTag";
import { ArtisanCardType } from "@/types/data";

export default function ArtisanCard({ artisan }: { artisan: ArtisanCardType }) {
  return (
    <Link href={`/artisans/${artisan.id}`}>
      <div className="max-w-[250px] border-8 border-white bg-white">
        <div>
          <Image
            src={artisan.image_url}
            alt={`${artisan.first_name} ${artisan.last_name}`}
            width={300}
            height={400}
            className="rounded-t-2xl"
          />
        </div>
        <div className="font-bold text-xl">
          {artisan.first_name} {artisan.last_name}
          <span className="font-normal text-xs">{`(${artisan.address
            .split(",")
            .pop()
            ?.trim()})`}</span>
        </div>
        <div>Joined on {dayjs(artisan.created_at).format("YYYY-MM-DD")}</div>
        <div className="flex flex-row flex-wrap gap-2 text-xs">
          {artisan.categories &&
            artisan.categories.map((category) => (
              <CategoryTag key={category.id} category={category} />
            ))}
        </div>
      </div>
    </Link>
  );
}
