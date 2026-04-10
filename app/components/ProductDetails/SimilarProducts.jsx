"use client";
import React, { useMemo, useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useGetProductsByCategoryQuery } from "@/lib/redux/services/productsApi";
import ProductCardMain from "../Common/Cards/ProductCard/ProductCardMain";

import "swiper/css";
import "swiper/css/navigation";
import SmallProductCard from "../Common/Cards/ProductCard/SmallProductCard";

export default function SimilarProducts({ productDetails }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [init, setInit] = useState(false);

  // Extract category slug from WP-style 'terms' or 'categories' array
  const categorySlug = useMemo(() => {
    if (!productDetails) return "medicine";
    if (Array.isArray(productDetails.categories) && productDetails.categories[0]?.slug) {
      return productDetails.categories[0].slug;
    }
    if (Array.isArray(productDetails.terms)) {
      const cat = productDetails.terms.find(t => t.taxonomy === "category" || t.taxonomy === "product_categories");
      if (cat?.slug) return cat.slug;
    }
    return "medicine";
  }, [productDetails]);

  const { data, isLoading, isError } = useGetProductsByCategoryQuery(categorySlug, {
    skip: !categorySlug
  });

  useEffect(() => {
    setInit(true);
  }, []);

  if (isLoading) {
    return (
      <div className="rounded-lg p-4 md:p-6 bg-[#8ac74038] animate-pulse">
        <div className="h-6 w-48 bg-white/50 rounded mb-4"></div>
        <div className="flex gap-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="w-40 h-[260px] bg-white rounded-lg border border-gray-200 shrink-0"></div>
          ))}
        </div>
      </div>
    );
  }

  if (isError || !data?.data?.length) return null;

  // Use the original API structure, just filter and slice
  const products = data.data
    .filter(item => item.id !== productDetails?.id)
    .slice(0, 10);

  if (products.length === 0) return null;

  return (
    <div className=" p-4 md:p-6 bg-[#8ac74038]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-[#0784BB]">
          Similar Products
        </h2>
        <Link
          href={`/shop/${categorySlug}`}
          className="text-[#0784BB] hover:text-[#0673a3] text-xl font-semibold transition-colors"
        >
          See all
        </Link>
      </div>

      {/* Slider */}
      <div className="relative w-full">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView="auto"
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={(swiper) => {
            // Re-assign navigation elements once initiated
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          className="py-2 px-1" // Add slight padding to prevent box-shadow clipping
        >
          {products?.map((product) => (
            <SwiperSlide key={product.id} className="!w-[160px] md:!w-[220px] h-auto flex">
              <SmallProductCard item={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Overlays */}
        <button
          ref={prevRef}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all text-gray-600 hover:text-[#0784BB] z-10 hidden md:flex cursor-pointer"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          ref={nextRef}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all text-gray-600 hover:text-[#0784BB] z-10 hidden md:flex cursor-pointer"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
