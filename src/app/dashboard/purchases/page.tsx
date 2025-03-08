import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import LoginButton from "@/components/LoginButton";
import { DashboardPurchaseType } from "@/types/data";
import dayjs from "dayjs";
import { Rate } from "antd";
import Image from "next/image";
import ReviewButtons from "@/components/ReviewButtons";

async function fetchReviews(id: string) {
  try {
    if (!id) {
      console.error("Invalid ID");
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews/user/${id}`
    );
    if (!response.ok) {
      console.error("Unable to fetch Reviews");
      return [];
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error during fetching reviews: ", error);
    return;
  }
}
export default async function Purchases() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return (
      <div className="text-center">
        Please <LoginButton />
      </div>
    );
  }

  const headings = ["Product", "Review", "Actions"];
  const reviews = await fetchReviews(session?.user?.id);
  if (reviews.length === 0) {
    return <>You don&apos;t have any purchases</>;
  }

  return (
    <>
      {session && reviews.length > 0 && (
        <div className="w-full overflow-auto">
          <h1 className="font-bold text-xl">Products I have purchased</h1>
          <table className="max-w-5xl w-full mx-auto">
            <thead className="border-b-2 border-custom-yellow-2 h-[50px]">
              <tr className="text-left">
                {headings &&
                  headings.map((h) => (
                    <th key={h} className="px-2">
                      {h}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {reviews.map((r: DashboardPurchaseType) => (
                <tr key={r.id} className="hover:shadow-lg">
                  <td className="pr-2 min-w-[100px] w-[100px]">
                    <div className="flex flex-col gap-2">
                      <div className="w-20 min-w-20">
                        <Image
                          src={r.image_url}
                          alt={r.product_name}
                          width={100}
                          height={100}
                        />
                      </div>
                      <p className="line-clamp-2 text-xs">{r.product_name}</p>
                    </div>
                  </td>
                  
                  <td className="px-2">
                    <Rate value={r.rate} allowHalf disabled className="custom-stars"/>
                    <div>{r.comment}</div>
                    <div className="text-xs">{dayjs(r.created_at).format("YYYY-MM-DD")}</div>
                  </td>
                  <td><ReviewButtons id={r.id}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
