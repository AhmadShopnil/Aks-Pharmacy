// import React from "react";

// import { motion, AnimatePresence } from "framer-motion";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Autoplay } from "swiper/modules";


// import "swiper/css";
// import "swiper/css/pagination";

// import Link from "next/link";

// export default function HeroSlider({ heroSliders }) {
//     return (

//         <Swiper
//             modules={[Pagination, Autoplay]}
//             pagination={{ clickable: true }}
//             autoplay={{ delay: 3000 }}
//             loop
//             className="overflow-hidden shadow-sm   h-[150px]  md:h-[280px] lg:h-[320px] xl:h-[416px] "
//         >
//             {heroSliders?.map((item, index) => (
//                 <SwiperSlide key={index}>
//                     <img
//                         src={item?.featured_image}
//                         alt="Hero Slide"
//                         className="w-full h-full object-fit lg:object-cover"
//                     />
//                 </SwiperSlide>
//             ))}
//         </Swiper>

//     )
// }
