"use client"
import { useState } from 'react'

export default function ProductVariants({ variants }) {
  const [selected, setSelected] = useState(variants?.[0]?.label)

  if (!variants?.length) return null

  return (
    <div className="mt-4">
      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">Units Available</label>
      <div className="flex flex-wrap gap-2 mt-1.5">
        {variants.map((v) => (
          <button
            key={v.label}
            onClick={() => setSelected(v.label)}
            className={`px-3 py-1.5 rounded-md text-xs font-bold border-2 transition-all ${selected === v.label
                ? 'border-[#0784BB] bg-blue-50 text-[#0784BB] shadow-sm'
                : 'border-gray-50 bg-white text-gray-400 hover:border-gray-100'
              }`}
          >
            {v.label}
            <span className="block text-[9px] font-medium opacity-60">৳{v.price}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
