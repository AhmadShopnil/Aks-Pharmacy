"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";





const brandsData = [
    {
        id: 1,
        name: "ACI Pharma",
        image: "/images/brands/aci.png"
    },
    {
        id: 2,
        name: "Beximco Pharma",
        image: "/images/brands/b.png"
    },
    {
        id: 3,
        name: "Mamaearth",
        image: "/images/brands/m.png"
    },

    {
        id: 5,
        name: "Renata Limited",
        image: "/images/brands/retina.png"
    },
    {
        id: 6,
        name: "	Nova Labs",
        image: "/images/brands/nova.png"
    }
];


export default function BrandSlider({ brands }) {

    return (
        <section className="w-full py-6 md:py-10 ">
            <div className="max-w-7xl mx-auto px-4">

                <h2 className="font-bold text-xl md:text-2xl lg:text-3xl text-[#8CC540]  mb-3 md: mb-5 text-center uppercase">
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
                                slidesPerView: 2,
                            },
                            640: {
                                slidesPerView: 3,
                            },
                            768: {
                                slidesPerView: 4,
                            },
                            1024: {
                                slidesPerView: 5,
                            },
                        }}
                    >
                        {brands?.map((brand) => (
                            <SwiperSlide key={brand?.id}>
                                <div className="h-[200px] flex flex-col items-center justify-center bg-gray-50 rounded-xl border-b-2 hover:shadow-md
                                 transition">
                                    <Image
                                        src={brand?.icon}
                                        alt={brand?.name}
                                        width={240}
                                        height={150}
                                        className="object-contain h-[150px] "
                                        loading="lazy"
                                    />
                                    <span className="bg-gray-200 px-2 md:px-4 py-1 rounded-sm mt-2 font-semibold text-xs md:sm
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
