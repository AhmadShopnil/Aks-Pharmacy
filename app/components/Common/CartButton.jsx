'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { toggleCartDrawer } from '@/lib/redux/features/ui/uiSlice';
import { selectCartCount, selectCartItemsCount } from '@/lib/redux/features/cart/cartSlice';

/**
 * Cart Icon Button Component
 * Displays cart count and opens cart drawer
 */
export default function CartButton() {
    const dispatch = useAppDispatch();
    // const cartCount = useAppSelector(selectCartCount);
     const cartCount = useAppSelector(selectCartItemsCount);
    

    const handleClick = () => {
        dispatch(toggleCartDrawer());
    };
    console.log("selectCartCount",selectCartCount)

    return (
        <button
            onClick={handleClick}
            className="relative p-2 hover:bg-gray-100 rounded-full transition cursor-pointer"
            aria-label="Shopping Cart"
        >
            {/* Cart Icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
            </svg>

            {/* Cart Count Badge */}
            {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount > 99 ? '99+' : cartCount}
                </span>
            )}
        </button>
    );
}
