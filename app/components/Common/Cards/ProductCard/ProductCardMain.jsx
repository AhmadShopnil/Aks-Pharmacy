'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { addItem, selectCartItemById } from '@/lib/redux/features/cart/cartSlice';
import { toggleWishlist, selectIsInWishlist } from '@/lib/redux/features/wishlist/wishlistSlice';
import { Heart } from 'lucide-react';

export default function ProductCardMain({ item }) {
  const dispatch = useAppDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const cartItem = useAppSelector(selectCartItemById(item?.id));
  const isInWishlist = useAppSelector(selectIsInWishlist(item?.id));

  // extra info of product
  const varrientInfo = item?.packages?.variations[0]
  const sale_price = varrientInfo?.sale_price
  const display_price = varrientInfo?.display_price
  const stock_quantity = varrientInfo?.stock_quantity
  const stock_status = varrientInfo?.stock_status
  const is_on_sale = varrientInfo?.is_on_sale
  const featured_image = varrientInfo?.featured_image
  const discount = display_price - sale_price

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist({
      id: item.id,
      title: item?.name,

      price: parseFloat(sale_price.replace(/[^0-9.-]+/g, '')),
      img: featured_image?.file_url
      ,
      discount: discount || 0,
      rating: item.rating
    }));
  };

  const handleAddToCart = () => {
    setIsAdding(true);

    // Dispatch add to cart action
    dispatch(addItem({
      id: item.id,
      title: item?.name,
      // price: parseFloat(sale_price.replace(/[^0-9.-]+/g, '')), // Extract numeric price
      price: parseFloat(sale_price.replace(/[^0-9.-]+/g, '')),
      img: featured_image?.file_url
      ,
      discount: discount || 0,
      quantity: 1,
    }));

    // Visual feedback
    setTimeout(() => {
      setIsAdding(false);
    }, 800);
  };






  return (
    <div className="border p-1.5 md:p-3 border-gray-100 hover:shadow-lg transition duration-300 relative
      h-[360px] md:h-[520px] flex flex-col">


      {/* Image */}
      <Link
        href={`/products/${item?.slug}`}
        className="w-full h-[140px] md:h-[270px] relative mb-4">
        {/* Discount Badge */}
        {item?.discount && (<span
          className="absolute top-4  bg-pink-600 text-white text-xs font-bold px-2 py-1 z-30 ">
          {item.discount}
        </span>)}
        <Image
          src={featured_image?.file_url || "/images/placeholder-product.webp" }
          alt={item?.name || "product image"}
          fill
          className="object-cover"
        />


      </Link>
      {/* Wishlist Button */}
      <button
        onClick={handleToggleWishlist}
        className={`absolute top-4 right-4 z-20 p-2 rounded-full shadow-md transition-all duration-300 group/wishlist ${isInWishlist ? 'bg-pink-50 text-pink-600' : 'bg-white/80 text-gray-400 hover:text-pink-600 hover:bg-white'
          }`}
      >
        <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : 'group-hover/wishlist:scale-110'}`} />
      </button>

      <div className='flex flex-col flex-1 justify-between pb-2'>

        <div className='text-center'>
          {/* Title */}
          <Link
            href={`/products/${item?.slug}`}
            className="text-sm md:text-base font-semibold mb-1 text-center">
            {item?.name}
          </Link>

          {/* Rating */}
          <div className="text-yellow-500 text-base md:text-2xl mb-2 text-center">
            {"★".repeat(item?.rating)}
          </div>

          {/* Pricing */}
          <div className="mb-4 text-center text-sm md:text-base">

            {(display_price && display_price > sale_price) && (
              <span className="line-through mr-2 text-gray-400">
                <span className='text-xl md:text-2xl mr-1'>৳</span> {display_price}
              </span>
            )}
            <span className="font-bold text-pink-600 ">
              <span className='text-xl md:text-2xl mr-1'>৳</span>
              {sale_price}</span>
          </div>

        </div>
        {/* Button */}
        <div className='w-full  flex justify-center'>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`px-4 py-1.5 md:px-8 md:py-2 text-xs md:text-base rounded-full font-semibold transition cursor-pointer ${isAdding
              ? 'bg-green-600 text-white'
              : 'bg-[#0784BB] text-white hover:bg-[#8CC540]'
              }`}
          >
            {isAdding ? '✓ Added!' : cartItem ? `+ Add More (${cartItem.quantity})` : '+ Add to cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
