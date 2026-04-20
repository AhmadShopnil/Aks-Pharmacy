'use client';

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCardMain from "../Common/Cards/ProductCard/ProductCardMain";
import { useGetProductsByCategoryQuery } from "@/lib/redux/services/productsApi";
import Pagination from "../Common/Pagination";

export default function ProductGrid({ categorySlug }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const brands = searchParams.get("brands");
  const initialPage = Number(searchParams.get("page")) || 1;
  
  const [page, setPage] = useState(initialPage);
  const [perPage, setPerPage] = useState(50);

  // Sync state with URL
  useEffect(() => {
    const urlPage = Number(searchParams.get("page")) || 1;
    if (urlPage !== page) {
      setPage(urlPage);
    }
  }, [searchParams]);

  const { data, isLoading, isError, isFetching } = useGetProductsByCategoryQuery({
    category: categorySlug?.toLowerCase(),
    per_page: perPage,
    page: page,
    brand_id: brands,
  });

  const handlePageChange = (newPage) => {
    setPage(newPage);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    setPage(1);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    // Optionally update per_page in URL too if needed
    router.push(`?${params.toString()}`, { scroll: false });
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="h-[400px] bg-gray-100 animate-pulse rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load products. Please try again later.
      </div>
    );
  }

  const products = data?.data || [];
  const meta = data?.meta || {};
  const lastPage = meta?.last_page || 1;

  if (products.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No products found in this category.
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <select
          value={perPage}
          onChange={(e) => handlePerPageChange(Number(e.target.value))}
          className="border px-3 py-2 rounded-md"
        >
          <option value={20}>Show 20</option>
          <option value={50}>Show 50</option>
          <option value={100}>Show 100</option>
          <option value={150}>Show 150</option>
        </select>
      </div>
      
      <div className={`transition-opacity duration-300 ${isFetching ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((item) => (
            <ProductCardMain key={item?.id} item={item} />
          ))}
        </div>
      </div>

      <Pagination 
        currentPage={page} 
        lastPage={lastPage} 
        onPageChange={handlePageChange}
        isFetching={isFetching}
      />
    </div>
  );
}
