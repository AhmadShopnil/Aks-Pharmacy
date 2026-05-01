"use client";

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
    <div className="w-full py-2 md:py-4 md:mt-8">
      <div className="relative w-full">

        {/* Navigation Buttons */}
        <button
          className="absolute left-1 md:left-3 top-1/2 -translate-y-1/2 z-30 bg-white p-2 md:p-3 rounded-full shadow hover:scale-110 transition"
          id="discount-prev"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        <button
          className="absolute right-1 md:right-3 top-1/2 -translate-y-1/2 z-30 bg-white p-2 md:p-3 rounded-full shadow hover:scale-110 transition"
          id="discount-next"
        >
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: "#discount-prev",
            nextEl: "#discount-next",
          }}
          spaceBetween={12}
          loop={true}
          breakpoints={{
            0: { slidesPerView: 1.2 },   // small mobile
            480: { slidesPerView: 1.5 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {offersSlider?.map((item, index) => (
            <SwiperSlide key={index}>
              <Link
                href={`/offers/${item?.slug}`}
                className="block group"
              >
                {/* Image Wrapper with fixed ratio */}
                <div className="relative w-full aspect-[5/3] overflow-hidden  ">
                  <Image
                    src={item?.image}
                    alt={item?.name || "Offer"}
                    fill
                    sizes="(max-width: 640px) 100vw,
                           (max-width: 1024px) 50vw,
                           (max-width: 1280px) 23vw,
                           25vw"
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}