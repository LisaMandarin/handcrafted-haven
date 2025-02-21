import Image from "next/image";
import Link from "next/link";

type ArtisanProps = {
  id: string;
  image_url: string;
  first_name: string;
  last_name: string;
  introduction: string;
};
export default function ArtisanCard({
  id,
  image_url,
  first_name,
  last_name,
  introduction,
}: ArtisanProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-stretch sm:gap-4 lg:gap-8">
      <div className="w-[300px] h-[400px] flex-shrink-0">
        <Image
          src={image_url}
          alt={`Image of ${first_name} ${last_name}`}
          width={300}
          height={400}
          className="rounded-xl mx-auto"
        />
      </div>
      <section className="sm:flex sm:flex-col">
        <h3 className="text-xl sm:text-2xl underline my-2">
          {first_name} {last_name}
        </h3>
        <p className="line-clamp-4 sm:line-clamp-6 indent-12 sm:text-lg lg:text-xl lg:leading-10">{introduction}</p>
        <div className="text-right font-bold sm:text-lg">
          <Link href={`/artisans/${id}`}>more</Link>
        </div>
      </section>
    </div>
  );
}
