"use client"

import { useState } from "react"
import { Heart } from "lucide-react"

export default function ProductImageGallery() {
  const [mainImage, setMainImage] = useState(0)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const [isZooming, setIsZooming] = useState(false)

  const images = [
    "/images/items/13.jpg",
    "/images/items/14.jpg",
    "/images/items/15.jpg",
    "/images/items/16.jpg",
  ]

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setZoomPosition({ x, y })
    setIsZooming(true)
  }

  const handleMouseLeave = () => {
    setIsZooming(false)
  }

  return (
    <div className="flex gap-4">
      {/* Left Thumbnail Gallery */}
      <div className="flex flex-col gap-3">
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setMainImage(idx)}
            className={`relative w-20 h-24 cursor-pointer border-2 rounded transition-all ${
              mainImage === idx ? "border-teal-500" : "border-gray-300"
            }`}
          >
            <img
              src={img || "/placeholder.svg"}
              alt={`Medicine bottle ${idx + 1}`}
              className="w-full h-full object-cover rounded"
            />
          </div>
        ))}
      </div>

      {/* Main Image with Zoom */}
      <div className="flex-1 relative">
        <div
          className="relative w-full h-96 bg-white border border-gray-200 rounded-lg overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={images[mainImage] || "/placeholder.svg"}
            alt="Main product"
            className={`w-full h-full object-contain transition-transform duration-300 ${
              isZooming ? "scale-150" : "scale-100"
            }`}
            style={
              isZooming
                ? {
                    transformOrigin: `${(zoomPosition.x / 384) * 100}% ${(zoomPosition.y / 384) * 100}%`,
                  }
                : {}
            }
          />

          {/* Heart Icon */}
          <button className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100">
            <Heart size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
