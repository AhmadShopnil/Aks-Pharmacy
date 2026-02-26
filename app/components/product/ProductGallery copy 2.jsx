// "use client"
// import { useState, useRef } from 'react'
// import { Heart, Clock, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
// import Image from 'next/image'

// export default function ProductGallery({ images,gallery_images }) {
//   const [activeImage, setActiveImage] = useState(images[0])
//   const [isZooming, setIsZooming] = useState(false)
//   const [zoomStyle, setZoomStyle] = useState({})
//   const containerRef = useRef(null)
//   const [activeIndex, setActiveIndex] = useState(0)

//   const handleMouseMove = (e) => {
//     if (!containerRef.current) return
//     const { left, top, width, height } = containerRef.current.getBoundingClientRect()
//     const x = ((e.clientX - left) / width) * 100
//     const y = ((e.clientY - top) / height) * 100

//     setZoomStyle({
//       backgroundPosition: `${x}% ${y}%`,
//       backgroundImage: `url(${activeImage})`,
//       backgroundSize: '200%',
//     })
//   }

//   const selectImage = (img, index) => {
//     setActiveImage(img)
//     setActiveIndex(index)
//   }

//   const next = () => {
//     const i = (activeIndex + 1) % images.length
//     selectImage(images[i], i)
//   }
//   const prev = () => {
//     const i = (activeIndex - 1 + images.length) % images.length
//     selectImage(images[i], i)
//   }

//   return (
//     <div className="flex flex-col gap-6 w-full">
//       <div className="relative flex flex-col md:flex-row gap-4 bg-white rounded-md p-2 border border-gray-100 shadow-sm transition-all duration-300">

//         {/* Thumbnails Sidebar */}
//         <div className="hidden md:flex flex-col gap-3 min-w-[70px]">
//           {images?.map((img, i) => (
//             <button
//               key={i}
//               onMouseEnter={() => selectImage(img, i)}
//               className={`relative w-16 h-16 border-2 rounded-md overflow-hidden transition-all duration-300 ${activeIndex === i
//                 ? 'border-[#0784BB] scale-105'
//                 : 'border-gray-50 opacity-50 hover:opacity-100 hover:border-[#0784BB]/30'
//                 }`}
//             >
//               <img src={img} alt="" className="w-full h-full object-contain " />
//             </button>
//           ))}
//         </div>

//         {/* Main Image Viewport */}
//         <div
//           ref={containerRef}
//           onMouseEnter={() => setIsZooming(true)}
//           onMouseLeave={() => setIsZooming(false)}
//           onMouseMove={handleMouseMove}
//           className="relative flex-1 flex items-center justify-center cursor-crosshair select-none overflow-hidden rounded-md bg-white h-[350px] md:h-[450px]"
//         >
//           <Image
//             src={activeImage}
//             alt="Product"
//             width={620}
//             height={500}
//             className={`object-fit transition-all duration-500 ${isZooming ? 'opacity-0' : 'opacity-100'}`}
//           />

//           {/* Navigation Controls */}
//           <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none opacity-0 group-hover:opacity-100 md:group-hover:opacity-0 transition-opacity">
//             <button onClick={prev} className="pointer-events-auto p-2 bg-white/90 backdrop-blur rounded-full shadow text-gray-800 hover:bg-[#0784BB] hover:text-white transition-all">
//               <ChevronLeft size={20} />
//             </button>
//             <button onClick={next} className="pointer-events-auto p-2 bg-white/90 backdrop-blur rounded-full shadow text-gray-800 hover:bg-[#0784BB] hover:text-white transition-all">
//               <ChevronRight size={20} />
//             </button>
//           </div>

//           {/* Zoom Overlay */}
//           {isZooming && (
//             <div
//               className="absolute inset-0 z-10 pointer-events-none bg-white bg-no-repeat transition-opacity duration-200"
//               style={zoomStyle}
//             />
//           )}

//           {/* BADGES */}
//           <div className="absolute top-3 left-3">
//             <div className="bg-[#0784BB] text-white px-3 py-1.5 rounded-md flex items-center gap-2 text-[10px] font-bold shadow-md">
//               <Clock size={12} className="animate-pulse" />
//               12-24 HRS DELIVERY
//             </div>
//           </div>

//           <button className="absolute top-3 right-3 p-2.5 bg-white rounded-md shadow-md text-gray-300 hover:text-red-500 transition-all active:scale-90">
//             <Heart size={20} />
//           </button>
//         </div>

//         {/* Mobile Horizontal Thumbnails */}
//         <div className="flex md:hidden gap-3 overflow-x-auto pb-2 scrollbar-none">
//           {images.map((img, i) => (
//             <button
//               key={i}
//               onClick={() => selectImage(img, i)}
//               className={`min-w-[65px] h-16 border-2 rounded-md flex-shrink-0 transition-all ${activeIndex === i ? 'border-[#0784BB]' : 'border-gray-50'
//                 }`}
//             >
//               <img src={img} alt="" className="w-full h-full object-contain p-2" />
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }
