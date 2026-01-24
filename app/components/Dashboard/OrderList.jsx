"use client";
import React from "react";
import Link from "next/link";
import { Eye, Download, Package, Truck, CheckCircle, Clock } from "lucide-react";
import { demoOrders } from "./demoData";

const statusStyles = {
    "Delivered": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    "Processing": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    "Shipped": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    "Cancelled": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const statusIcons = {
    "Delivered": CheckCircle,
    "Processing": Clock,
    "Shipped": Truck,
    "Cancelled": Package,
};

const OrderList = () => {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Recent Orders</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-zinc-200 dark:border-zinc-800">
                            <th className="text-left py-4 px-4 font-semibold text-zinc-600 dark:text-zinc-400">Order ID</th>
                            <th className="text-left py-4 px-4 font-semibold text-zinc-600 dark:text-zinc-400">Date</th>
                            <th className="text-left py-4 px-4 font-semibold text-zinc-600 dark:text-zinc-400">Status</th>
                            <th className="text-left py-4 px-4 font-semibold text-zinc-600 dark:text-zinc-400">Total</th>
                            <th className="text-right py-4 px-4 font-semibold text-zinc-600 dark:text-zinc-400">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
                        {demoOrders.map((order) => {
                            const StatusIcon = statusIcons[order.status] || Clock;
                            return (
                                <tr key={order.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                                    <td className="py-4 px-4 font-medium text-zinc-900 dark:text-white uppercase">{order.id}</td>
                                    <td className="py-4 px-4 text-zinc-600 dark:text-zinc-400">{order.date}</td>
                                    <td className="py-4 px-4">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusStyles[order.status]}`}>
                                            <StatusIcon className="w-3.5 h-3.5" />
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 font-semibold text-zinc-900 dark:text-white">৳{order.total.toLocaleString()}</td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/dashboard/orders/${order.id}`}
                                                className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg text-zinc-600 dark:text-zinc-400 transition-colors"
                                                title="View Details"
                                            >
                                                <Eye className="w-5 h-5" />
                                            </Link>
                                            <button
                                                className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg text-zinc-600 dark:text-zinc-400 transition-colors"
                                                title="Download Invoice"
                                            >
                                                <Download className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderList;
