"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
    ArrowLeft,
    Download,
    Trash2,
    RefreshCcw,
    Package,
    MapPin,
    CreditCard,
    AlertCircle
} from "lucide-react";
import { useGetOrderByIdQuery } from "@/lib/redux/services/ordersApi";

// Depending on the backend mapping, assuming common status codes:
const getStatusLabel = (code) => {
    switch (String(code)) {
        case "0": return "Pending";
        case "1": return "Processing";
        case "2": return "Shipped";
        case "3": return "Delivered";
        case "4": return "Cancelled";
        default: return "Processing";
    }
}

const OrderDetails = ({ orderId }) => {
    const { data, isLoading, isError } = useGetOrderByIdQuery(orderId);

    // Some APIs wrap single item in "data", others return it directly
    const order = data?.data || data;

    if (isLoading) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded w-1/3"></div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 h-64 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                    <div className="h-64 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                </div>
            </div>
        );
    }

    if (isError || !order) {
        return (
            <div className="py-20 flex flex-col items-center justify-center text-center">
                <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Order Not Found</h3>
                <p className="text-zinc-500 mb-6">We couldn't find the details for this order.</p>
                <Link
                    href="/dashboard/orders"
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#0784BB] text-white rounded-lg hover:bg-[#0673a3] transition-colors font-medium"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Orders
                </Link>
            </div>
        );
    }

    const orderItems = order.order_item || [];
    const shipping = order.shippings?.[0] || {};
    const transaction = order.transactions?.[0] || {};

    const shippingAddress = [shipping.address, shipping.thana, shipping.district, shipping.country]
        .filter(Boolean)
        .join(', ');

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link
                        href="/dashboard/orders"
                        className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Link>
                    <h2 className="text-xl font-bold border-l-2 pl-4 border-zinc-200 dark:border-zinc-800">
                        Order #{order.unique_id}
                    </h2>
                </div>
                <div className="flex gap-3">
                    {/* <button className="flex items-center gap-2 px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all font-medium text-sm">
                        <Download className="w-4 h-4" />
                        Invoice
                    </button> */}
                    <span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md font-semibold text-sm">
                        Status: {getStatusLabel(order.status)}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-md border border-zinc-200 dark:border-zinc-800">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Package className="w-5 h-5 text-[#0784BB]" /> Order Items
                        </h3>
                        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {orderItems.map((item) => (
                                <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-md flex items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-700 shrink-0 relative">
                                            {item.icon ? (
                                                <Image src={item.icon} alt={item.item_name} fill className="object-cover" />
                                            ) : (
                                                <Package className="w-8 h-8 text-zinc-400" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-bold text-zinc-900 dark:text-white text-sm sm:text-base line-clamp-2">{item.item_name}</p>
                                            <div className="text-sm text-zinc-500 flex items-center gap-3 mt-1">
                                                <span>Qty: {item.quantity}</span>
                                                {item.size && <span className="border-l pl-3 border-zinc-300">Size: {item.size}</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="font-bold text-[#8CC540] whitespace-nowrap">৳{Number(item.current_price * item.quantity).toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-md border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <h3 className="text-lg font-bold mb-4 text-zinc-800 dark:text-white">Order Summary</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between text-zinc-600 dark:text-zinc-400 text-sm">
                                <span>Subtotal ({order.quantity} items)</span>
                                <span>৳{Number(order.total).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-zinc-600 dark:text-zinc-400 text-sm">
                                <span>Discount</span>
                                <span className={order.discount > 0 ? "text-red-500" : ""}>
                                    -৳{Number(order.discount).toLocaleString()}
                                </span>
                            </div>
                            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex justify-between font-bold text-lg text-zinc-900 dark:text-white">
                                <span>Grand Total</span>
                                <span>৳{Number(order.grand_total).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-md border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <h3 className="text-lg font-bold mb-4 text-zinc-800 dark:text-white">Delivery & Payment</h3>
                        <div className="space-y-5">
                            <div className="flex gap-3">
                                <MapPin className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-semibold text-zinc-900 dark:text-white mb-1">Shipping Address</p>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                        {shipping.name}<br />
                                        {shipping.phone}<br />
                                        {shippingAddress || 'No address provided'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <CreditCard className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-semibold text-zinc-900 dark:text-white mb-1">Payment Method</p>
                                    <div className="flex flex-col gap-1 mt-1">
                                        <span className="text-sm text-zinc-600 dark:text-zinc-400">
                                            {transaction.payment_method || 'Cash on Delivery'}
                                        </span>
                                        <span className={`text-xs font-bold px-2 py-0.5 w-max rounded-full ${order.payment_status?.toLowerCase() === 'paid'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {order.payment_status || 'Due'}
                                        </span>
                                    </div>
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
