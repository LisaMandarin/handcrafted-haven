"use client";

import Hamburger from "hamburger-react";
import Image from "next/image";
import { IoSearch } from "react-icons/io5";
import { SideMenu } from "./SideMenu";
import { useEffect, useState } from "react";
import Link from "next/link";
import { racing } from "@/app/styles/fonts";
import { Dropdown } from "antd";
import { MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";

type Category = {
  id: string;
  category_name: string;
};

function SearchBar() {
  return (
    <div className="flex-grow relative">
      <label htmlFor="search" className="sr-only" />
      <input
        id="search"
        placeholder="Search"
        className="rounded-full h-8 border border-custom-yellow-2 w-full p-4 focus:outline-none"
      />

      <IoSearch className="absolute top-2 right-2 text-xl" />
    </div>
  );
}
function Small() {
  const [isOpen, setOpen] = useState(false); // toggle side menu
  const onClose = () => setOpen(false);
  return (
    <div className="px-6 pt-3 flex flex-row items-center md:hidden">
      <Hamburger toggled={isOpen} toggle={setOpen} />
      <div className="w-8 h-8 mx-4">
        <Link href="/">
          <Image src="/logo.webp" width={100} height={100} alt="logo" />
        </Link>
      </div>
      <SearchBar />
      <SideMenu isOpen={isOpen} onClose={onClose} />
    </div>
  );
}

function Large() {
  const [categories, setCategories] = useState<Category[]>([]);
  const artisansItems: MenuProps["items"] = [
    {
      key: "1",
      label: <Link href="#">by location</Link>,
    },
    {
      key: "2",
      label: <Link href="#">by skills</Link>,
    },
    {
      key: "3",
      label: <Link href="#">by latest</Link>,
    },
  ];

  const productsItems: MenuProps["items"] = [
    {
      key: "1",
      label: <Link href="#">by popularity</Link>,
    },
    {
      key: "2",
      label: <Link href="#">by rate</Link>,
    },
    {
      key: "3",
      label: <Link href="#">by latest</Link>,
    },
  ];

  const categoriesItems: MenuProps["items"] = categories.map((category) => ({
    key: category.id,
    label: <Link href="#">{category.category_name}</Link>,
  }));

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
  return (
    <div className="hidden px-6 py-3 md:grid grid-flow-row grid-cols-6 gap-1">
      {/* logo section */}
      <div className="col-span-3 flex flex-row items-center gap-2">
        <Image src="/logo.webp" alt="logo image" width={50} height={50} />
        <h1
          className={`${racing.className} font-extrabold text-3xl lg:text-4xl text-custom-dark-brown`}
        >
          Handcrafted Haven
        </h1>
      </div>

      {/* buttons section */}
      <div className="col-span-2 col-start-5 flex justify-end items-center gap-2">
        <button className="px-3 py-1 lg:px-6 h-fit bg-custom-dark-brown text-custom-yellow-1 md:rounded-3xl lg:rounded-full">
          <Link href="/signup">Sign Up</Link>
        </button>
        <button className="px-3 py-1 lg:px-6 h-fit bg-custom-dark-brown text-custom-yellow-1 md:rounded-3xl lg:rounded-full">
          <Link href="/login">Log In</Link>
        </button>
      </div>

      {/* dropdown menu section */}
      <ul className="col-span-3 flex flex-row justify-between items-center">
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
export default function TopNav() {
  return (
    <>
      <Small />
      <Large />
    </>
  );
}
