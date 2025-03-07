import { MdOutlineArticle } from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu";
import { ImProfile } from "react-icons/im";
import Link from "next/link";

export default function DashboardNav() {
  return (
    <>
      <ul className="flex-none flex lg:flex-col justify-evenly lg:justify-start lg:gap-8 bg-custom-brown-1 lg:bg-inherit text-white lg:text-inherit lg:border lg:border-custom-brown-1 py-2 lg:py-2 lg:px-4 rounded-full lg:rounded-md shadow-xl my-4 lg:mt-0">
        <li>
          <Link href="/dashboard/posts">
            <MdOutlineArticle className="inline mr-2" />
            Posts
          </Link>
        </li>
        <li>
          <Link href="/dashboard/purchases">
            <LuShoppingCart className="inline mr-2" />
            Purchases
          </Link>
        </li>
        <li>
          <Link href="/dashboard/profile">
            <ImProfile className="inline mr-2" />
            Profile
          </Link>
        </li>
      </ul>
    </>
  );
}
