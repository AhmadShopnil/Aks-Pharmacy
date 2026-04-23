'use client';

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useGetBrandsQuery } from "@/lib/redux/services/productsApi";
import { CollapsibleFilter } from "./CollapsibleFilter";
import { useState, useEffect } from "react";

export default function FilterSidebar({ categorySlug }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { data: brandsData, isLoading: isBrandsLoading } = useGetBrandsQuery();
  const [brandSearch, setBrandSearch] = useState("");

  const [minPrice, setMinPrice] = useState(searchParams.get("min_price") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("max_price") || "");

  useEffect(() => {
    setMinPrice(searchParams.get("min_price") || "");
    setMaxPrice(searchParams.get("max_price") || "");
  }, [searchParams]);

  const selectedBrands = searchParams.get("brands")?.split(",") || [];

  const handlePriceApply = () => {
    const params = new URLSearchParams(searchParams);
    if (minPrice) {
      params.set("min_price", minPrice);
    } else {
      params.delete("min_price");
    }
    if (maxPrice) {
      params.set("max_price", maxPrice);
    } else {
      params.delete("max_price");
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handlePriceClear = () => {
    setMinPrice("");
    setMaxPrice("");
    const params = new URLSearchParams(searchParams);
    params.delete("min_price");
    params.delete("max_price");
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleClearAll = () => {
    setMinPrice("");
    setMaxPrice("");
    router.push(`${pathname}`, { scroll: false });
  };

  const handleBrandChange = (brandId) => {
    const idStr = brandId.toString();
    const newSelectedBrands = selectedBrands.includes(idStr)
      ? selectedBrands.filter((id) => id !== idStr)
      : [...selectedBrands, idStr];

    const params = new URLSearchParams(searchParams);
    if (newSelectedBrands.length > 0) {
      params.set("brands", newSelectedBrands.join(","));
    } else {
      params.delete("brands");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const filteredBrands = brandsData?.data?.filter((brand) =>
    brand.name.toLowerCase().includes(brandSearch.toLowerCase())
  ) || [];

  return (
    <div className="bg-white space-y-4">
      {searchParams.toString() && (
        <div className="flex justify-between items-center pb-2 border-b">
          <span className="font-semibold text-gray-800">Active Filters</span>
          <button
            onClick={handleClearAll}
            className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors cursor-pointer"
          >
            Clear All
          </button>
        </div>
      )}

      <CollapsibleFilter title="Price Range">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full border px-2 py-1.5 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full border px-2 py-1.5 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePriceClear}
              className="w-full bg-gray-100 text-gray-700 py-1.5 rounded cursor-pointer text-sm hover:bg-gray-200 transition-colors"
            >
              Clear
            </button>
            <button
              onClick={handlePriceApply}
              className="w-full bg-[#0784BB] text-white py-1.5 rounded text-sm hover:bg-[#8CC540]
              cursor-pointer transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      </CollapsibleFilter>
      {/* Brands Filter */}
      <CollapsibleFilter title="Brands">
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Search brands..."
            className="w-full border px-2 py-1.5 text-sm rounded focus:outline-none focus:ring-1 focus:ring-primary/50"
            value={brandSearch}
            onChange={(e) => setBrandSearch(e.target.value)}
          />
          <div className="max-h-60 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
            {isBrandsLoading ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-100 animate-pulse rounded w-3/4"></div>
                ))}
              </div>
            ) : filteredBrands.length > 0 ? (
              filteredBrands.map((brand) => (
                <label key={brand.id} className="flex items-center gap-2 cursor-pointer text-sm group">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary"
                    checked={selectedBrands.includes(brand.id.toString())}
                    onChange={() => handleBrandChange(brand.id)}
                  />
                  <span className="group-hover:text-primary transition-colors truncate">
                    {brand.name}
                  </span>
                </label>
              ))
            ) : (
              <div className="text-sm text-gray-500 italic py-2">No brands found</div>
            )}
          </div>
        </div>
      </CollapsibleFilter>



      {/* <CollapsibleFilter title="Free Shipping">
        <div className="space-y-1 text-sm">
          <label className="flex gap-2 cursor-pointer">
            <input type="checkbox" className="accent-primary" /> Yes
          </label>
          <label className="flex gap-2 cursor-pointer">
            <input type="checkbox" className="accent-primary" /> No
          </label>
        </div>
      </CollapsibleFilter> */}
    </div>
  );
}
