import { IoSearch } from "react-icons/io5";

export default function SearchBar() {
    return (
      <div className="flex-grow relative">
        <label className="sr-only" />
        <input
          placeholder="Search"
          className="rounded-full h-8 border border-custom-yellow-2 w-full p-4 focus:outline-none"
        />
  
        <IoSearch className="absolute top-2 right-2 text-xl" />
      </div>
    );
  }