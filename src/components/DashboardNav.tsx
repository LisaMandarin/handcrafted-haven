import { MdOutlineArticle } from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu";
import { ImProfile } from "react-icons/im";

export default function DashboardNav() {
  return (
    <>
      <ul className="flex lg:flex-col justify-evenly lg:justify-start lg:gap-8 bg-custom-brown-1 lg:bg-inherit text-white lg:text-inherit lg:border lg:border-custom-brown-1 py-2 lg:py-2 lg:px-4 rounded-full lg:rounded-md shadow-xl my-4 lg:mt-0">
        <li>
          <MdOutlineArticle className="inline mr-2" />
          Posts
        </li>
        <li>
          <LuShoppingCart className="inline mr-2" />
          Perchases
        </li>
        <li>
          <ImProfile className="inline mr-2" />
          Profile
        </li>
      </ul>
    </>
  );
}
