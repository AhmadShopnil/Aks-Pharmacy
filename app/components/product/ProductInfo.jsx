"use client"
import { CheckCircle, Share2, Info, ChevronRight, ShoppingCart, Plus, Minus, Zap, ChevronLeft, Heart } from 'lucide-react'
import { useState } from 'react'
import { useAppDispatch } from '@/lib/redux/hooks'
import { addItem } from '@/lib/redux/features/cart/cartSlice'
import { toggleWishlist, selectIsInWishlist } from '@/lib/redux/features/wishlist/wishlistSlice'
import { showNotification } from '@/lib/redux/features/ui/uiSlice'
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper/modules"
import { useAppSelector } from '@/lib/redux/hooks'
import "swiper/css"
import "swiper/css/navigation"
import { getMetaValueFromExtra_Fields } from '@/helper/metaHelpers'
import Link from 'next/link'

export default function ProductInfo({ product, productDetails }) {
  const [quantity, setQuantity] = useState(1)
  const dispatch = useAppDispatch()
  const isInWishlist = useAppSelector(selectIsInWishlist(product?.id))

  // extract extra infos of product-----

  const varrientInfo = productDetails?.packages?.variations[0]
  const sale_price = varrientInfo?.sale_price
  const display_price = varrientInfo?.display_price
  const stock_quantity = varrientInfo?.stock_quantity
  const stock_status = varrientInfo?.stock_status
  const is_on_sale = varrientInfo?.is_on_sale
  const gallery_images = varrientInfo?.gallery_images
  const featured_image = varrientInfo?.featured_image?.file_url || gallery_images[0]?.file_url

  const sale = Number(sale_price);
  const mrp = Number(display_price);
  const hasValidPrices = !isNaN(sale) && !isNaN(mrp);
  const showDiscount = hasValidPrices && mrp > sale;


  const brandInfos = getMetaValueFromExtra_Fields(productDetails, "brand_id");
  const manufacturerInfo = getMetaValueFromExtra_Fields(productDetails, "manufacturer");
  const generic_name = getMetaValueFromExtra_Fields(productDetails, "generic_name");

  const generic_slug = productDetails?.packages?.medicine_details?.generic_slug

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist({
      id: product.id,
      title: product.name,
      price: product.price,
      img: product.images[0],
      strength: product.strength,
      brand: product.brand
    }))

    dispatch(showNotification({
      message: `${product.name} ${isInWishlist ? 'removed from' : 'added to'} wishlist!`,
      type: 'success'
    }))
  }

  const handleAddToCart = () => {
    dispatch(addItem({
      id: productDetails?.id,
      title: productDetails?.name,
      price: parseFloat(sale_price.replace(/[^0-9.-]+/g, '')),
      img: featured_image,
      quantity: quantity,
      // strength: product.strength,
      brand: manufacturerInfo
    }))

    dispatch(showNotification({
      message: `${product.name} added to cart!`,
      type: 'success'
    }))
  }


  const increment = () => setQuantity(q => q + 1)
  const decrement = () => setQuantity(q => Math.max(1, q - 1))





  // console.log("producDetails brandInfos ", brandInfos)
  // console.log({ sale_price, display_price, stock_quantity, stock_status, is_on_sale, featured_image })


  return (
    <div className="flex flex-col gap-2 md:gap-6 ">
      {/* Wholesale Banner */}
      {/* <div className="bg-[#0784BB] text-white px-3 py-2 md:px-6 md:py-4 rounded-md flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">

          <span className="font-bold text-xs sm:text-sm md:text-md leading-snug">
            পাইকারী দামে পণ্য কিনতে রেজিস্টার করুন
          </span>
        </div>
        <button className="bg-white text-[#0784BB] px-5 py-2 rounded-md text-xs md:text-sm font-black hover:bg-gray-50 transition-all active:scale-95 whitespace-nowrap ml-4">
          Register
        </button>
      </div> */}

      {/* Meta info & Views */}
      {/* <div className="flex flex-wrap items-center justify-between gap-4 px-1">
        <div className="flex items-center gap-2 text-[#0784BB] bg-[#0784BB]/5 px-4 py-2 rounded-md font-bold text-sm border border-[#0784BB]/10">
          <Share2 size={16} className="rotate-180" />
          452,307 People recently viewed this
        </div>
        <div className="flex gap-3">
          <button title="Product Info" className="p-3 bg-white border border-gray-100 rounded-md text-[#0784BB] hover:bg-blue-50 transition-all shadow-sm">
            <Info size={20} />
          </button>
          <button title="Share Product" className="p-3 bg-white border border-gray-100 rounded-md text-gray-400 hover:bg-gray-50 transition-all shadow-sm">
            <Share2 size={20} />
          </button>
        </div>
      </div> */}

      {/* Main Stats Card */}
      <div className="bg-white rounded-sm p-3 md:p-4 border border-gray-200  flex flex-col gap-0">
        {/* Title and Badge */}
        <div className="pb-6 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-xl md:text-2xl text-[#0784BB] font-bold">
              {productDetails?.name}
            </h1>
            <CheckCircle size={22} className="text-[#8CC540]" />
          </div>
          <p className="text-sm text-gray-400 font-semibold">
            {productDetails?.sub_title}
          </p>
          {manufacturerInfo && (
            <Link
              href={`/manufacturer/${manufacturerInfo}`}
              // href={`/manufacturer/${encodeURIComponent(manufacturerInfo.toLowerCase().replace(/\s+/g, '-'))}`}
              className="text-[#0784BB] mt-2 md:mt-3 text-base font-semibold hover:underline flex items-center gap-1 group w-max"
            >
              {manufacturerInfo}
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
          {/* <p className="text-lg text-gray-400 font-semibold">
            {product.form} - {product.strength}
          </p> */}
        </div>

        {/* Company & Generic Details */}
        <div className="py-3 border-b border-gray-200 flex flex-col gap-1">
          <span className="text-xs uppercase font-black text-gray-400">Generic Name</span>
          {generic_name ? (
            <Link
              // href={`/generic/${generic_slug}`} 
              href={`/generic/${encodeURIComponent(generic_name)}`}
              className="text-[#8CC540] font-bold text-base hover:underline">
              {generic_name}
            </Link>
          ) : (
            <span className="text-gray-400 italic text-sm">Not specified</span>
          )}
        </div>

        {/* Purchase Options */}
        <div className="pt-6 flex flex-col gap-6">

          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase font-black  text-gray-400">Available Pack</span>
            <p className="text-[#8CC540] font-bold text-base">{product?.attributes.packSize}</p>
          </div>

          <div className="flex flex-wrap justify-between gap-4  rounded-md">

            <div className='flex gap-4 justify-between items-center'>
              {/* <span className="text-xs uppercase font-black text-[#0784BB] mb-2 block">Our Price</span> */}
              <div className="flex items-end gap-3">
                <span className="text-2xl md:text-2xl text-gray-600 leading-none font-semibold">
                  Tk {sale_price}
                </span>

                {showDiscount && (
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-400 line-through font-bold">
                      MRP ৳{display_price}
                    </span>
                    <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-sm uppercase mt-1">
                      {product?.discount}% OFF
                    </span>
                  </div>
                )}

              </div>


              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white">
                <button
                  onClick={decrement}
                  aria-label="Decrease quantity"
                  className="w-8 h-8  flex items-center justify-center text-gray-600 hover:bg-gray-100 active:bg-gray-200
                   transition"
                >
                  <Minus size={12} />
                </button>

                <div className="w-8 h-8  flex items-center justify-center text-base font-bold text-gray-800 border-x
                 border-gray-300">
                  {quantity}
                </div>

                <button
                  onClick={increment}
                  aria-label="Increase quantity"
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition"
                >
                  <Plus size={12} />
                </button>

              </div>

            </div>

            <div className="flex gap-3 ">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#0784BB] font-semibold text-white py-2 md:py-2 px-4 rounded-md text-base md:text-base flex items-center 
              justify-center gap-3 hover:bg-[#0673a3] transition-all shadow-md group"
              >
                <ShoppingCart size={24} className="group-hover:scale-110 transition-transform" />
                Add to Cart
              </button>
              <button
                onClick={handleToggleWishlist}
                className={`py-2 md:py-2 px-4 border rounded-md transition-all shadow-sm ${isInWishlist ? 'border-pink-200 bg-pink-50 text-pink-600' : 'border-gray-200 bg-white text-gray-400 hover:text-pink-600 hover:bg-pink-50'
                  }`}
              >
                <Heart size={18} className={isInWishlist ? 'fill-current' : ''} />
              </button>
            </div>


          </div>


        </div>

      </div>

      {/* Promotional Offers */}
      {/* <div className="flex flex-col gap-4 mt-2">
        <header className="flex items-center justify-between px-1">
          <h3 className="font-semibold text-xl text-[#0784BB] tracking-tight">Additional Offers</h3>
          <div className="flex gap-2">
            <button className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-md text-gray-500 hover:text-gray-900 transition-colors" id="offer-prev">
              <ChevronLeft size={20} />
            </button>
            <button className="w-10 h-10 flex items-center justify-center bg-[#0784BB] rounded-md text-white hover:bg-[#0673a3] transition-all shadow-sm" id="offer-next">
              <ChevronRight size={20} />
            </button>
          </div>
        </header>

        <div className="w-full relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{ prevEl: '#offer-prev', nextEl: '#offer-next' }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            spaceBetween={20}
            slidesPerView={1.2}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 1.2 },
              1280: { slidesPerView: 1.5 },
            }}
            className="w-full rounded-md"
          >
            {[
              { title: 'Cashback ৳20', sub: 'Min order ৳2000+', color: '#0784BB' },
              { title: 'Cashback ৳10', sub: 'Min order ৳1000+', color: '#8CC540' },
              { title: 'Free Delivery', sub: 'On first order', color: '#eab308' }
            ].map((offer, i) => (
              <SwiperSlide key={i}>
                <div className="bg-white border border-gray-100 rounded-md p-6 flex items-center gap-4 shadow-sm h-full hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-gray-50 rounded-md flex items-center justify-center shrink-0 shadow-inner" style={{ color: offer.color }}>
                    <Zap size={24} />
                  </div>
                  <div>
                    <p className="font-black text-base leading-tight mb-1" style={{ color: offer.color }}>{offer.title}</p>
                    <p className="text-gray-400 text-xs font-bold">{offer.sub}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div> */}
    </div>
  )
}
