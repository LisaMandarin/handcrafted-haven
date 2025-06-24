import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import LoginButton from "@/components/LoginButton";
import PostTable from "@/components/PostTable";
import Link from "next/link";
import { VscNewFile } from "react-icons/vsc";

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
  const session = await getServerSession(authOptions)
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
          <div className="flex flex-row gap-4 items-center mt-4">
            <h1 className="font-bold text-xl">
            I want to post a new product            
          </h1>
            <Link href={`/products/add/${artisan?.id}`} target="_blank">
              <button className="inline-block px-3 py-1 lg:px-6 h-fit bg-custom-dark-brown text-custom-yellow-1 md:rounded-3xl lg:rounded-full">
                <span className="mr-2">Post</span>
                <VscNewFile className="inline"/>
              </button>
            </Link>
          </div>

          {/* dividing line */}
          <div className="w-full h-[4px] bg-custom-brown-2 my-4"></div>
          
          <h1 className="font-bold text-xl">Products I have posted</h1>
          <PostTable products={products} />
        </div>
      )}
    </>
  );
}
