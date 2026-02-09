// "use client"

// import { ChevronLeft, ChevronRight } from "lucide-react"
// import { useRef, useEffect } from "react"
// import { Swiper, SwiperSlide } from "swiper/react"
// import { Navigation } from "swiper/modules"

// import "swiper/css"
// import "swiper/css/navigation"

// export default function MoreProducts() {
//     const prevRef = useRef(null)
//     const nextRef = useRef(null)
//     const swiperRef = useRef(null)

//     const products = [
//         { id: 1, name: "X Gold Black Maca", price: "৳1200", image: "/images/items/9.jpg" },
//         { id: 2, name: "X Gold Ashwagandha Extract", price: "৳1500", image: "/images/items/10.jpg" },
//         { id: 3, name: "X Gold Tongkat Ali 100:1", price: "৳1800", image: "/images/items/11.jpg" },
//         { id: 4, name: "X Gold Ginseng Premium", price: "৳2000", image: "/images/items/12.jpg" },
//         { id: 7, name: "E-Cap 400", price: "৳500", image: "/images/items/15.jpg" },
//         { id: 8, name: "Karboyna Joint Care", price: "৳650", image: "/images/items/4.jpg" },
//         { id: 9, name: "Za-Marks 100", price: "৳700", image: "/images/items/5.jpg" },
//         { id: 10, name: "Flax Reminder by Dr", price: "৳800", image: "/images/items/6.jpg" },
//         { id: 11, name: "Unflavil Handmade Soaps", price: "৳450", image: "/images/items/7.jpg" },
//         { id: 12, name: "BeauFul Soap Ultimate Care", price: "৳900", image: "/images/items/8.jpg" },
//     ]

//     // 🔑 This is the magic
//     useEffect(() => {
//         if (
//             swiperRef.current &&
//             prevRef.current &&
//             nextRef.current
//         ) {
//             swiperRef.current.params.navigation.prevEl = prevRef.current
//             swiperRef.current.params.navigation.nextEl = nextRef.current

//             swiperRef.current.navigation.destroy()
//             swiperRef.current.navigation.init()
//             swiperRef.current.navigation.update()
//         }
//     }, [])

//     return (
//         <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">
//                 More from X Gold
//             </h2>

//             <div className="relative">
//                 <Swiper
//                     modules={[Navigation]}
//                     spaceBetween={16}
//                     slidesPerView="auto"
//                     onSwiper={(swiper) => (swiperRef.current = swiper)}
//                 >
//                     {products.map((product) => (
//                         <SwiperSlide key={product.id} className="!w-40">
//                             <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
//                                 <div className="aspect-square bg-gray-100 overflow-hidden">
//                                     <img
//                                         src={product.image}
//                                         alt={product.name}
//                                         className="w-full h-full object-cover"
//                                     />
//                                 </div>

//                                 <div className="p-3">
//                                     <p className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2">
//                                         {product.name}
//                                     </p>

//                                     <div className="flex items-center justify-between">
//                                         <span className="text-sm font-bold text-gray-900">
//                                             {product.price}
//                                         </span>
//                                         <button className="bg-teal-100 hover:bg-teal-200 text-teal-700 text-xs font-semibold px-2 py-1 rounded">
//                                             Add
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </SwiperSlide>
//                     ))}
//                 </Swiper>

//                 {/* Navigation Buttons (unchanged UI) */}
//                 <button
//                     ref={prevRef}
//                     className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md hover:shadow-lg z-10"
//                 >
//                     <ChevronLeft size={20} />
//                 </button>

//                 <button
//                     ref={nextRef}
//                     className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md hover:shadow-lg z-10"
//                 >
//                     <ChevronRight size={20} />
//                 </button>
//             </div>
//         </div>
//     )
// }
