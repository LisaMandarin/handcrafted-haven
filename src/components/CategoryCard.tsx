import Image from "next/image";
import Link from "next/link";
import { CategoryType } from "@/types/data";

export default function CategoryCard({ category }: { category: CategoryType }) {
  return (
    <div className="border-8 border-white bg-white w-[166px]">
      <Link
        href={`/categories/${category.id}`}
      >
        <div className="w-[150px]">
          <Image
            src={
              category.category_url ??
              `https://placehold.co/300x400?text=${category.category_name}`
            }
            alt={`image of ${category.category_name}`}
            width={300}
            height={400}
            className="rounded-t-2xl"
          />
        </div>
        <div className="text-xl text-center overflow-hidden line-clamp-1">{category.category_name}</div>
      </Link>
    </div>
  );
}
