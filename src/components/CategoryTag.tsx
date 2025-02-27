import { CategoryType } from "@/types/data";

export function CategoryTag({ category }: { category: CategoryType }) {
  return (
    <div className="bg-custom-brown-1 text-custom-yellow-1 px-2 rounded-xl w-fit">
      {category.category_name}
    </div>
  );
}