import React from "react";
import Navbar from "@/app/components/Common/Header/Navbar";


export const metadata = {
    title: "Dashboard | AKS Pharmacy",
    description: "User dashboard for managing orders and profile.",
};

export default function DashboardLayoutGroup({ children }) {
    return (


        <div className="dashboard-layout-wrapper">
            <div className="sticky top-0 z-40">
                <Navbar />
            </div>
            {children}
        </div>


    );
}
