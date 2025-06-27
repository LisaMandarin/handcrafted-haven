"use client";

import { useEffect, useState } from "react";
import { MenuProps } from "antd";
import Link from "next/link";
import Image from "next/image";
import { racing } from "@/app/styles/fonts";
import { Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { RxAvatar } from "react-icons/rx";
import SearchBar from "./SearchBar";
import { CategoryType } from "@/types/data";
import { useSession, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { LuShoppingCart } from "react-icons/lu";
import { Badge } from "antd";
import { useSelector} from "react-redux";
import { RootState } from "@/redux/store";

export default function LargeNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUrl, setCurrentUrl] = useState("/");
  const { data: session } = useSession();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const cartQuantity = useSelector((state: RootState) => state.cart.totalQuantity)
  const artisansItems: MenuProps["items"] = [
    {
      key: "1",
      label: <Link href="/artisans?query=location">by location</Link>,
    },
    {
      key: "2",
      label: <Link href="/artisans?query=skill">by skills</Link>,
    },
    {
      key: "3",
      label: <Link href="/artisans?query=latest">by latest</Link>,
    },
  ];

  const productsItems: MenuProps["items"] = [
    {
      key: "1",
      label: <Link href="/products?query=popularity">by popularity</Link>,
    },
    {
      key: "2",
      label: <Link href="/products?query=rate">by rate</Link>,
    },
    {
      key: "3",
      label: <Link href="/products?query=latest">by latest</Link>,
    },
  ];

  const categoriesItems: MenuProps["items"] = categories.map((category) => ({
    key: category.id,
    label: (
      <Link
        href={`${process.env.NEXT_PUBLIC_BASE_URL}/categories/${category.id}`}
      >
        {category.category_name}
      </Link>
    ),
  }));

  const handleRedirect = () => {
    const redirectedLink = `/login?callbackUrl=${encodeURIComponent(
      currentUrl
    )}`;
    router.push(redirectedLink);
  };

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`
      );
      if (response.ok) {
        const { data } = await response.json();
        setCategories(data);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => { 
    setCurrentUrl(pathname);
  }, [pathname]);

  return (
    <div className="px-6 py-3 grid grid-flow-row grid-cols-6 gap-1">
      {/* logo section */}
      <div className="col-span-3 flex flex-row items-center gap-2">
        <Link href="/">
          <Image src="/logo.webp" alt="logo image" width={50} height={50} />
        </Link>
        <Link href="/">
          <h1
            className={`${racing.className} font-extrabold text-3xl lg:text-4xl text-custom-dark-brown`}
          >
            Handcrafted Haven
          </h1>
        </Link>
      </div>

      {/* buttons section */}
      {session ? (
        <div className="col-span-2 col-start-5 flex justify-end items-center gap-4">
          <Link href="/shopping-cart">
            <div>
              <Badge count={cartQuantity}>
              <LuShoppingCart className="text-4xl"/>

              </Badge>
            </div>
          </Link>
          <Link href="/dashboard">
            <div className="flex items-center">
              <RxAvatar className="text-4xl" />
              <span className="text-xl">Dashboard</span>
            </div>
          </Link>
          <button
            onClick={() => signOut()}
            className="px-3 py-1 lg:px-6 h-fit bg-custom-dark-brown text-custom-yellow-1 md:rounded-3xl lg:rounded-full"
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className="col-span-2 col-start-5 ml-auto">
          <button
            onClick={handleRedirect}
            className="px-3 py-1 lg:px-6 h-fit bg-custom-dark-brown text-custom-yellow-1 md:rounded-3xl lg:rounded-full"
          >
            Log In
          </button>
        </div>
      )}

      {/* dropdown menu section */}
      <ul className="col-span-3 flex flex-row justify-between items-center lg:mr-20">
        <li>
          <Dropdown menu={{ items: artisansItems }}>
            <span>
              <a onClick={(e) => e.preventDefault()}>
                Artisans
                <DownOutlined />
              </a>
            </span>
          </Dropdown>
        </li>
        <li>
          <Dropdown menu={{ items: productsItems }}>
            <span>
              <a onClick={(e) => e.preventDefault()}></a>
              Products
              <DownOutlined />
            </span>
          </Dropdown>
        </li>
        <li>
          <Dropdown menu={{ items: categoriesItems }}>
            <span>
              <a onClick={(e) => e.preventDefault()}>
                Categories
                <DownOutlined />
              </a>
            </span>
          </Dropdown>
        </li>
      </ul>

      <div className="col-span-3 col-start-4">
        <SearchBar />
      </div>
    </div>
  );
}
