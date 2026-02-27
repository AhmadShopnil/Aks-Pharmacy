"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import Link from "next/link"
import { useAppDispatch } from '@/lib/redux/hooks'
import { addItem } from '@/lib/redux/features/cart/cartSlice'
import { showNotification } from '@/lib/redux/features/ui/uiSlice'

import "swiper/css"
import "swiper/css/navigation"

export default function ProductSlider({
  title,
  products = [],
  showSeeAll = false,
  seeAllHref = "#",
  containerClass = "bg-white",
}) {
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const swiperRef = useRef(null)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      swiperRef.current.params.navigation.prevEl = prevRef.current
      swiperRef.current.params.navigation.nextEl = nextRef.current

      swiperRef.current.navigation.destroy()
      swiperRef.current.navigation.init()
      swiperRef.current.navigation.update()
    }
  }, [])

  const handleAddToCart = (e, product) => {
    e.preventDefault()
    e.stopPropagation()
    if (product.originalItem) {
      dispatch(addItem(product.originalItem))
      dispatch(showNotification({
        message: `${product.originalItem.title} added to cart!`,
        type: 'success'
      }))
    }
  }

  return (
    <div className={`rounded-lg p-4 md:p-6 ${containerClass}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">
          {title}
        </h2>

        {showSeeAll && (
          <Link
            href={seeAllHref}
            className="text-[#0784BB] hover:text-[#0673a3] font-semibold text-sm transition-colors"
          >
            See all
          </Link>
        )}
      </div>

      {/* Slider */}
      <div className="relative">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView="auto"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className="!w-40">
              <Link href={product.slug ? `/products/${product.slug}` : '#'} className="block h-full group">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden
                    group-hover:shadow-[0_4px_20px_-4px_rgba(7,132,187,0.15)] group-hover:border-[#0784BB]/30 transition-all duration-300
                    flex flex-col h-[260px] relative">

                  {/* Image */}
                  <div className="aspect-square bg-white flex items-center justify-center overflow-hidden p-2 group-hover:bg-slate-50 transition-colors">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-3 flex flex-col flex-1 bg-white">
                    {/* Fixed-height title */}
                    <p className="text-sm font-semibold text-gray-800 leading-snug
                      h-[36px] overflow-hidden group-hover:text-[#0784BB] transition-colors">
                      {product.name}
                    </p>

                    {/* Bottom row always aligned */}
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <span className="text-sm font-bold text-[#8CC540]">
                        {product.price}
                      </span>

                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className="bg-[#0784BB] hover:bg-[#044c6b] text-white active:scale-95
                         text-xs font-semibold px-3 py-1.5 rounded-md cursor-pointer transition-all shadow-sm hover:shadow"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation */}
        <button
          ref={prevRef}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all hover:text-[#0784BB] z-10 hidden md:block"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          ref={nextRef}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all hover:text-[#0784BB] z-10 hidden md:block"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}
