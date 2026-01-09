"use client"

import { useState } from "react"
import { Star, ShoppingCart, MessageCircle } from "lucide-react"

export default function ProductInfo() {
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="flex-1">
      {/* Product Title */}
      <h1 className="text-xl font-bold text-gray-900 mb-2">X Gold Strongest Health Maca Ashwagandha 120 Capsules</h1>

      {/* Brand and Rating */}
      <div className="flex items-center gap-4 mb-4">
        <span className="text-sm text-gray-600">X Gold</span>
        <div className="flex items-center gap-1">
          <Star size={16} className="fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-gray-600">0/5 (0 Ratings)</span>
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
        <p className="text-xs text-red-700 font-semibold">৳ 100 Capsules (1 jar) = ৳ 950 tk</p>
      </div>

      {/* Price */}
      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-900">৳ 950</span>
          <span className="text-lg text-gray-500 line-through">৳ 1100</span>
          <span className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded font-semibold">-14%</span>
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-gray-700 font-semibold">Quantity:</span>
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-2 text-gray-600 hover:bg-gray-100"
          >
            -
          </button>
          <span className="px-4 py-2 border-l border-r border-gray-300">{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 text-gray-600 hover:bg-gray-100">
            +
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-lg mb-4 flex items-center justify-center gap-2">
        <ShoppingCart size={20} />
        Add to Cart
      </button>

      {/* Chat Button */}
      <button className="w-full border-2 border-teal-500 text-teal-500 hover:bg-teal-50 font-semibold py-2 rounded-lg flex items-center justify-center gap-2 mb-6">
        <MessageCircle size={20} />
        Ask for Medicine
      </button>

      {/* Additional Offers */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-bold text-gray-900 mb-3">Additional Offers</h3>
        <div className="space-y-2">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-orange-600 text-sm font-bold">🎁</span>
            </div>
            <div className="text-sm">
              <p className="font-semibold text-gray-900">Combo Offer</p>
              <p className="text-gray-600 text-xs">Get 15% off when buying items</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-pink-600 text-sm font-bold">💝</span>
            </div>
            <div className="text-sm">
              <p className="font-semibold text-gray-900">First Order</p>
              <p className="text-gray-600 text-xs">Get 20% discount on your first order</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
