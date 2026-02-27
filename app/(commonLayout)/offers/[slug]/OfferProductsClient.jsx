"use client";
import React, { useState } from "react";
import { ArrowRight, Zap, Target } from "lucide-react";
import ProductCardMain from "@/app/components/Common/Cards/ProductCard/ProductCardMain";
import { useGetOfferProductsQuery } from "@/lib/redux/services/productsApi";

export default function OfferProductsClient({ slug }) {
    const [page, setPage] = useState(1);

    // Fetch Offer Products (pass offer slug and page)
    const { data: responseData, isLoading, isError, isFetching } = useGetOfferProductsQuery({
        slug: slug,
        perPage: 15,
        page
    });

    // The API wraps the return object with { success, message, offer: {}, data: [], pagination: {} }
    const offerDetails = responseData?.offer || null;
    const offerProducts = responseData?.data || [];
    const meta = responseData?.pagination || {};
    const lastPage = meta.last_page || 1;
    const total = meta.total || 0;

    return (
        <div className="bg-white rounded-md shadow-sm p-4 md:p-10 border border-slate-100">


            {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="h-[350px] bg-slate-100 animate-pulse rounded-lg"></div>
                    ))}
                </div>
            ) : isError ? (
                <div className="text-center py-20 text-red-500">
                    Failed to fetch the offer details. The offer may have expired or does not exist.
                </div>
            ) : offerProducts?.length > 0 ? (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
                        {offerProducts.map((product) => (
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
                    <h3 className="text-2xl font-bold text-slate-900">No products found</h3>
                    <p className="text-slate-500 mt-2">There currently are no products mapped to this specific offer.</p>
                </div>
            )}

            {/* Pagination/Load More Placeholder */}
            {lastPage > page && !isLoading && !isError && offerProducts.length > 0 && (
                <div className="mt-10 pt-4 text-center flex flex-col items-center">
                    <button
                        onClick={() => setPage(p => p + 1)}
                        disabled={isFetching}
                        className="inline-flex items-center gap-2 px-10 py-3.5 bg-[#0784BB] text-white rounded-xl font-bold hover:bg-[#0673a3] disabled:opacity-50 transition-all group"
                    >
                        {isFetching ? 'Loading...' : 'Load More'}
                        {!isFetching && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                    </button>
                    <p className="text-slate-400 mt-4 text-sm font-medium">Page {page} of {lastPage}</p>
                </div>
            )}
        </div>
    );
}
