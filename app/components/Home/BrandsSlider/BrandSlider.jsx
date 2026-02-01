"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";




// data/brands.js
export const brands = [
    { id: 1, name: "Shwapno", image: "/images/items/apple-icon.png" },
    { id: 2, name: "ACI", image: "/images/items/28.webp" },
    { id: 3, name: "Unilever", image: "/images/items/apple-icon.png" },
    { id: 4, name: "Reckitt", image: "/images/items/9.jpg" },
    { id: 5, name: "Nestle", image: "/images/items/apple-icon.png" },
    { id: 6, name: "Marico", image: "/images/items/apple-icon.png" },
];



export default function BrandSlider() {
    return (
        <section className="w-full py-6 md:py-10 ">
            <div className="max-w-7xl mx-auto px-4">

                <h2 className="text-2xl md:text-3xl font-semibold text-center mb-3  md:mb-8">
                    Popular Brands
                </h2>

                <div className="relative">
                    <Swiper
                        modules={[Autoplay, Navigation]}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        navigation={{
                            nextEl: ".brand-next",
                            prevEl: ".brand-prev",
                        }}
                        loop={true}
                        spaceBetween={20}
                        breakpoints={{
                            0: {
                                slidesPerView: 2, // minimum 2 on mobile ✅
                            },
                            640: {
                                slidesPerView: 3,
                            },
                            768: {
                                slidesPerView: 4,
                            },
                            1024: {
                                slidesPerView: 6,
                            },
                        }}
                    >
                        {brands.map((brand) => (
                            <SwiperSlide key={brand.id}>
                                <div className="h-auto  flex flex-col items-center justify-center bg-gray-50 rounded-xl border-b-2 hover:shadow-md
                                 transition">
                                    <Image
                                        src={brand.image}
                                        alt={brand.name}
                                        width={240}
                                        height={70}
                                        className="object-contain  "
                                        loading="lazy"
                                    />
                                    <span className="bg-gray-200 px-2 md:px-10 py-1 rounded-sm mt-2 font-semibold text-xs md:sm
                                    lg:text-base
                                    ">{brand?.name}</span>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Navigation Buttons */}
                    <button className="brand-prev absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition">
                        ❮
                    </button>

                    <button className="brand-next absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition">
                        ❯
                    </button>
                </div>

            </div>
        </section>
    );
}
