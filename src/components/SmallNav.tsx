"use client";

import Hamburger from "hamburger-react";
import { SideMenu } from "./SideMenu";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";

type Session = {
  user: {
    id: string;
    email: string;
  };
} | null;

export default function SmallNav({ session }: { session: Session }) {
  const [isOpen, setOpen] = useState(false); // toggle side menu
  const onClose = () => setOpen(false);

  return (
    <div className="px-6 pt-3 flex flex-row items-center">
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
