"use client";
import { DashboardProductType } from "@/types/data";
import ProductButtons from "./ProductButtons";
import Image from "next/image";
import dayjs from "dayjs";
import { useState } from "react";

export default function PostTable({
  products,
}: {
  products: DashboardProductType[];
}) {
  const [mores, setMores] = useState<Record<string, boolean>>({})
  const headings = [
    "Product",
    "Post Date",
    "Price",
    "Quantity",
    "Category",
    "Actions",
  ];

  const toggleMore = (id: string) => {
    setMores(current => ({
        ...current,
        [id]: !current[id]
    }))
  }

  return (
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
        {products &&
          products.map((p: DashboardProductType) => (
            <tr
              key={p.id}
              className="h-10 border-b-2 border-custom-yellow-2 hover:shadow-lg"
            >
              <td className="pr-2 min-w-[350px] w-[350px]">
                <div className="flex items-center gap-2">
                  <div className="w-20 min-w-20">
                    <Image
                      src={p.image_url}
                      width={100}
                      height={100}
                      alt={`image of ${p.product_name}`}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <p>{p.product_name}</p>
                    <button 
                        onClick={()=> toggleMore(p.id)}
                        className="text-xs text-custom-dark-brown border border-custom-dark-brown rounded-lg px-2">
                      more
                    </button>
                  </div>
                </div>
                <p className={`text-xs ${mores[p.id]? "block" : "hidden"}`}>
                  <span className="font-semibold">Description: </span>
                  {p.description}
                </p>
              </td>
              <td className="px-2 min-w-28">
                {dayjs(p.created_at).format("YYYY-MM-DD")}
              </td>
              <td className="px-2">{p.price}</td>
              <td className="px-2">{p.quantity}</td>
              <td className="px-2">{p.category_name}</td>
              <td className="px-2">
                <ProductButtons id={p.id} />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
