"use client";

import SmallNav from "./SmallNav";
import LargeNav from "./LargeNav";
import { useSession } from "@/hooks/useSession";
export default function TopNav() {
  const { session, setSession } = useSession();

  return (
    <>
      <div className="md:hidden">
        <SmallNav session={session} setSession={setSession} />
      </div>
      <div className="hidden md:block">
        <LargeNav session={session} setSession={setSession} />
      </div>
    </>
  );
}
