import ArtisanCard from "@/components/ArtisanCard";
import { ArtisanCardType } from "@/components/ArtisanCard";
import { CategoryType } from "@/types/data";
import CategoriesNav from "@/components/CategoriesNav";
import Link from "next/link";

async function fetchArtisans(query: string) {
  try {
    let response: Response | undefined;
    if (query === "latest") {
      response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/artisans/${query}`
      );
    } else if (query === "skill") {
      response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/artisans/${query}`
      );
    }

    if (!response || !response.ok) {
      return;
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Unable to fetch artisans: ", error);
  }
}

async function listCategories() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`
    );
    if (!response.ok) {
      console.error("No categories found");
      return [];
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Unable to list categories: ", error);
  }
}

export default async function ArtisansPage({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = (await searchParams) || "";
  const categories = await listCategories();

  let description;
  let latestArtisans;
  let skillArtisans;
  if (query === "latest") {
    description = "by the date they joined Handcrafted Haven";
    latestArtisans = await fetchArtisans(query);
  } else if (query === "skill") {
    description = "by their skills";
    skillArtisans = await fetchArtisans(query);
  } else if (query === "location") {
    description = "by their locations";
  } else {
    description = "";
  }

  return (
    <>
      {/* title */}
      <div className="font-bold text-2xl mb-4">
        Here are the artisans {description}
      </div>

      {/* latest artisans section */}
      <div className="mb-2 flex flex-col md:flex-row flex-wrap items-center md:items-start md:justify-center gap-4">
        {latestArtisans &&
          latestArtisans.map((artisan: ArtisanCardType) => (
            <ArtisanCard key={artisan.id} artisan={artisan} />
          ))}
      </div>

      {/* artisans by skills */}
      <div className="relative flex flex-col items-center md:items-start mb-2">
        <div className="fixed bottom-4 right-4 text-custom-dark-brown">
          <Link href="#category-nav">[Back to Top]</Link>
        </div>
        {categories && <CategoriesNav categories={categories} />}
        {categories &&
          skillArtisans &&
          categories.map((category: CategoryType) => (
            <div key={category.id}>
              <div className="flex flex-row items-center mt-8 mb-2">
                <h2
                  id={category.id}
                  className="font-semibold text-xl"
                >
                  {category.category_name}
                </h2>
                <span className="text-xs ml-2"><Link href="#top">[Back to Top]</Link></span>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                {skillArtisans[category.id] &&
                  skillArtisans[category.id].map((artisan: ArtisanCardType) => (
                    <ArtisanCard key={artisan.id} artisan={artisan} />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
