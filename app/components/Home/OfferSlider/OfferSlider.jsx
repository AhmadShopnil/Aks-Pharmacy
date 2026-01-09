"use client"


import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function OfferSlider() {
  const slides = [
    "/images/medicine/2.jpg",
    "/images/medicine/3.jpg",
    "/images/medicine/2.jpg",
    "/images/medicine/3.jpg",
    "/images/medicine/2.jpg",
  ];

  return (
   <div className=" w-full py-6">
      <h3 className="font-bold text-2xl md:text-3xl text-center mb-6">Especially For You</h3>
     <div className="relative w-full ">
      
      {/* Custom Navigation Buttons */}
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-white p-3 rounded-full shadow-lg hover:scale-110 transition"
        id="discount-prev"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-white p-3 rounded-full shadow-lg hover:scale-110 transition"
        id="discount-next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <Swiper
        modules={[Navigation]}
        navigation={{ prevEl: '#discount-prev', nextEl: '#discount-next' }}
        spaceBetween={20}
        slidesPerView={4}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="w-full"
      >
        {slides.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-64  overflow-hidden shadow-md">
              <img
                src={img}
                alt="Discount Item"
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
   </div>
  );
}
