'use client';

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useGetBrandsQuery } from "@/lib/redux/services/productsApi";
import { CollapsibleFilter } from "./CollapsibleFilter";
import { useState } from "react";

export default function FilterSidebar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { data: brandsData, isLoading: isBrandsLoading } = useGetBrandsQuery();
  const [brandSearch, setBrandSearch] = useState("");

  const selectedBrands = searchParams.get("brands")?.split(",") || [];

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

      <CollapsibleFilter title="Price Range">
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            className="w-full border px-2 py-1 rounded text-sm"
          />
          <input
            type="number"
            placeholder="Max"
            className="w-full border px-2 py-1 rounded text-sm"
          />
        </div>
      </CollapsibleFilter>

      <CollapsibleFilter title="Free Shipping">
        <div className="space-y-1 text-sm">
          <label className="flex gap-2 cursor-pointer">
            <input type="checkbox" className="accent-primary" /> Yes
          </label>
          <label className="flex gap-2 cursor-pointer">
            <input type="checkbox" className="accent-primary" /> No
          </label>
        </div>
      </CollapsibleFilter>
    </div>
  );
}
