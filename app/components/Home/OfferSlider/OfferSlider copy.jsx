"use client"

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function OfferSlider({ offersSlider }) {




  return (
    <div className="w-full py-2 md:py-3 lg:py-4 md:mt-8  ">
      {/* <h3 className="font-bold text-xl md:text-2xl lg:text-3xl text-[#8CC540]  mb-3 md: mb-4 uppercase">
        Especially For You
      </h3> */}
      <div className="relative w-full  ">

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
            768: { slidesPerView: 2 },   // Tablets: 3 slides
            1024: { slidesPerView: 3 },  // Desktop: 3 slides
            1380: { slidesPerView: 4 },  // Large screens: 4 slides
          }}
          className="w-full"
        >
          {offersSlider?.map((item, index) => (
            <SwiperSlide key={index}>
              <Link href={`/offers/${item?.slug}`} className="block overflow-hidden transition-transform hover:scale-[1.02] w-[400px] h-[300px]">
                <Image
                  src={item?.image}
                  alt={item?.name || "Discount Item"}
                  width={500}
                  height={300}
                  className="w-full  h-auto object-cover "
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
