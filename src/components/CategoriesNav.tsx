import { CategoryType } from "@/types/data";
import Link from "next/link";
export default function CategoriesNav({
  categories,
}: {
  categories: CategoryType[];
}) {
  return (
    <div className="flex flex-row flex-wrap gap-4" id="category_nav">
      {categories &&
        categories.map((category, index) => (
          <span key={category.id} className="text-sm">
            <Link href={`#${category.id}`} className="hover:underline">
              {category.category_name}
            </Link>
            {index < categories.length -1 && " | "}
          </span>
        ))}
    </div>
  );
}
