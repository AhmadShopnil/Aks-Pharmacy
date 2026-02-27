"use client";
import React, { useState } from "react";
import { ArrowRight, Zap } from "lucide-react";
import ProductCardMain from "@/app/components/Common/Cards/ProductCard/ProductCardMain";
import { useGetNewArrivalsProductsQuery, useGetProductCategoriesQuery } from "@/lib/redux/services/productsApi";

export default function NewArrivalsClient() {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [page, setPage] = useState(1);

    // Fetch categories for "Quick Filters"
    const { data: categoriesData, isLoading: categoriesLoading } = useGetProductCategoriesQuery();
    // Assuming category list is returned under data like API standard
    const categories = categoriesData?.data || [];
    // Or if it returns an array directly: const categories = Array.isArray(categoriesData) ? categoriesData : (categoriesData?.data || []);

    // Since we need "first layer categories", we might filter where parent_id === 0 or just take top N.
    // For now let's just use the first 4-5 categories for the quick filters.
    const quickFilters = (Array.isArray(categoriesData) ? categoriesData : categoriesData?.data || [])
        .filter(cat => !cat.parent_id || cat.parent_id === 0 || cat.parent_id === "0" || cat.parent_id === null)


    // Fetch New Arrivals (pass category and page)
    const { data: productsData, isLoading, isError, isFetching } = useGetNewArrivalsProductsQuery({
        categorySlug: selectedCategory,
        perPage: 15,
        page
    });

    const newArrivals = productsData?.data || [];
    const meta = productsData || {};
    const lastPage = meta.last_page || 1;

    const handleCategoryClick = (slug) => {
        setSelectedCategory(slug === selectedCategory ? "" : slug);
        setPage(1); // Reset pagination on category change
    };

    return (
        <div className="bg-white rounded-md shadow-xl p-4 md:p-10 border border-slate-100">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-12">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Recently Added</h2>
                    <p className="text-slate-500 mt-1">
                        Showing the latest {newArrivals.length} products added to our inventory
                        {selectedCategory && " in this category"}.
                    </p>
                </div>

            </div>

            <div className="flex flex-wrap items-center gap-3  pb-2 mb-2 ">

                <button
                    onClick={() => handleCategoryClick("")}
                    className={`px-4 py-2 rounded-lg font-semibold border transition-all whitespace-nowrap ${selectedCategory === ""
                        ? "bg-[#0784BB] text-white border-[#0784BB]"
                        : "bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100"
                        }`}
                >
                    All
                </button>
                {quickFilters.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.slug)}
                        className={`px-4 py-2 rounded-lg font-semibold border transition-all whitespace-nowrap ${selectedCategory === cat.slug
                            ? "bg-[#0784BB] text-white border-[#0784BB]"
                            : "bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100"
                            }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="h-[350px] bg-slate-100 animate-pulse rounded-lg"></div>
                    ))}
                </div>
            ) : isError ? (
                <div className="text-center py-20 text-red-500">
                    Failed to load new arrivals. Please try again.
                </div>
            ) : newArrivals?.length > 0 ? (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
                        {newArrivals?.map((product) => (
                            <div key={product?.id} className="group h-full flex flex-col transition-all duration-300 hover:-translate-y-2">
                                <ProductCardMain item={product} />
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="text-center py-20">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Zap className="text-slate-300" size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">No new arrivals yet</h3>
                    <p className="text-slate-500 mt-2">Check back soon for our latest restocks and new products.</p>
                </div>
            )}

            {/* Pagination/Load More Placeholder */}
            {lastPage > page && !isLoading && !isError && newArrivals.length > 0 && (
                <div className="mt-10 pt-4 border-t border-slate-100 text-center flex flex-col items-center">
                    <button
                        onClick={() => setPage(p => p + 1)}
                        disabled={isFetching}
                        className="inline-flex items-center gap-2 px-10 py-3.5 bg-[#0784BB] text-white rounded-xl font-bold hover:bg-[#0673a3] disabled:opacity-50 transition-all group"
                    >
                        {isFetching ? 'Loading...' : 'Load More'}
                        {!isFetching && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                    </button>
                </div>
            )}
        </div>
    );
}
