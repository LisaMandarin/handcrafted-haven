"use client";

import SmallNav from "./SmallNav";
import LargeNav from "./LargeNav";

export default function TopNav() {
  
  return (
    <>
      <div className="md:hidden">
        <SmallNav />
      </div>
      <div className="hidden md:block">
        <LargeNav />
      </div>
    </>
  );
}
