"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Eye, Download, Package, Truck, CheckCircle, Clock, ChevronLeft, ChevronRight, CreditCard } from "lucide-react";
import { useGetOrdersQuery } from "@/lib/redux/services/ordersApi";
import { useInitiatePaymentMutation } from "@/lib/redux/services/paymentsApi";
import { useAppSelector } from "@/lib/redux/hooks";
import toast from "react-hot-toast";

// Depending on the backend mapping, assuming common status codes:
// "0": Pending, "1": Processing, "2": Shipped, "3": Delivered, "4": Cancelled
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

const statusStyles = {
    "Pending": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    "Processing": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    "Shipped": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    "Delivered": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    "Cancelled": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const statusIcons = {
    "Pending": Clock,
    "Processing": Clock,
    "Shipped": Truck,
    "Delivered": CheckCircle,
    "Cancelled": Package,
};

const OrderList = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, isError, isFetching } = useGetOrdersQuery({ page });
    const [initiatePayment, { isLoading: isInitiatingPayment }] = useInitiatePaymentMutation();
    const profile = useAppSelector((state) => state.user?.profile);

    const orders = data?.data || [];

    const handlePayNow = async (order) => {
        const toastId = toast.loading("Redirecting to payment gateway...");
        try {
            const origin = window.location.origin;

            // In the list view, shippings might not be present. 
            // We use profile as fallback or dummy data.
            const shipping = order.shippings?.[0] || {};
            const existingTx = order.transactions?.[0]?.transaction_id;

            const paymentPayload = {
                gateway: 'sslcommerz',
                amount: order.grand_total,
                currency: 'BDT',
                transaction_id: existingTx || order.unique_id,
                customer_name: shipping.name || profile?.name || "Customer",
                customer_email: shipping.email || profile?.email || "customer@example.com",
                customer_phone: shipping.phone || profile?.phone || "01700000000",
                product_name: order.order_item?.[0]?.item_name || 'Pharmacy Order',
                product_category: 'Healthcare',
                customer_address: shipping.address || 'Dhaka',
                customer_city: shipping.district || 'Dhaka',
                customer_postcode: '1000',
                customer_country: 'Bangladesh',
                success_url: `${origin}/success`,
                fail_url: `${origin}/failed`,
                cancel_url: `${origin}/cancle`
            };


            const res = await initiatePayment(paymentPayload).unwrap();

            if (res?.gateway_url) {
                toast.dismiss(toastId); //  close loader
                window.location.href = res.gateway_url;
            } else {
                toast.error("Failed to get payment URL", { id: toastId }); //  replaces loading
            }
        } catch (err) {
            console.error(err);
            toast.error(
                err?.data?.message || "Failed to initiate payment. Please try again.",
                { id: toastId } //  replaces loading
            );
        }
    };
    const meta = data || {}; // API returns pagination top level: current_page, last_page
    const currentPage = meta.current_page || 1;
    const lastPage = meta.last_page || 1;
    const total = meta.total || 0;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Recent Orders</h2>
            </div>

            <div className="overflow-x-auto bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                            <th className="text-left py-4 px-4 font-semibold text-zinc-600 dark:text-zinc-400">Order ID</th>
                            <th className="text-left py-4 px-4 font-semibold text-zinc-600 dark:text-zinc-400">Date</th>
                            <th className="text-left py-4 px-4 font-semibold text-zinc-600 dark:text-zinc-400">Status</th>
                            <th className="text-left py-4 px-4 font-semibold text-zinc-600 dark:text-zinc-400">Total</th>
                            <th className="text-right py-4 px-4 font-semibold text-zinc-600 dark:text-zinc-400">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50 relative">
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    <td className="py-4 px-4"><div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-24"></div></td>
                                    <td className="py-4 px-4"><div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-24"></div></td>
                                    <td className="py-4 px-4"><div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded-full w-24"></div></td>
                                    <td className="py-4 px-4"><div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-16"></div></td>
                                    <td className="py-4 px-4 flex justify-end gap-2"><div className="h-8 w-8 bg-zinc-200 dark:bg-zinc-700 rounded-lg"></div></td>
                                </tr>
                            ))
                        ) : isError ? (
                            <tr>
                                <td colSpan="5" className="py-10 text-center text-red-500">Failed to load orders. Please try again.</td>
                            </tr>
                        ) : orders.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="py-10 text-center text-zinc-500">No orders found.</td>
                            </tr>
                        ) : (
                            orders.map((order) => {
                                // const statusName = getStatusLabel(order.status);
                                const statusName = order.status;
                                const StatusIcon = statusIcons[statusName] || Clock;
                                const dateFormatted = new Date(order.created_at).toLocaleDateString('en-GB', {
                                    day: 'numeric', month: 'short', year: 'numeric'
                                });

                                return (
                                    <tr key={order.id} className={`hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors ${isFetching ? 'opacity-50' : ''}`}>
                                        <td className="py-4 px-4 font-medium text-zinc-900 dark:text-white uppercase">#{order.unique_id}</td>
                                        <td className="py-4 px-4 text-zinc-600 dark:text-zinc-400">{dateFormatted}</td>
                                        <td className="py-4 px-4">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusStyles[statusName]}`}>
                                                <StatusIcon className="w-3.5 h-3.5" />
                                                {statusName}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 font-semibold text-zinc-900 dark:text-white">
                                            ৳{Number(order.grand_total).toLocaleString()}
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/dashboard/orders/${order.unique_id}`}
                                                    className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg text-zinc-600 dark:text-zinc-400 transition-colors"
                                                    title="View Details"
                                                >
                                                    <Eye className="w-5 h-5" />
                                                </Link>
                                                {order.payment_status?.toLowerCase() !== 'paid' && order.status !== '4' && (
                                                    <button
                                                        onClick={() => handlePayNow(order)}
                                                        disabled={isInitiatingPayment}
                                                        className="p-2 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg text-green-600 dark:text-green-400 transition-colors"
                                                        title="Pay Now"
                                                    >
                                                        <CreditCard className="w-5 h-5" />
                                                    </button>
                                                )}
                                                {/* <button
                                                    className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg text-zinc-600 dark:text-zinc-400 transition-colors"
                                                    title="Download Invoice"
                                                    onClick={() => alert('Invoice feature coming soon!')}
                                                >
                                                    <Download className="w-5 h-5" />
                                                </button> */}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                {lastPage > 1 && !isLoading && !isError && (
                    <div className="py-4 px-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                        <span className="text-sm text-zinc-500">
                            Showing {(currentPage - 1) * 15 + 1} to {Math.min(currentPage * 15, total)} of {total} entries
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1 || isFetching}
                                className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                            </button>
                            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Page {currentPage} of {lastPage}
                            </span>
                            <button
                                onClick={() => setPage(p => Math.min(lastPage, p + 1))}
                                disabled={currentPage === lastPage || isFetching}
                                className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 transition-colors"
                            >
                                <ChevronRight className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderList;
