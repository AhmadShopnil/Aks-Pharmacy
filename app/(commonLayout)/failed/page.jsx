'use client';

import React from 'react';
import Link from 'next/link';
import { XCircle, RefreshCw, ShoppingCart, HelpCircle } from 'lucide-react';

export default function PaymentFailedPage() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4 py-12">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <div className="absolute inset-0 bg-red-100 rounded-full scale-150 animate-pulse"></div>
                        <XCircle className="w-20 h-20 text-red-500 relative z-10" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Failed</h1>
                <p className="text-gray-600 mb-8">
                    We're sorry, but your transaction could not be processed. Please try again or use a different payment method.
                </p>

                <div className="space-y-4">
                    <Link
                        href="/dashboard"
                        className="flex items-center justify-center gap-2 bg-[#1d81b3] hover:bg-[#166a94] text-white font-bold py-3 px-6 rounded-xl transition duration-300 w-full"
                    >
                        <RefreshCw className="w-5 h-5" />
                        Try Again from Dashboard
                    </Link>

                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 bg-white border-2 border-gray-200 hover:border-[#1d81b3] hover:text-[#1d81b3] text-gray-700 font-bold py-3 px-6 rounded-xl transition duration-300 w-full"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        Back to Shopping
                    </Link>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
                        <HelpCircle className="w-4 h-4" />
                        Need help? Contact our support team.
                    </p>
                </div>
            </div>
        </div>
    );
}
