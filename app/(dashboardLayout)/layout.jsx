import React from "react";
import Navbar from "@/app/components/Common/Header/Navbar";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Dashboard | AKS Pharmacy",
    description: "User dashboard for managing orders and profile.",
};

export default function DashboardLayoutGroup({ children }) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <div className="dashboard-layout-wrapper">
                    <div className="sticky top-0 z-40">
                        <Navbar />
                    </div>
                    {children}
                </div>
            </body>
        </html>
    );
}
