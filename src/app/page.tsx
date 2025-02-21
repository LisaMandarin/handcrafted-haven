import Image from "next/image";
import ProductCard from "@/components/ProductCard";

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
  console.log('popular: ', popularProducts)
  console.log('latest: ', latestProducts)

  return (
    <>
      <div className="relative">
        <Image
          src="/hero-image.webp"
          width={1000}
          height={700}
          alt="artisans' works"
          className="rounded-lg shadow-lg opacity-70"
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
    </>
  );
}
