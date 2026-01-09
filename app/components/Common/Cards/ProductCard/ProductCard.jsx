import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function ProductCard({ item }) {
  return (
    <div className="border p-3 border-gray-100 hover:shadow-lg transition duration-300 relative
      h-[520px] flex flex-col">


      {/* Image */}
      <Link 
      href={"/products/1"}
      className="w-full h-[270px] relative mb-4">
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
          <button className="px-8 py-2 bg-[#1d81b3] text-white rounded-full font-semibold hover:bg-blue-700 transition ">
            + Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
