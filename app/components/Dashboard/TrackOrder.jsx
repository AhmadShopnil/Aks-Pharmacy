"use client";
import React, { useState } from "react";
import { Search, MapPin, Package, Truck, CheckCircle, Clock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const TrackOrder = () => {
    const [orderId, setOrderId] = useState("");
    const [phone, setPhone] = useState("");
    const [trackingData, setTrackingData] = useState(null);

    const handleTrack = (e) => {
        e.preventDefault();
        // Demo tracking data
        setTrackingData({
            id: orderId || "ORD-2024-002",
            status: "Shipped",
            currentLocation: "Dhaka Distribution Center",
            estimatedDelivery: "24 Jan 2024",
            steps: [
                { status: "Order Placed", date: "20 Jan 2024", completed: true },
                { status: "Processing", date: "21 Jan 2024", completed: true },
                { status: "Shipped", date: "22 Jan 2024", completed: true },
                { status: "Out for Delivery", date: "Pending", completed: false },
                { status: "Delivered", date: "Pending", completed: false },
            ]
        });
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <h2 className="text-xl font-bold mb-6">Track Your Order</h2>
                <form onSubmit={handleTrack} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Order ID</label>
                        <input
                            type="text"
                            placeholder="e.g. ORD-123"
                            className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-zinc-900 outline-none transition-all"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Phone Number</label>
                        <input
                            type="tel"
                            placeholder="e.g. 017XXXXXXXX"
                            className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-zinc-900 outline-none transition-all"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="md:col-span-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                        <Search className="w-5 h-5" />
                        Track Order
                    </button>
                </form>
            </div>

            <AnimatePresence>
                {trackingData && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800"
                    >
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
                            <div>
                                <p className="text-sm text-zinc-500 uppercase tracking-wider font-semibold">Order ID</p>
                                <h3 className="text-xl font-bold">{trackingData.id}</h3>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-zinc-500 uppercase tracking-wider font-semibold">Estimated Delivery</p>
                                <h3 className="text-xl font-bold text-blue-600">{trackingData.estimatedDelivery}</h3>
                            </div>
                        </div>

                        <div className="relative">
                            {/* Stepper implementation */}
                            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-zinc-100 dark:bg-zinc-800 ml-[-1px] md:left-1/2" />

                            <div className="space-y-12 relative">
                                {trackingData.steps.map((step, index) => (
                                    <div key={index} className="flex items-center gap-6 md:justify-center">
                                        <div className="flex-1 text-right hidden md:block">
                                            {index % 2 === 0 && (
                                                <div>
                                                    <p className="font-bold dark:text-white">{step.status}</p>
                                                    <p className="text-sm text-zinc-500">{step.date}</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${step.completed ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400'}`}>
                                            {step.completed ? <CheckCircle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                                        </div>

                                        <div className="flex-1">
                                            {index % 2 !== 0 || true ? (
                                                <div className="md:hidden">
                                                    <p className="font-bold dark:text-white">{step.status}</p>
                                                    <p className="text-sm text-zinc-500">{step.date}</p>
                                                </div>
                                            ) : null}
                                            <div className="hidden md:block">
                                                {index % 2 !== 0 && (
                                                    <div>
                                                        <p className="font-bold dark:text-white">{step.status}</p>
                                                        <p className="text-sm text-zinc-500">{step.date}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TrackOrder;
