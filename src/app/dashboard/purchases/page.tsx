import { getSession } from "@/utils/session";
import LoginButton from "@/components/LoginButton";
import { DashboardPurchaseType } from "@/types/data";
import dayjs from "dayjs";
import { Rate } from "antd";

import Image from "next/image";
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
  const session = await getSession();
  if (!session) {
    return (
      <div className="text-center">
        Please <LoginButton />
      </div>
    );
  }

  const headings = ["Product", "Purchase Date", "Review", "Review Date"];
  const reviews = await fetchReviews(session?.user?.id);
  if (reviews.length === 0) {
    return <>You don&apos;t have any purchases</>;
  }

  return (
    <>
      {session && reviews.length > 0 && (
        <div className="w-full overflow-auto">
          <h1 className="font-bold text-xl">Products I have purchased</h1>
          <table className="max-w-5xl min-w-[710px] w-full mx-auto">
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
                <tr key={r.id}>
                  <td className="pr-2 min-w-[150px] w-[150px]">
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
                  <td className="px-2">N/A</td>
                  <td className="px-2">
                    <div><Rate value={r.rate} allowHalf disabled className="bg-custom-dark-brown rounded-lg"/></div>
                    <div>{r.comment}</div>
                  </td>
                  <td className="px-2 min-w-28">{dayjs(r.created_at).format("YYYY-MM-DD")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
