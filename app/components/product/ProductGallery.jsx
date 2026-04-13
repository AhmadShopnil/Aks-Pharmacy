"use client"
import { useState, useRef, useMemo } from "react"
import { Heart, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

export default function ProductGallery({ gallery_images = [] }) {
  // Convert API format → ["url1", "url2"]
  const images = useMemo(
    () => gallery_images?.map(img => img?.file_url),
    [gallery_images]
  )

  const [activeIndex, setActiveIndex] = useState(0)
  const [isZooming, setIsZooming] = useState(false)
  const [zoomStyle, setZoomStyle] = useState({})
  const containerRef = useRef(null)

  const activeImage = images[activeIndex]

  const handleMouseMove = (e) => {
    if (!containerRef.current || !activeImage) return

    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect()

    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100

    setZoomStyle({
      backgroundPosition: `${x}% ${y}%`,
      backgroundImage: `url(${activeImage})`,
      backgroundSize: "200%",
    })
  }

  const selectImage = (index) => {
    setActiveIndex(index)
  }

  const next = () => {
    if (!images.length) return
    setActiveIndex((prev) => (prev + 1) % images.length)
  }

  const prev = () => {
    if (!images.length) return
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  if (!images.length) return null

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="relative flex flex-col md:flex-row gap-4 bg-white rounded-sm p-2 border border-gray-200 ">

        {/* Desktop Thumbnails */}
        <div className="hidden md:flex flex-col gap-3 min-w-[70px]">
          {images?.map((img, i) => (
            <button
              key={i}
              onMouseEnter={() => selectImage(i)}
              className={`relative w-16 h-16 border-2 rounded-md overflow-hidden transition-all duration-300 ${
                activeIndex === i
                  ? "border-[#0784BB] scale-105"
                  : "border-gray-50 opacity-50 hover:opacity-100"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-contain" />
            </button>
          ))}
        </div>

        {/* Main Image */}
        <div
          ref={containerRef}
          onMouseEnter={() => setIsZooming(true)}
          onMouseLeave={() => setIsZooming(false)}
          onMouseMove={handleMouseMove}
          className="relative flex-1 flex items-center justify-center overflow-hidden rounded-md bg-white  w-full aspect-square"
        >
          {/* <Image
            src={activeImage}
            alt="Product"
            width={620}
            height={500}
            className={`transition-all duration-500 ${
              isZooming ? "opacity-0" : "opacity-100"
            }`}
          /> */}

            <Image
            src={activeImage}
            alt="Product"
           fill
            className={`object-cover  transition-all duration-500 ${
              isZooming ? "opacity-0" : "opacity-100"
            }`}
          />


      



          {/* Zoom Layer */}
          {isZooming && (
            <div
              className="absolute inset-0 z-10 pointer-events-none bg-no-repeat"
              style={zoomStyle}
            />
          )}

          {/* Navigation */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow"
          >
            <ChevronRight size={18} />
          </button>

          {/* Badges */}
          {/* <div className="absolute top-3 left-3">
            <div className="bg-[#0784BB] text-white px-3 py-1.5 rounded-md flex items-center gap-2 text-[10px] font-bold shadow-md">
              <Clock size={12} className="animate-pulse" />
              12-24 HRS DELIVERY
            </div>
          </div> */}

          <button className="absolute top-3 right-3 p-2.5 bg-white rounded-md shadow-md text-gray-300 hover:text-red-500">
            <Heart size={20} />
          </button>
        </div>

        {/* Mobile Thumbnails */}
        <div className="flex md:hidden gap-3 overflow-x-auto pb-2">
          {images?.map((img, i) => (
            <button
              key={i}
              onClick={() => selectImage(i)}
              className={`min-w-[65px] h-16 border-2 rounded-md ${
                activeIndex === i
                  ? "border-[#0784BB]"
                  : "border-gray-50"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-contain p-2" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}