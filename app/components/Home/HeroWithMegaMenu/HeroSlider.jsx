"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function HeroSlider({ heroSliders }) {
  return (
    <div className="w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop
        className="w-full aspect-[1440/400] overflow-hidden"
      >
        {heroSliders?.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={item?.featured_image}
                alt="Hero Slide"
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}