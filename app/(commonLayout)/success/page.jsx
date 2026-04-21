'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle, Package, ArrowRight, ShoppingBag } from 'lucide-react';

export default function PaymentSuccessPage() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4 py-12">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <div className="absolute inset-0 bg-green-100 rounded-full scale-150 animate-pulse"></div>
                        <CheckCircle className="w-20 h-20 text-green-500 relative z-10" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
                <p className="text-gray-600 mb-8">
                    Thank you for your purchase. Your order has been placed and is being processed.
                </p>

                <div className="space-y-4">
                    <Link
                        href="/dashboard"
                        className="flex items-center justify-center gap-2 bg-[#1d81b3] hover:bg-[#166a94] text-white font-bold py-3 px-6 rounded-xl transition duration-300 w-full"
                    >
                        <Package className="w-5 h-5" />
                        View Order Details
                    </Link>

                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 bg-white border-2 border-gray-200 hover:border-[#1d81b3] hover:text-[#1d81b3] text-gray-700 font-bold py-3 px-6 rounded-xl transition duration-300 w-full"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        Continue Shopping
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 text-sm text-gray-500">
                    A confirmation email has been sent to your registered email address.
                </div>
            </div>
        </div>
    );
}
