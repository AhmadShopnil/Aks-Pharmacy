'use client';

import React from 'react';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import {
    selectCartItems,
    selectCartTotal,
    selectCartCount,
    removeItem,
    incrementQuantity,
    decrementQuantity,
} from '@/lib/redux/features/cart/cartSlice';
import { toggleCartDrawer, selectCartDrawerOpen } from '@/lib/redux/features/ui/uiSlice';

/**
 * Cart Drawer Component
 * Displays cart items with add/remove functionality
 */
export default function CartDrawer() {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(selectCartItems);
    const cartTotal = useAppSelector(selectCartTotal);
    const cartCount = useAppSelector(selectCartCount);
    const isOpen = useAppSelector(selectCartDrawerOpen);

    const handleClose = () => {
        dispatch(toggleCartDrawer());
    };

    const handleRemove = (id) => {
        dispatch(removeItem(id));
    };

    const handleIncrement = (id) => {
        dispatch(incrementQuantity(id));
    };

    const handleDecrement = (id) => {
        dispatch(decrementQuantity(id));
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0  bg-opacity-0 z-50 transition-opacity"
                onClick={handleClose}
            />

            {/* Drawer */}
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-bold">
                        Shopping Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
                    </h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        ×
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4">
                    {cartItems.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <p className="text-lg">Your cart is empty</p>
                            <p className="text-sm mt-2">Add some products to get started!</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex gap-4 p-3 border rounded-lg hover:shadow-md transition"
                                >
                                    {/* Product Image */}
                                    <div className="relative w-20 h-20 shrink-0">
                                        <Image
                                            src={item.img}
                                            alt={item.title}
                                            fill
                                            className="object-cover rounded"
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-sm truncate">{item.title}</h3>
                                        <p className="text-pink-600 font-bold mt-1">
                                            ${item.price.toFixed(2)}
                                        </p>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-2 mt-2">
                                            <button
                                                onClick={() => handleDecrement(item.id)}
                                                className="w-7 h-7 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                                            >
                                                −
                                            </button>
                                            <span className="w-8 text-center font-semibold">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => handleIncrement(item.id)}
                                                className="w-7 h-7 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* Remove Button */}
                                    <div className="flex flex-col justify-between items-end">
                                        <button
                                            onClick={() => handleRemove(item.id)}
                                            className="text-red-500 hover:text-red-700 text-sm"
                                        >
                                            Remove
                                        </button>
                                        <p className="font-bold text-sm">
                                            ${item.totalPrice.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div className="border-t p-4 space-y-3">
                        <div className="flex justify-between items-center text-lg font-bold">
                            <span>Total:</span>
                            <span className="text-pink-600">${cartTotal.toFixed(2)}</span>
                        </div>
                        <button className="w-full bg-[#1d81b3] text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition">
                            Proceed to Checkout
                        </button>
                        <button
                            onClick={handleClose}
                            className="w-full border border-gray-300 py-3 rounded-full font-semibold hover:bg-gray-50 transition"
                        >
                            Continue Shopping
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
