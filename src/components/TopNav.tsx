"use client";

import SmallNav from "./SmallNav";
import LargeNav from "./LargeNav";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setQuantity } from "@/redux/cartSlice";
import { cartType } from "@/types/data";

async function fetchCartQuantity(id: string) {
  try {
    if (!id) {
      console.error("Invalid user ID");
      return null;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/carts/user/${id}`
    );
    if (!response.ok) {
      console.error("Failed to fetch cart quantity");
      return null;
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Unable to fetch cart quantity: ", error);
    return null;
  }
}

export default function TopNav() {
  const {data: session} = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    loadQuantity()
    async function loadQuantity() {
      if (session?.user?.id) {
        const data = await fetchCartQuantity(session.user.id)
        if (data.length > 0) {
          const sum = data.reduce((acc: number, cur: cartType) => {
            return acc + cur.quantity
          }, 0)
          dispatch(setQuantity(sum))
        } else {
          dispatch(setQuantity(0))
        }
      }
    }
  }, [session?.user?.id, dispatch])
  return (
    <>
      <div className="md:hidden">
        <SmallNav />
      </div>
      <div className="hidden md:block">
        <LargeNav />
      </div>
    </>
  );
}
