import React from "react";
import DashboardSidebar from "@/app/components/Dashboard/DashboardSidebar";
import Container from "@/app/components/Common/Container";

export const metadata = {
    title: "User Dashboard | AKS Pharmacy",
    description: "Manage your orders, profile and tracking.",
};

export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black pt-24 pb-12">
            <Container>
                <div className="flex flex-col lg:flex-row gap-8">
                    <DashboardSidebar />
                    <main className="flex-1 min-w-0">
                        {children}
                    </main>
                </div>
            </Container>
        </div>
    );
}
