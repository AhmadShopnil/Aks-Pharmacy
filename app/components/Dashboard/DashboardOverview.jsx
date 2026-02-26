"use client";
import React from "react";
import {
    ShoppingBag,
    Clock,
    CheckCircle,
    CreditCard,
    ArrowUpRight
} from "lucide-react";
import OrderList from "./OrderList";
import { demoUser, demoOrders } from "./demoData";

const statCards = [
    { label: "Total Orders", value: "12", icon: ShoppingBag, color: "bg-blue-500" },
    { label: "Pending", value: "02", icon: Clock, color: "bg-orange-500" },
    { label: "Delivered", value: "08", icon: CheckCircle, color: "bg-green-500" },
    { label: "Refunded", value: "01", icon: CreditCard, color: "bg-purple-500" },
];

const DashboardOverview = () => {
    return (
        <div className="space-y-8">
            {/* <div>
                <h2 className="text-3xl font-black text-[#8CC640] dark:text-white tracking-tight">
                    Welcome back, {demoUser.name.split(' ')[0]}!
                </h2>
                
            </div> */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <div key={index} className="bg-white dark:bg-zinc-900 p-6 rounded-md border border-zinc-200 dark:border-zinc-800 relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${stat.color} text-white`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <button className="text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowUpRight className="w-5 h-5" />
                            </button>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-zinc-500">{stat.label}</p>
                            <h3 className="text-2xl font-black mt-1 dark:text-white">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white dark:bg-zinc-900 p-6 rounded-md border border-zinc-200 dark:border-zinc-800">
                <OrderList />
            </div>
        </div>
    );
};

export default DashboardOverview;
