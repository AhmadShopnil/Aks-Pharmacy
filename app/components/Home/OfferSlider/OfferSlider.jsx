"use client"

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function OfferSlider() {
  const slides = [
    "/images/promotions/2.png",
    "/images/promotions/3.png",
    "/images/promotions/4.png",
    "/images/promotions/5.png",
  ];

  return (
    <div className="w-full py-3 lg:py-6 ">
      <h3 className="font-bold text-2xl md:text-3xl text-center mb-2.5 sm:mb-4 md:mb-6">
        Especially For You
      </h3>
      <div className="relative w-full">

        {/* Custom Navigation Buttons */}
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-white p-1 md:p-3 rounded-full shadow-lg hover:scale-110 transition"
          id="discount-prev"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-white p-1 md:p-3 rounded-full shadow-lg hover:scale-110 transition"
          id="discount-next"
        >
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        <Swiper
          modules={[Navigation]}
          navigation={{ prevEl: '#discount-prev', nextEl: '#discount-next' }}
          spaceBetween={20}
          slidesPerView={2}
          loop={true}
          breakpoints={{
            400: { slidesPerView: 2 },   // Mobile: 2 slides
            640: { slidesPerView: 2 },   // Small tablets: 2 slides
            768: { slidesPerView: 3 },   // Tablets: 3 slides
            1024: { slidesPerView: 3 },  // Desktop: 3 slides
            1280: { slidesPerView: 4 },  // Large screens: 4 slides
          }}
          className="w-full"
        >
          {slides?.map((img, index) => (
            <SwiperSlide key={index}>
              <Image
                src={img}
                alt="Discount Item"
                width={500}
                height={250}
                className="w-full lg:w-[400px] h-auto object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
