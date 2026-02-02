"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { selectWishlistItems, removeFromWishlist } from "@/lib/redux/features/wishlist/wishlistSlice";
import { addItem } from "@/lib/redux/features/cart/cartSlice";
import { showNotification } from "@/lib/redux/features/ui/uiSlice";
import Container from "@/app/components/Common/Container";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingCart, Heart, ArrowRight, Home } from "lucide-react";
import { motion } from "framer-motion";

export default function WishlistPage() {
    const dispatch = useAppDispatch();
    const wishlistItems = useAppSelector(selectWishlistItems);

    const handleAddToCart = (item) => {
        dispatch(addItem({
            id: item.id,
            title: item.title,
            price: typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.-]+/g, '')) : item.price,
            img: item.img,
            quantity: 1
        }));

        dispatch(showNotification({
            message: `${item.title} added to cart!`,
            type: 'success'
        }));
    };

    const handleRemove = (id) => {
        dispatch(removeFromWishlist(id));
    };

    return (
        <div className="bg-slate-50 min-h-screen py-12 md:py-20">
            <Container>
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
                    <Link href="/" className="hover:text-[#0784BB] transition-colors flex items-center gap-1">
                        <Home size={16} /> Home
                    </Link>
                    <ArrowRight size={14} />
                    <span className="text-slate-900 font-medium">Wishlist</span>
                </nav>

                <div className="mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 flex items-center gap-4">
                        My Wishlist
                        <span className="text-lg font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                            {wishlistItems.length} items
                        </span>
                    </h1>
                    <p className="text-slate-500 mt-2">Manage your favorite products and add them to your cart anytime.</p>
                </div>

                {wishlistItems.length > 0 ? (
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-100 bg-slate-50/50">
                                        <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider">Product</th>
                                        <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider">Price</th>
                                        <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {wishlistItems.map((item) => (
                                        <motion.tr
                                            layout
                                            key={item.id}
                                            className="group hover:bg-slate-50/30 transition-colors"
                                        >
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-6">
                                                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-slate-100 bg-white p-2 flex-shrink-0">
                                                        <Image
                                                            src={item.img}
                                                            alt={item.title}
                                                            fill
                                                            className="object-contain"
                                                        />
                                                    </div>
                                                    <div>
                                                        <Link
                                                            href={`/products/${item.title}`}
                                                            className="text-lg font-bold text-slate-900 hover:text-[#0784BB] transition-colors block mb-1"
                                                        >
                                                            {item.title}
                                                        </Link>
                                                        <span className="text-sm text-slate-400 font-medium">{item.brand || 'Personal Care'}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-xl font-bold text-[#0784BB]">{item.price}</span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center justify-end gap-3">
                                                    <button
                                                        onClick={() => handleAddToCart(item)}
                                                        className="bg-[#0784BB] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#0673a3] transition-all shadow-lg shadow-blue-100 flex items-center gap-2 whitespace-nowrap"
                                                    >
                                                        <ShoppingCart size={18} /> Add to Cart
                                                    </button>
                                                    <button
                                                        onClick={() => handleRemove(item.id)}
                                                        className="p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                                                        title="Remove from wishlist"
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-slate-200">
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
                            <Heart className="text-slate-200" size={48} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2"> Your wishlist is empty</h2>
                        <p className="text-slate-500 mb-10 max-w-sm mx-auto">
                            Looks like you haven't added anything to your wishlist yet.
                            Start exploring our store and save your favorite items!
                        </p>
                        {/* <Link
                            href="/shop"
                            className="inline-flex items-center gap-2 px-10 py-4 bg-[#0784BB] text-white rounded-2xl font-bold hover:bg-[#0673a3] transition-all shadow-xl shadow-blue-100"
                        >
                            Start Shopping <ArrowRight size={20} />
                        </Link> */}
                    </div>
                )}
            </Container>
        </div>
    );
}
