"use client";
import React from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Download,
    Trash2,
    RefreshCcw,
    Package,
    MapPin,
    CreditCard
} from "lucide-react";
import { demoOrders } from "./demoData";

const OrderDetails = ({ orderId }) => {
    const order = demoOrders.find(o => o.id === orderId) || demoOrders[0];

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <Link
                    href="/dashboard/orders"
                    className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Orders
                </Link>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-md
                     hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all font-medium">
                        <Download className="w-4 h-4" />
                        Invoice
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100
                     transition-all font-medium">
                        <Trash2 className="w-4 h-4" />
                        Cancel Order
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-all font-medium">
                        <RefreshCcw className="w-4 h-4" />
                        Request Refund
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-md border border-zinc-200 dark:border-zinc-800">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Package className="w-5 h-5" /> Order Items
                        </h3>
                        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {order.items.map((item) => (
                                <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-md flex items-center justify-center font-bold text-zinc-400">
                                            IMG
                                        </div>
                                        <div>
                                            <p className="font-bold">{item.name}</p>
                                            <p className="text-sm text-zinc-500">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="font-bold">৳{item.price * item.quantity}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-md border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <h3 className="text-lg font-bold mb-4">Order Summary</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between text-zinc-500 text-sm">
                                <span>Subtotal</span>
                                <span>৳{order.total - 60}</span>
                            </div>
                            <div className="flex justify-between text-zinc-500 text-sm">
                                <span>Shipping</span>
                                <span>৳60</span>
                            </div>
                            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>৳{order.total}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-md border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <h3 className="text-lg font-bold mb-4">Delivery & Payment</h3>
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <MapPin className="w-5 h-5 text-zinc-400 shrink-0" />
                                <div>
                                    <p className="text-sm font-semibold">Shipping Address</p>
                                    <p className="text-sm text-zinc-500">{order.shippingAddress}</p>
                                </div>
                            </div>
                            <div className="flex gap-3 text-sm">
                                <CreditCard className="w-5 h-5 text-zinc-400 shrink-0" />
                                <div>
                                    <p className="font-semibold">Payment Method</p>
                                    <p className="text-zinc-500">{order.paymentMethod}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
