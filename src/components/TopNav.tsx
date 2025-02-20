"use client";

import Hamburger from "hamburger-react";
;
import Image from "next/image";
import { IoSearch } from "react-icons/io5";
import { useState } from "react"
import { SideMenu } from "./SideMenu";


export default function TopNav() {
    const [isOpen, setOpen] = useState(false);  // toggle side menu
    const onClose = () => setOpen(false)

  return (
    <div className="px-6 pt-6 flex flex-row items-center">
      <Hamburger toggled={isOpen} toggle={setOpen} />
      <div className="w-8 h-8 mx-4">
        <Image src="/logo.webp" width={100} height={100} alt="logo" />
      </div>
      <div className="flex-grow relative">
        <label htmlFor="search" className="sr-only" />
        <input
          id="search"
          placeholder="Search"
          className="rounded-full h-8 border border-custom-yellow-2 w-full p-4"
        />

        <IoSearch className="absolute top-2 right-2 text-xl" />
      </div>
      <SideMenu isOpen={isOpen} onClose={onClose} />
    </div>
  );
}