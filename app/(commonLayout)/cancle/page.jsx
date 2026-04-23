'use client';

import React from 'react';
import Link from 'next/link';
import { AlertCircle, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function PaymentCancelledPage() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4 py-12">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <div className="absolute inset-0 bg-amber-100 rounded-full scale-150 opacity-50"></div>
                        <AlertCircle className="w-20 h-20 text-amber-500 relative z-10" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
                <p className="text-gray-600 mb-8">
                    Your payment was cancelled. No charges were made from your account. You can complete the payment later from your dashboard.
                </p>

                <div className="space-y-4">
                    <Link
                        href="/dashboard"
                        className="flex items-center justify-center gap-2 bg-[#1d81b3] hover:bg-[#166a94] text-white font-bold py-3 px-6 rounded-xl transition duration-300 w-full"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        Go to Dashboard
                    </Link>

                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 bg-white border-2 border-gray-200 hover:border-[#1d81b3] hover:text-[#1d81b3] text-gray-700 font-bold py-3 px-6 rounded-xl transition duration-300 w-full"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Continue Shopping
                    </Link>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 text-sm text-gray-500">
                    If you experienced any issues, please let us know.
                </div>
            </div>
        </div>
    );
}
