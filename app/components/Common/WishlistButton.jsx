'use client';

import React from 'react';
import { useAppSelector } from '@/lib/redux/hooks';
import { selectWishlistItems } from '@/lib/redux/features/wishlist/wishlistSlice';
import { Heart } from 'lucide-react';
import Link from 'next/link';

export default function WishlistButton() {
    const wishlistItems = useAppSelector(selectWishlistItems);
    const count = wishlistItems.length;

    return (
        <Link
            href="/wishlist"
            className="relative p-2 hover:bg-gray-100 rounded-full transition cursor-pointer flex items-center justify-center"
            aria-label="Wishlist"
        >
            <Heart className="h-6 w-6 text-gray-700" />

            {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center">
                    {count > 99 ? '99+' : count}
                </span>
            )}
        </Link>
    );
}
