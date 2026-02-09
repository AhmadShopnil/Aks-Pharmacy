// "use client"

// import { ChevronLeft, ChevronRight } from "lucide-react"
// import { useRef, useEffect } from "react"
// import { Swiper, SwiperSlide } from "swiper/react"
// import { Navigation } from "swiper/modules"

// import "swiper/css"
// import "swiper/css/navigation"

// export default function SimilarProducts() {
//   const prevRef = useRef(null)
//   const nextRef = useRef(null)
//   const swiperRef = useRef(null)

//   const products = [
//     { id: 1, name: "FitX-4", price: "৳500", image: "/images/items/17.jpg" },
//     { id: 2, name: "Himalaya Lasuna", price: "৳600", image: "/images/items/18.jpg" },
//     { id: 3, name: "Neurozest NAC Supplement", price: "৳700", image: "/images/items/19.jpg" },
//     { id: 4, name: "Zatura Vitl D Ginseng Capsule", price: "৳800", image: "/images/items/20.jpg" },
//     { id: 5, name: "NOW Supplements Fenugreek", price: "৳900", image: "/images/items/21.jpg" },
//     { id: 6, name: "Bronson Milk Thistle Organic", price: "৳1000", image: "/images/items/22.jpg" },
//   ] 

//   useEffect(() => {
//     if (swiperRef.current && prevRef.current && nextRef.current) {
//       swiperRef.current.params.navigation.prevEl = prevRef.current
//       swiperRef.current.params.navigation.nextEl = nextRef.current

//       swiperRef.current.navigation.destroy()
//       swiperRef.current.navigation.init()
//       swiperRef.current.navigation.update()
//     }
//   }, [])

//   return (
//     <div className="bg-[#8ac74038] rounded-lg p-6 mb-6">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-xl font-bold text-gray-900">
//           Similar Products
//         </h2>
//         <a
//           href="#"
//           className="text-teal-600 hover:text-teal-700 font-semibold text-sm"
//         >
//           See all
//         </a>
//       </div>

//       <div className="relative">
//         <Swiper
//           modules={[Navigation]}
//           spaceBetween={16}
//           slidesPerView="auto"
//           onSwiper={(swiper) => (swiperRef.current = swiper)}
//         >
//           {products.map((product) => (
//             <SwiperSlide key={product.id} className="!w-40">
//               <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
//                 <div className="aspect-square bg-gray-100 overflow-hidden">
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>

//                 <div className="p-3">
//                   <p className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2">
//                     {product.name}
//                   </p>

//                   <div className="flex items-center justify-between">
//                     <span className="text-sm font-bold text-gray-900">
//                       {product.price}
//                     </span>
//                     <button className="bg-teal-100 hover:bg-teal-200 text-teal-700 text-xs font-semibold px-2 py-1 rounded">
//                       Add
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         {/* Navigation Buttons */}
//         <button
//           ref={prevRef}
//           className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md hover:shadow-lg z-10"
//         >
//           <ChevronLeft size={20} />
//         </button>

//         <button
//           ref={nextRef}
//           className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md hover:shadow-lg z-10"
//         >
//           <ChevronRight size={20} />
//         </button>
//       </div>
//     </div>
//   )
// }
