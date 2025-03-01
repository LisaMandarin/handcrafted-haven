import React from "react";
import DashboardNav from "@/components/DashboardNav";

export default function Layout({children} : {children: React.ReactNode}) {
    return (
        <div className="flex flex-col lg:flex-row lg:min-h-[calc(100vh-160px)] gap-4">
            <DashboardNav />
            <div className="flex-grow">
                {children}
            </div>
        </div>
    )
}