"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"

export default function FrequentlyBoughtTogether() {
  const scrollContainer = useRef(null)

  const products = [
    { id: 1, name: "E-Cap 400", price: "৳500", image: "/images/items/15.jpg" },
    { id: 2, name: "Karboyna Joint Care", price: "৳650", image: "/images/items/4.jpg" },
    { id: 3, name: "Za-Marks 100", price: "৳700", image: "/images/items/5.jpg" },
    { id: 4, name: "Flax Reminder by Dr", price: "৳800", image: "/images/items/6.jpg" },
    { id: 5, name: "Unflavil Handmade Soaps", price: "৳450", image: "/images/items/7.jpg" },
    { id: 6, name: "BeauFul Soap Ultimate Care", price: "৳900", image: "/images/items/8.jpg" },
    { id: 7, name: "E-Cap 400", price: "৳500", image: "/images/items/15.jpg" },
    { id: 8, name: "Karboyna Joint Care", price: "৳650", image: "/images/items/4.jpg" },
    { id: 9, name: "Za-Marks 100", price: "৳700", image: "/images/items/5.jpg" },
    { id: 10, name: "Flax Reminder by Dr", price: "৳800", image: "/images/items/6.jpg" },
    { id: 11, name: "Unflavil Handmade Soaps", price: "৳450", image: "/images/items/7.jpg" },
    { id: 12, name: "BeauFul Soap Ultimate Care", price: "৳900", image: "/images/items/8.jpg" },
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
    <div className="bg-blue-100 rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Bought Together</h2>

      <div className="relative">
        <div ref={scrollContainer} className="flex gap-4 overflow-x-auto pb-4 scroll-smooth">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-40 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
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
