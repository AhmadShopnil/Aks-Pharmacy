"use client";
import React, { useMemo } from "react";
import ProductSlider from "./ProductSlider";
import { useGetProductsByCategoryQuery } from "@/lib/redux/services/productsApi";

export default function SimilarProducts({ productDetails }) {
  // Extract category slug from WP-style 'terms' or 'categories' array
  const categorySlug = useMemo(() => {
    if (!productDetails) return "medicine";
    if (Array.isArray(productDetails.categories) && productDetails.categories[0]?.slug) {
      return productDetails.categories[0].slug;
    }
    if (Array.isArray(productDetails.terms)) {
      const cat = productDetails.terms.find(t => t.taxonomy === "category" || t.taxonomy === "product_categories");
      if (cat?.slug) return cat.slug;
    }
    // Fallback if structured differently (e.g. nested deeply or string based)
    return "medicine";
  }, [productDetails]);

  const { data, isLoading, isError } = useGetProductsByCategoryQuery(categorySlug, {
    skip: !categorySlug
  });

  if (isLoading) {
    return (
      <div className="rounded-lg p-4 md:p-6 bg-[#8ac74038] animate-pulse">
        <div className="h-6 w-48 bg-white/50 rounded mb-4"></div>
        <div className="flex gap-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="w-40 h-[260px] bg-white rounded-lg border border-gray-200 shrink-0"></div>
          ))}
        </div>
      </div>
    );
  }

  if (isError || !data?.data?.length) return null;

  // Map API data to the format ProductSlider expects
  const products = data.data
    .filter(item => item.id !== productDetails?.id) // Exclude current product
    .map(item => {
      const varInfo = item?.packages?.variations?.[0];
      const sale_price = varInfo?.sale_price || item?.price;
      const featuredImage = varInfo?.featured_image?.file_url || varInfo?.gallery_images?.[0]?.file_url || item?.featured_image;
      const numPrice = typeof sale_price === 'string' ? parseFloat(sale_price.replace(/[^0-9.-]+/g, '')) : (parseFloat(sale_price) || 0);

      return {
        id: item.id,
        name: item.name,
        full_product: item,
        slug: item.slug,
        price: `৳${numPrice}`,
        image: featuredImage || "/images/items/placeholder.jpg",

        originalItem: {
          id: item.id,
          title: item.name,
          price: numPrice,
          img: featuredImage || "/images/items/placeholder.jpg",
          quantity: 1,
        }
      };
    })
    .slice(0, 10); // Display max 10 similar products

  if (products.length === 0) return null;

  return (
    <ProductSlider
      title="Similar Products"
      products={products}

      showSeeAll={true}
      seeAllHref={`/shop/${categorySlug}`}
      containerClass="bg-[#8ac74038]"
    />
  );
}
