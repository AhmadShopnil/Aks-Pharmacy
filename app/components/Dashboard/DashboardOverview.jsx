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
import { useGetOrdersQuery } from "@/lib/redux/services/ordersApi";

const getStatusLabel = (code) => {
    switch (String(code)) {
        case "0": return "Pending";
        case "1": return "Processing";
        case "2": return "Shipped";
        case "3": return "Delivered";
        case "4": return "Cancelled";
        case "5": return "Refunded"; // Assuming 5 is refunded, adjust if needed
        default: return "Processing";
    }
}

const DashboardOverview = () => {
    // Fetch order data, limiting page size if possible or using the default
    const { data: ordersData, isLoading } = useGetOrdersQuery({ page: 1 });
    const orders = ordersData?.data || [];

    // Calculate dynamic stats
    const totalOrders = ordersData?.total || orders.length;
    let pendingCount = 0;
    let deliveredCount = 0;
    let refundedCount = 0;

    // Based on the provided data structurre, status field holds string codes
    orders.forEach(order => {
        const status = getStatusLabel(order.status);
        if (status === "Pending" || order.status === "0") pendingCount++;
        if (status === "Delivered" || order.status === "3") deliveredCount++;
        if (status === "Cancelled" || status === "Refunded" || order.status === "4") refundedCount++;
    });

    const statCards = [
        { label: "Total Orders", value: totalOrders.toString().padStart(2, '0'), icon: ShoppingBag, color: "bg-blue-500" },
        { label: "Pending", value: pendingCount.toString().padStart(2, '0'), icon: Clock, color: "bg-orange-500" },
        { label: "Delivered", value: deliveredCount.toString().padStart(2, '0'), icon: CheckCircle, color: "bg-green-500" },
        { label: "Cancelled/Refunded", value: refundedCount.toString().padStart(2, '0'), icon: CreditCard, color: "bg-purple-500" },
    ];

    return (
        <div className="space-y-8">
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
                            {isLoading ? (
                                <div className="h-8 w-16 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse mt-1"></div>
                            ) : (
                                <h3 className="text-2xl font-black mt-1 dark:text-white">{stat.value}</h3>
                            )}
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
