"use client"

import { Star } from "lucide-react"

export default function RatingAndReviews() {
  const ratingDistribution = [
    { stars: 5, count: 0 },
    { stars: 4, count: 0 },
    { stars: 3, count: 0 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 },
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Rating & Reviews</h2>

      <div className="flex items-start gap-8 mb-8">
        {/* Overall Rating */}
        <div className="flex flex-col items-center">
          <div className="text-4xl font-bold text-gray-900">0/5</div>
          <div className="flex gap-1 my-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} className="text-gray-300" />
            ))}
          </div>
          <span className="text-xs text-gray-500">0 Ratings</span>
        </div>

        {/* Rating Distribution */}
        <div className="flex-1 space-y-3">
          {ratingDistribution.map((item) => (
            <div key={item.stars} className="flex items-center gap-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < item.stars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
              <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-400" style={{ width: "0%" }} />
              </div>
              <span className="text-xs text-gray-500">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review Filters and Message */}
      <div className="border-t pt-4">
        <p className="text-gray-500 text-center text-sm">No reviews found</p>
      </div>
    </div>
  )
}
