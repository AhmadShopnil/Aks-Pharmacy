"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    User,
    ShoppingBag,
    MapPin,
    LogOut,
    LayoutDashboard,
    Search
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "My Orders", href: "/dashboard/orders", icon: ShoppingBag },
    // { label: "Track Order", href: "/dashboard/track-order", icon: Search },
    { label: "Addresses", href: "/dashboard/addresses", icon: MapPin },
    { label: "Profile", href: "/dashboard/profile", icon: User },
];

const DashboardSidebar = () => {
    const pathname = usePathname();

    return (
        <div className="w-full lg:w-64 h-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 
        rounded-md 
        px-4 py-6
         sticky top-24">
            <div className="space-y-1">
                {menuItems?.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-sm transition-all duration-200 group",
                                isActive
                                    ? "bg-[#1D81B3] text-white dark:bg-white dark:text-zinc-900 shadow-lg"
                                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            )}
                        >
                            <Icon className={cn(
                                "w-5 h-5",
                                isActive ? "text-inherit" : "text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white"
                            )} />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
                <button
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-200 mt-4 group"
                >
                    <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default DashboardSidebar;
