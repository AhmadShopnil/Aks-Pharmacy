"use client"
import { ChevronDown, CheckCircle, Smartphone, SlidersHorizontal } from 'lucide-react'

export default function AlternativeBrands({ alternatives, productName }) {
  return (
    <div className="bg-white rounded-md border border-gray-100 shadow-sm flex flex-col overflow-hidden">
      <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
        <h3 className="font-semibold text-gray-800 text-sm md:text-lg  ">Alternatives for {productName}</h3>
        <button className="flex items-center gap-1 border border-gray-200 rounded-md px-2 py-1
        text-sm md:text-sm font-semibold  text-[#0784BB] bg-white hover:border-[#0784BB]/30 transition-all">
          <SlidersHorizontal size={10} /> Sort By <ChevronDown size={10} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto max-h-[500px] scrollbar-hide py-1">
        {alternatives?.map((item, idx) => (
          <div key={idx} className="px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-blue-50/30 transition-all group cursor-pointer">
            <div className="flex gap-3 items-center">
              <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center border border-gray-100 group-hover:border-[#0784BB]/20 transition-all overflow-hidden shrink-0">
                <img src={item.image || "/products/placeholder.png"} alt={item.name} className="w-10 h-10 object-contain p-1" />
              </div>
              <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                <div className="flex items-center gap-1">
                  <CheckCircle size={10} className="text-[#8CC540] shrink-0" />
                  <h4 className="text-sm md:text-base  font-semibold text-gray-800 group-hover:text-[#0784BB] truncate">{item.name}</h4>
                </div>
                <p className="text-[9px] text-gray-400 font-bold truncate">BY {item.manufacturer?.toUpperCase()}</p>
              </div>
              <div className="text-right flex flex-col items-end shrink-0 ml-1">
                <span className="text-xs font-bold text-gray-900">৳{item.price}</span>
                {item.save ? (
                  <span className="text-[9px] text-[#8CC540] font-bold bg-green-50 px-1 py-0.5 rounded-sm mt-0.5">SAVE {item.save}%</span>
                ) : (
                  <span className="text-[8px] text-red-500 font-bold uppercase mt-0.5 tracking-tighter">STOCK OUT</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* App Promo */}
      <div className="p-4 bg-[#0784BB] text-white">
        <div className="flex items-center gap-3">
          <div className="bg-white/10 p-2 rounded-md backdrop-blur-md">
            <Smartphone size={18} />
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-wide uppercase">Order on App</p>
            <p className="text-[9px] text-blue-100 font-semibold underline cursor-pointer">GET 10% EXTRA DISCOUNT</p>
          </div>
        </div>
      </div>
    </div>
  )
}
