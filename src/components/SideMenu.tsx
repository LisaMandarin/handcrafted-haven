import { Drawer } from "antd";
import { IoClose } from "react-icons/io5";
import { racing } from "@/app/styles/fonts";
import { IoPeopleSharp } from "react-icons/io5";
import { FaGifts } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { SlLogout, SlLogin } from "react-icons/sl";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export function SideMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const {data: session} = useSession();

  // close the menu while clicking the link
  const handleClick = () => {
    onClose();
  };

  const handleSignOut = () => {
    onClose()
    signOut()
  }
  return (
    <Drawer
      placement="right"
      open={isOpen}
      onClose={onClose}
      closable={false}
      width="90vw"
      styles={{ body: { padding: 0 } }}
    >
      <div className="text-xl flex flex-col items-center h-full bg-custom-dark-brown text-custom-yellow-1">
        <h1 className={`${racing.className} text-2xl mt-6`}>
          <Link href="/" className="side-menu-link" onClick={handleClick}>
            Handcrafted Haven
          </Link>
        </h1>
        <ul className="flex-grow flex flex-col justify-evenly">
          <li>
            <Link
              href="/artisans"
              className="side-menu-link"
              onClick={handleClick}
            >
              <IoPeopleSharp className="inline mr-4" />
              Meet Artisans
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className="side-menu-link"
              onClick={handleClick}
            >
              <FaGifts className="inline mr-4" />
              See Products
            </Link>
          </li>
          <li>
            <Link
              href="/categories"
              className="side-menu-link"
              onClick={handleClick}
            >
              <AiFillProduct className="inline mr-4" />
              View Categories
            </Link>
          </li>
          <div className="flex flex-col items-start gap-8">
            {session ? (
              <>
                <Link href="/dashboard" className="side-menu-link" onClick={handleClick}>
                  <div className="flex gap-4">
                    <RxAvatar className="text-2xl" />
                    Dashboard
                  </div>
                </Link>

                <p className="flex gap-4" onClick={handleSignOut}>
                  <SlLogout />
                  Sign Out
                </p>
              </>
            ) : (
              <>
                <p>
                  <Link
                    href="/login"
                    className="side-menu-link flex gap-4"
                    onClick={handleClick}
                  >
                    <SlLogin />
                    Log In
                  </Link>
                </p>
              </>
            )}
          </div>
        </ul>
        <IoClose className="text-4xl mb-6 cursor-pointer" onClick={onClose} />
      </div>
    </Drawer>
  );
}
