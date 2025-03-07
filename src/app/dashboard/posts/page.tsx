import { getSession } from "@/utils/session";
import LoginButton from "@/components/LoginButton";
import PostTable from "@/components/PostTable";

async function fetchArtisan(id: string) {
  try {
    if (!id) {
      console.error("ID missing");
      return null;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/artisans/user/${id}`
    );

    if (response) {
      const { data } = await response.json();
      return data;
    }
  } catch (error) {
    console.error(`Server error: ${error}`);
    return null;
  }
}

async function fetchProducts(id: string) {
  try {
    if (!id) {
      console.error("ID is missing");
      return [];
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/artisan/${id}`
    );
    if (!response.ok) {
      console.error("Unable to fetch products");
      return [];
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(`Server error: ${error}`);
    return [];
  }
}

export default async function PostsPage() {
  const session = await getSession();
  if (!session) {
    return (
      <div className="text-center">
        Please <LoginButton />
      </div>
    );
  }

  const artisan = await fetchArtisan(session?.user?.id);
  if (!artisan || artisan.length === 0) {
    return <div className="text-center">You haven&apos;t started your sales yet</div>;
  }

  const products = await fetchProducts(artisan.id);
  if (!products || products.length === 0) {
    return <div className="text-center">You don&apos;t own any products</div>
  }

  return (
    <>
      {session && products.length > 0 && (
        <div className="w-full overflow-auto">
          <h1 className="font-bold text-xl">Products I have posted</h1>
          <PostTable products={products} />
        </div>
      )}
    </>
  );
}
