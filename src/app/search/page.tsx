import SearchProductCard from "@/components/SearchProductCard";

type Product = {
  id: string;
  product_name: string;
  image_url: string;
  price: number;
}

export default async function Search({ searchParams }: { searchParams: Promise<{ query: string }> }) {
  const { query } = await searchParams;
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search?query=${query}`);
  
  if (!response.ok) {
    return <div>Failed to fetch products</div>;
  }

  const result = await response.json();
  const products = result.data; 
  
  return (
    <div>
      <h1>You are search for {query}</h1>
      <div className="flex flex-row flex-wrap gap-4 justify-center">
        {products && products.map((product: Product) => (
          <SearchProductCard key={product.id} {...product} />
        ))  }
      </div>
    </div>
  );
}