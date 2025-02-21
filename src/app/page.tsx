import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import ArtisanCard from "@/components/ArtisanCard";

export default async function Home() {
  const latestProdRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/fetchLatestProducts`,
    {
      method: "GET",
      cache: "no-cache",
    }
  );

  if (!latestProdRes.ok) {
    console.error("Unable to fetch the latest 3 products: ", latestProdRes.statusText);
  }
  const { data: latestProducts } = await latestProdRes.json();

  const popularProdRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/fetchPopularProducts`, {
      method: "GET",
      cache: "no-cache"
    }
  )

  if (!popularProdRes.ok) {
    console.error("Unable to fetch the most popular 3 products: ", popularProdRes.statusText)
  }

  const {data: popularProducts } = await popularProdRes.json();

  const randomArtisanRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/fetchRandomArtisan`, {
      method: "GET",
      cache: "no-cache"
    }
  )

  if (!randomArtisanRes.ok) {
    console.error("Unable to fetch random artisan: ", randomArtisanRes.statusText)
  }

  const {data: randomArtisan} = await randomArtisanRes.json();
  console.log('random artisan: ', randomArtisan)
  
  return (
    <>
      {/* hero section */}
      <div className="relative">
        <Image
          src="/hero-image.webp"
          width={1000}
          height={700}
          alt="artisans' works"
          className="rounded-lg shadow-lg opacity-80"
          priority={true}
        />
        <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-custom-dark-brown text-custom-yellow-1 text-xl px-4 py-3 rounded-xl hover:bg-custom-yellow-1 hover:text-custom-dark-brown active:bg-custom-brown-1 active:text-custom-yellow-1">
          Be Part of Us
        </button>
      </div>

      {/* latest products */}
      <div className="py-4">
        <h2 className="text-2xl font-bold">What&apos;s New</h2>
        <div className="flex flex-row justify-between">
          {latestProducts.map((product: {id: string, product_name: string, image_url: string, price: number}) => (
            <ProductCard key={product.id} id={product.id} product_name={product.product_name} image_url={product.image_url} price={product.price}/>
          ))}
        </div>
      </div>

      {/* most popular */}
      <div className="py-4">
        <h2 className="text-2xl font-bold">What&apos;s Popular</h2>
        <div className="flex flex-row justify-between">
          {popularProducts.map((product: {id: string, product_name: string, image_url: string, rate: number}) => (
            <ProductCard key={product.id} id={product.id} product_name={product.product_name} image_url={product.image_url} rate={product.rate}/>
          ))}
        </div>
      </div>

      {/* random artisan */}
      <div className="py-4">
          <h2 className="text-2xl font-bold">Meet the Artisan</h2>
          {randomArtisan ? (
            <ArtisanCard key={randomArtisan.id} id={randomArtisan.id} image_url={randomArtisan.image_url} first_name={randomArtisan.first_name} last_name={randomArtisan.last_name} introduction={randomArtisan.introduction}/>
          ) : (
            <div>Unable to fetch a random artisan</div>
          )}
      </div>
    </>
  );
}
