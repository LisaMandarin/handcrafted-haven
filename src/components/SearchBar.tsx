import { IoSearch } from "react-icons/io5";

export default function SearchBar() {
    return (
      <form 
        action="/search"
        className="flex-grow relative">
        <label htmlFor="query" className="sr-only" />
        <input
          name="query"
          placeholder="Search"
          className="rounded-full h-8 border border-custom-yellow-2 w-full p-4 focus:outline-none"
        />
        <button type="submit" className="absolute top-2 right-2">
          <IoSearch className="text-xl" />
        </button>
      </form>
    );
  }