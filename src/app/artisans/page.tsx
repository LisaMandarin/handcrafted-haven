import ArtisanCard from "@/components/ArtisanCard";

async function fetchArtisans(query: string) {
  try {
    let response: Response | undefined;
    if (query === "latest") {
      response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/artisans/latest`
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

type ArtisanCard = {
  id: string;
  first_name: string;
  last_name: string;
  address: string;
  image_url: string;
  created_at: string;
  categories: Category[];
};

type Category = {
  id: string;
  name: string;
};

export default async function ArtisansPage({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = (await searchParams) || "";
    let description
    if (query === "latest") {
        description = "by the date they joined Handcrafted Haven"
    } else if (query === "skill") {
        description = "by their skills"
    } else if (query === "location") {
        description = "by their locations"
    } else {
        description = ""
    }
  const artisans = await fetchArtisans(query);

  return (
    <>
      <div className="font-bold text-2xl mb-4">Here are the artisans {description}</div>
      <div className="mb-2 flex flex-col md:flex-row flex-wrap items-center md:items-start md:justify-center gap-4">
        {artisans ? (
          artisans.map((artisan: ArtisanCard) => (
            <ArtisanCard key={artisan.id} artisan={artisan} />
          ))
        ) : (
          <>No {query} artisans found</>
        )}
      </div>
    </>
  );
}
