'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { addItem, selectCartItemById } from '@/lib/redux/features/cart/cartSlice';

export default function SmallProductCard({ item }) {
  const dispatch = useAppDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const cartItem = useAppSelector(selectCartItemById(item.id));

  const handleAddToCart = () => {
    setIsAdding(true);

    // Dispatch add to cart action
    dispatch(addItem({
      id: item.id,
      title: item.title,
      price: parseFloat(item.price.replace(/[^0-9.-]+/g, '')), // Extract numeric price
      img: item.img,
      discount: item.discount,
      quantity: 1,
    }));

    // Visual feedback
    setTimeout(() => {
      setIsAdding(false);
    }, 800);
  };

  return (
    <div className="border p-3 border-gray-200 hover:shadow-lg transition duration-300 relative
      h-[420px]  md:h-[490px] flex flex-col rounded-lg">


      {/* Image */}
      <Link
        href={"/products/1"}
        className="w-full h-[200px] md:h-[240px] relative mb-4">
        {/* Discount Badge */}
        {item.discount && (<span
          className="absolute top-4  bg-pink-600 text-white text-xs font-bold px-2 py-1 z-30 ">
          {item.discount}
        </span>)}
        <Image
          src={item.img}
          alt={item.title}
          fill
          className="object-cover"  // <-- changed from object-contain
        />
      </Link>

      <div className='flex flex-col flex-1'>

        {/* Title */}
        <h3 className="text-base font-semibold mb-1 text-center">
          {item.title}
        </h3>

        {/* Rating */}
        <div className="text-yellow-500 text-2xl mb-2 text-center">
          {"★".repeat(item.rating)}
        </div>

        {/* Pricing */}
        <div className="mb-4 text-center">

          {item.oldPrice && (
            <span className="line-through mr-2 text-gray-400">
              {item.oldPrice}
            </span>
          )}
          <span className="font-bold text-pink-600">{item.price}</span>
        </div>

        {/* Button */}
        <div className='w-full  flex justify-center'>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`px-8 py-2 rounded-full font-semibold transition cursor-pointer ${isAdding
                ? 'bg-green-600 text-white'
                : 'bg-[#1d81b3] text-white hover:bg-[#8CC540]'
              }`}
          >
            {isAdding ? '✓ Added!' : cartItem ? `+ Add More (${cartItem.quantity})` : '+ Add to cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
