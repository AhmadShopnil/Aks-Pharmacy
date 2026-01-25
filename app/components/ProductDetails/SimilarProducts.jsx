"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"

export default function SimilarProducts() {
  const scrollContainer = useRef(null)

  const products = [
    { id: 1, name: "FitX-4", price: "৳500", image: "/images/items/17.jpg", badge: null },
    { id: 2, name: "Himalaya Lasuna", price: "৳600", image: "/images/items/18.jpg", badge: null },
    { id: 3, name: "Neurozest NAC Supplement", price: "৳700", image: "/images/items/19.jpg", badge: null },
    { id: 4, name: "Zatura Vitl D Ginseng Capsule", price: "৳800", image: "/images/items/20.jpg", badge: null },
    { id: 5, name: "NOW Supplements Fenugreek", price: "৳900", image: "/images/items/21.jpg", badge: null },
    { id: 6, name: "Bronson Milk Thistle Organic", price: "৳1000", image: "/images/items/22.jpg", badge: null },
  ]

  const scroll = (direction) => {
    if (scrollContainer.current) {
      const scrollAmount = 300
      scrollContainer.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="bg-[#8ac74038] rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Similar Products</h2>
        <a href="#" className="text-teal-600 hover:text-teal-700 font-semibold text-sm">
          See all
        </a>
      </div>

      <div className="relative">
        <div
          ref={scrollContainer}
          className="flex gap-4 "
          style={{ scrollBehavior: "smooth" }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-40 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {product.badge && (
                <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 w-fit">{product.badge}</div>
              )}
              <div className="aspect-square bg-gray-100 overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2">{product.name}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-900">{product.price}</span>
                  <button className="bg-teal-100 hover:bg-teal-200 text-teal-700 text-xs font-semibold px-2 py-1 rounded">
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Buttons */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md hover:shadow-lg"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md hover:shadow-lg"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}
