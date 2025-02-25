"use client";

import Hamburger from "hamburger-react";
import { SideMenu } from "./SideMenu";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import { useSession } from "@/hooks/useSession";

export default function SmallNav() {
  const [isOpen, setOpen] = useState(false); // toggle side menu
  const onClose = () => setOpen(false);
  const session = useSession();
  return (
    <div className="px-6 pt-3 flex flex-row items-center md:hidden">
      <Hamburger toggled={isOpen} toggle={setOpen} />
      <div className="w-8 h-8 mx-4">
        <Link href="/">
          <Image src="/logo.webp" width={100} height={100} alt="logo" />
        </Link>
      </div>
      <SearchBar />
      <SideMenu isOpen={isOpen} onClose={onClose} session={session} />
    </div>
  );
}
