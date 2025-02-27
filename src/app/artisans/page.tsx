import Link from "next/link";
import { AiOutlineGold } from "react-icons/ai";
import { MdOutlineDateRange } from "react-icons/md";
import { GrMap } from "react-icons/gr";
import { CategoryType, SearchParamsType, ArtisanCardType } from "@/types/data";
import ArtisanCard from "@/components/ArtisanCard";
import CategoriesNav from "@/components/CategoriesNav";
import CountriesNav from "@/components/CountriesNav";
import Title from "@/components/Title";

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
    } else if (query === "location") {
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
  searchParams: Promise<SearchParamsType>;
}) {
  const { query } = (await searchParams) || "";
  const categories = await listCategories();

  let description;
  let latestArtisans;
  let skillArtisans;
  let locationArtisans: { [key: string]: ArtisanCardType[] } | undefined;
  if (query === "latest") {
    description = "by the date they joined Handcrafted Haven";
    latestArtisans = await fetchArtisans(query);
  } else if (query === "skill") {
    description = "by their skills";
    skillArtisans = await fetchArtisans(query);
  } else if (query === "location") {
    description = "by their locations";
    locationArtisans = await fetchArtisans(query);
  } else {
    description = "";
  }
  const showQuery = (query: string) => {
    if (query === "latest") {
      return "latest artisans";
    } else if (query === "skill") {
      return "artisans by skills";
    } else if (query === "location") {
      return "artisans by locations";
    }
  };
  const breadcrumbItems = [
    {
      title: (
        <Link href={`/`} className="hover:underline">
          Home
        </Link>
      ),
    },
    {
      title: (
        <Link href={`/artisans`} className="hover:underline">
          Artisans
        </Link>
      ),
    },
    query
      ? {
          title: showQuery(query),
        }
      : {},
  ];

  const countries = locationArtisans && Object.keys(locationArtisans);
  return (
    <>
      {/* header */}
      <Title
        name="Artisans"
        description={description}
        breadcrumbItems={breadcrumbItems}
      />

      {!query && (
        <div className="flex flex-col lg:flex-row lg:justify-center gap-8 pt-8">
          <div className="mb-4 flex flex-row gap-2 justify-center items-end h-fit">
            <div>
              <GrMap className="text-4xl font-extrabold" />
            </div>
            <p>
              <Link
                href={`/artisans?query=location`}
                className="hover:underline"
              >
                View Artisans by locations
              </Link>
            </p>
          </div>
          <div className="mb-4 flex flex-row gap-2 justify-center items-end h-fit">
            <div>
              <AiOutlineGold className="text-4xl font-extrabold" />
            </div>
            <p>
              <Link href={`/artisans?query=skill`} className="hover:underline">
                View Artisans by skills
              </Link>
            </p>
          </div>
          <div className="mb-4 flex flex-row gap-2 justify-center items-end h-fit">
            <div>
              <MdOutlineDateRange className="text-4xl font-extrabold" />
            </div>
            <p>
              <Link href={`/artisans?query=latest`} className="hover:underline">
                View Artisans by dates they joined
              </Link>
            </p>
          </div>
        </div>
      )}

      {/* latest artisans section */}
      <div className="mb-2 flex flex-col md:flex-row flex-wrap items-center md:items-start md:justify-center gap-4">
        {latestArtisans &&
          latestArtisans.map((artisan: ArtisanCardType) => (
            <ArtisanCard key={artisan.id} artisan={artisan} />
          ))}
      </div>

      {/* artisans by skills */}
      <div className="relative flex flex-col items-center mb-2">
        <div className="fixed bottom-4 right-4 text-custom-dark-brown">
          <Link href="#category-nav">[Back to Top]</Link>
        </div>
        {categories && skillArtisans && (
          <CategoriesNav categories={categories} />
        )}
        {categories &&
          skillArtisans &&
          categories.map((category: CategoryType) => (
            <div key={category.id}>
              <div className="flex flex-row items-center mt-8 mb-2">
                <h2 id={category.id} className="font-semibold text-xl">
                  {category.category_name}
                </h2>
                <span className="text-xs ml-2">
                  <Link href="#top">[Back to Top]</Link>
                </span>
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

      {/* artisans by locations */}
      <div className="flex flex-col items-center mb-2">
        {countries && <CountriesNav countries={countries} />}
        {countries &&
          countries.map((country: string) => (
            <div key={country}>
              <div className="flex flex-row items-center mt-8 mb-2">
                <h2 id={country} className="font-semibold text-xl">
                  {country}
                </h2>
                <span className="text-xs ml-2">
                  <Link href="#top">[Back to Top]</Link>
                </span>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                {locationArtisans &&
                  locationArtisans[country].map((artisan: ArtisanCardType) => (
                    <ArtisanCard key={artisan.id} artisan={artisan} />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
