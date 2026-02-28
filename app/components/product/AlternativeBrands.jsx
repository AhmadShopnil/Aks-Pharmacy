import { BASE_URL } from "@/lib/baseUrl"
import { ChevronDown, CheckCircle, Smartphone, SlidersHorizontal } from "lucide-react"
import Link from "next/link"

async function getAlternatives(generic_name) {
  if (!generic_name) return []

  try {
    const res = await fetch(
      `${BASE_URL}/products/by-generic/${generic_name}`,
      {
        next: { revalidate: 30 }
      }
    )

    const data = await res.json()

    if (!data.success) return []

    return data.data.map(item => ({
      id: item.id,
      name: item.name,
      slug: item?.slug,
      manufacturer: item.author_name || "Unknown",
      image: item?.featured_image || "/product/placeholder.png",
      price: item.price || 0,
      save: item.discount || null,
      inStock: item.stock > 0
    }))
  } catch (error) {
    return []
  }
}

export default async function AlternativeBrands({ generic_name }) {
  const alternatives = await getAlternatives(generic_name)
  console.log("alternatives", alternatives)

  return (
    <div className="bg-white rounded-sm border border-gray-200 flex flex-col overflow-hidden">

      {/* Header */}
      <div className="px-4 mt-3 border-b border-gray-50 flex items-center justify-between bg-gray-50/50 ">
        <h3 className="font-semibold text-gray-800 text-sm md:text-lg">
          Alternatives for {generic_name}
        </h3>
        {generic_name && (
          <Link
            href={`/generic/${encodeURIComponent(generic_name)}`}
            className="text-sm md:text-base font-semibold text-[#0784BB] hover:underline"
          >
            View All
          </Link>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto max-h-[500px] scrollbar-hide px-4 py-1">

        {alternatives.length === 0 ? (
          <p className="text-center text-sm text-gray-400 py-4">
            No alternatives found
          </p>
        ) : (
          alternatives.map((item) => (
            <Link
              key={item.id}
              href={`/product/${item?.slug}`}
              className="px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-blue-50/30 transition-all group cursor-pointer 
              "
            >
              <div className="flex gap-2 items-center ">

                {/* Image */}
                {/* <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center border border-gray-100 group-hover:border-[#0784BB]/20 transition-all overflow-hidden shrink-0">
                  <img
                    src={item?.featured_image}
                    alt={item?.name}
                    className="w-10 h-10 object-contain p-1"
                  />
                </div> */}

                {/* Info */}
                <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                  <div className="flex items-center gap-1 md:gap-2">
                    <CheckCircle size={16} className="text-[#8CC540] shrink-0" />
                    <h4 className="text-sm md:text-base font-semibold text-gray-800 group-hover:text-[#0784BB] truncate">
                      {item?.name}
                    </h4>
                  </div>
                  {/* <p className="text-[10px] text-gray-400 font-bold truncate">
                    BY {item.manufacturer?.toUpperCase()}
                  </p> */}
                </div>

                {/* Price */}
                {/* <div className="text-right flex flex-col items-end shrink-0 ml-1">
                  <span className="text-xs font-bold text-gray-900">
                    ৳{item.price}
                  </span>

                  {item.inStock ? (
                    item.save ? (
                      <span className="text-[10px] text-[#8CC540] font-bold bg-green-50 px-1 py-0.5 rounded-sm mt-0.5">
                        SAVE {item.save}%
                      </span>
                    ) : null
                  ) : (
                    <span className="text-[10px] text-red-500 font-bold uppercase mt-0.5">
                      STOCK OUT
                    </span>
                  )}
                </div> */}
              </div>
            </Link>
          ))
        )}
      </div>

      {/* App Promo */}
      <div className="p-4 bg-[#0784BB] text-white">
        <div className="flex items-center gap-3">
          <div className="bg-white/10 p-2 rounded-md backdrop-blur-md">
            <Smartphone size={18} />
          </div>
          <div>
            <p className="text-xs font-bold tracking-wide uppercase">
              Order on App
            </p>
            <p className="text-[11px] text-blue-100 font-semibold underline cursor-pointer">
              GET 10% EXTRA DISCOUNT
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}