import React from "react";
import DashboardNav from "@/components/DashboardNav";
import { getSession } from "@/utils/session";
import LoginButton from "@/components/LoginButton";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  return (
    <>
      {session?.user ? (
        <div className="flex flex-col lg:flex-row lg:min-h-[calc(100vh-160px)] gap-4">
          <DashboardNav />
          <div className="flex-grow">{children}</div>
        </div>
      ) : (
        <div className="py-4">
          <p>You will only see this if you are not authenticated.</p>
          <p className=" text-custom-brown-1">
            Please <LoginButton />
          </p>
        </div>
      )}
    </>
  );
}
