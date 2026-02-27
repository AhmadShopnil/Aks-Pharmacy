"use client";

import ProductCardMain from "../../Common/Cards/ProductCard/ProductCardMain";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

export default function WeeklyDealsProductSlider({ section_title, products }) {
  return (
    <section className="w-full p-1">
      <div>
        <h3 className="font-bold text-xl md:text-2xl lg:text-3xl text-[#8CC540]  mb-3 md: mb-4">
          {section_title}
        </h3>

        <div className="relative group">
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            breakpoints={{
              0: {
                slidesPerView: 2,
              },
              640: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
          >
            {products?.map((item) => (
              <SwiperSlide key={item?.id} className="h-auto">
                <ProductCardMain item={item} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* LEFT BUTTON */}
          <button
            className="custom-prev absolute left-2 top-1/2 -translate-y-1/2 z-20
              w-11 h-11 bg-white/90 backdrop-blur-md rounded-full shadow-md
              flex items-center justify-center text-gray-700
              opacity-0 group-hover:opacity-100
              hover:bg-[#0784BB] hover:text-white hover:scale-110
              transition-all duration-300"
          >
            <ChevronLeft size={20} />
          </button>

          {/* RIGHT BUTTON */}
          <button
            className="custom-next absolute right-2 top-1/2 -translate-y-1/2 z-20
              w-11 h-11 bg-white/90 backdrop-blur-md rounded-full shadow-md
              flex items-center justify-center text-gray-700
              opacity-0 group-hover:opacity-100
              hover:bg-[#0784BB] hover:text-white hover:scale-110
              transition-all duration-300"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}