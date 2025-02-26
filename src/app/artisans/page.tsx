import ArtisanCard from "@/components/ArtisanCard";
import { ArtisanCardType } from "@/components/ArtisanCard";
import { CategoryType } from "@/types/data";

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
      console.log("No categories found");
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
      <div className="font-bold text-2xl mb-4">
        Here are the artisans {description}
      </div>
      <div className="mb-2 flex flex-col md:flex-row flex-wrap items-center md:items-start md:justify-center gap-4">
        {latestArtisans &&
          latestArtisans.map((artisan: ArtisanCardType) => (
            <ArtisanCard key={artisan.id} artisan={artisan} />
          ))}
      </div>
      <div className="flex flex-col items-center md:items-start mb-2">
        {categories &&
          skillArtisans &&
          categories.map(
            (category: CategoryType) => (
              <div key={category.id}>
                <h2 className="font-semibold text-xl mt-8 mb-2">
                  {category.category_name}
                </h2>
                <div className="flex flex-col md:flex-row gap-4">
                  {skillArtisans[category.id] &&
                    skillArtisans[category.id].map(
                      (artisan: ArtisanCardType) => (
                        <ArtisanCard key={artisan.id} artisan={artisan} />
                      )
                    )}
                </div>
              </div>
            )
          )}
      </div>
    </>
  );
}
