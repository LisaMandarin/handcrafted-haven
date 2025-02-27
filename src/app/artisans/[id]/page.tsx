import { ParamsType } from "@/types/data";
import ArtisanDetail from "@/components/ArtisanDetail";

async function fetchArtisanById(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/artisans/id/${id}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    console.error("Unable to fetch the artisan by ID: ", res.statusText);
  }
  const { data } = await res.json();
  return data;
}

export default async function ArtisanIdPage({
  params,
}: {
  params: Promise<ParamsType>;
}) {
  const { id } = await params;

  const artisan = await fetchArtisanById(id);
  
  return (
    <div>
      {artisan && (
        <ArtisanDetail artisan={artisan} />
      )}
    </div>
  );
}
