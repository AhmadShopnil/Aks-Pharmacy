"use client"
import { useState, useMemo } from 'react'
import ProductGallery from './ProductGallery'
import ProductInfo from './ProductInfo'
import AlternativeBrands from './AlternativeBrands'
import ProductOverview from './ProductOverview'
import ProductAttributes from './ProductAttributes'

export default function ProductDetailsClient({
  product,
  productDetails,
  generic_name,
}) {
  const variations = productDetails?.packages?.variations || []
  const [selectedVariation, setSelectedVariation] = useState(variations[0] || null)

  // Build gallery images from selected variation
  const all_images = useMemo(() => {
    if (!selectedVariation) return []
    const featured = selectedVariation.featured_image
    const gallery = selectedVariation.gallery_images || []
    return featured ? [featured, ...gallery] : gallery
  }, [selectedVariation])

  const attributes = selectedVariation?.attributes

  return (
    <>
      {/* ─── LEFT COLUMN ─── */}
      <div className="lg:col-span-7 flex flex-col gap-3 md:gap-4">
        {/* Gallery — reacts to selectedVariation */}
        <ProductGallery gallery_images={all_images} />

        {/* Mobile ProductInfo (hidden on desktop) */}
        <div className="lg:hidden">
          <ProductInfo
            product={product}
            productDetails={productDetails}
            selectedVariation={selectedVariation}
            onVariationChange={setSelectedVariation}
          />
        </div>

        <ProductOverview productDetails={productDetails} />

        <ProductAttributes
          attributes={attributes}
          categorySchema={product?.categorySchema}
        />
      </div>

      {/* ─── RIGHT SIDEBAR ─── */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        <div className="hidden lg:flex flex-col gap-2 sticky top-4">
          {/* Desktop ProductInfo — shares the same selectedVariation state */}
          <ProductInfo
            product={product}
            productDetails={productDetails}
            selectedVariation={selectedVariation}
            onVariationChange={setSelectedVariation}
          />
          <AlternativeBrands generic_name={generic_name} />
        </div>
      </div>
    </>
  )
}
