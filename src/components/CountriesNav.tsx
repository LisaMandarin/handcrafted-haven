import Link from "next/link";
export default function CountriesNav({
  countries,
}: {
  countries: string[]
}) {
  return (
    <div className="flex flex-row flex-wrap gap-4" id="category_nav">
      {countries &&
        countries.map((country, index) => (
          <span key={country} className="text-sm">
            <Link href={`#${country}`} className="hover:underline">
              {country}
            </Link>
            {index < countries.length -1 && " | "}
          </span>
        ))}
    </div>
  );
}
