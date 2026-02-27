import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ProductCardShop({ item }) {
  return (
    <div className="relative flex h-[420px] flex-col border border-gray-200 transition hover:shadow-lg">

      {/* Image */}
      <Link
        href={`/product/${item.id ?? 1}`}
        className="relative mb-4 h-[250px] w-full overflow-hidden"
      >
        <Image
          src={item.img}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 250px"
          className="object-cover transition-transform duration-300 hover:scale-105"
          priority={false}
        />
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col px-4 pb-4">

        {/* Title */}
        <Link
          href={`/product/${item.id ?? 1}`}
          className="mb-1 text-center text-base font-semibold line-clamp-2">
          {item.title}
        </Link>

        {/* Rating */}
        <div className="mb-2 text-center text-xl text-yellow-500">
          {Array.from({ length: item.rating || 0 }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>

        {/* Pricing */}
        <div className="mb-4 text-center">
          {item.oldPrice && (
            <span className="mr-2 text-sm text-gray-400 line-through">
              {item.oldPrice}
            </span>
          )}
          <span className="font-bold text-pink-600">
            {item.price}
          </span>
        </div>

        {/* Button */}
        <div className="mt-auto flex justify-center">
          <button
            className="rounded-full bg-[#1d81b3] px-8 py-2 font-semibold text-white transition hover:bg-blue-700 active:scale-95 cursor-pointer"
            aria-label={`Add ${item.title} to cart`}
          >
            + Add to cart
          </button>
        </div>

      </div>
    </div>
  );
}
