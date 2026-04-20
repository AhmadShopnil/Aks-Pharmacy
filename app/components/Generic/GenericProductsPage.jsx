'use client';

import { useState, useMemo } from 'react';
import { useGetProductsByGenericQuery } from '@/lib/redux/services/productsApi';
import ProductCardMain from '../Common/Cards/ProductCard/ProductCardMain';
import Container from '../Common/Container';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { ChevronLeft, ChevronRight, SlidersHorizontal, Pill, PackageSearch } from 'lucide-react';
import Pagination from '../Common/Pagination';

const SORT_OPTIONS = [
    { label: 'Name: A-Z', value: 'name:asc' },
    { label: 'Name: Z-A', value: 'name:desc' },
    { label: 'Price: Low to High', value: 'sale_price:asc' },
    { label: 'Price: High to Low', value: 'sale_price:desc' },
    { label: 'Newest First', value: 'created_at:desc' },
    { label: 'Oldest First', value: 'created_at:asc' },
];

const PER_PAGE_OPTIONS = [15, 30, 50];

export default function GenericProductsPage({ genericSlug }) {
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState('name:asc');
    const [perPage, setPerPage] = useState(15);

    // Decode the slug for display (e.g., "paracetamol" → "Paracetamol")
    const genericName = decodeURIComponent(genericSlug);
    const displayName = genericName
        .split(/[\s-]+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

    const { data, isLoading, isError, isFetching } = useGetProductsByGenericQuery({
        genericName,
        perPage,
        page,
        sort,
    });

    const products = data?.data || [];
    const meta = data?.meta || {};
    const totalProducts = meta?.total || 0;
    const lastPage = meta?.last_page || 1;
    const apiGenericName = data?.generic_name || displayName;

    // Generate page numbers
    const pageNumbers = useMemo(() => {
        const pages = [];
        const maxVisible = 5;
        let start = Math.max(1, page - Math.floor(maxVisible / 2));
        let end = Math.min(lastPage, start + maxVisible - 1);
        start = Math.max(1, end - maxVisible + 1);
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    }, [page, lastPage]);

    return (
        <div className="pb-12 min-h-screen bg-gray-50/50">
            {/* Breadcrumb */}
            <div className="border-b bg-white py-3">
                <Container className="flex items-center gap-2 text-sm text-gray-600">
                    <Link href="/" className="hover:text-[#0784BB] transition-colors">Home</Link>
                    <FontAwesomeIcon icon={faAngleRight} className="w-3 h-3 text-gray-400" />
                    <Link href="/products" className="hover:text-[#0784BB] transition-colors">Products</Link>
                    <FontAwesomeIcon icon={faAngleRight} className="w-3 h-3 text-gray-400" />
                    <span className="font-semibold text-gray-900">{apiGenericName}</span>
                </Container>
            </div>

            {/* Header Section */}
            <div className="bg-gradient-to-r from-[#0784BB]/10 via-[#8CC540]/5 to-transparent border-b">
                <Container className="py-8 md:py-10">
                    <div className="flex items-start gap-4">
                        <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0784BB] to-[#065d8a] items-center justify-center shadow-lg shadow-[#0784BB]/20">
                            <Pill className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                                {apiGenericName}
                            </h1>
                            <p className="text-gray-500 mt-1 text-sm md:text-base">
                                {isLoading
                                    ? 'Loading products...'
                                    : `${totalProducts} product${totalProducts !== 1 ? 's' : ''} found with this generic`
                                }
                            </p>
                        </div>
                    </div>
                </Container>
            </div>

            <Container className="mt-6">
                {/* Controls Bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <SlidersHorizontal className="w-4 h-4" />
                        <span>
                            Showing{' '}
                            <span className="font-semibold text-gray-900">
                                {products.length > 0 ? (page - 1) * perPage + 1 : 0}
                                –
                                {Math.min(page * perPage, totalProducts)}
                            </span>{' '}
                            of <span className="font-semibold text-gray-900">{totalProducts}</span> results
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        {/* Per Page */}
                        <select
                            value={perPage}
                            onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
                            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-[#0784BB]/20 focus:border-[#0784BB] outline-none transition"
                        >
                            {PER_PAGE_OPTIONS.map(opt => (
                                <option key={opt} value={opt}>{opt} per page</option>
                            ))}
                        </select>


                    </div>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {[...Array(perPage > 10 ? 10 : perPage)].map((_, i) => (
                            <div key={i} className="h-[360px] md:h-[430px] bg-white animate-pulse rounded-xl border border-gray-100">
                                <div className="h-[55%] bg-gray-100 rounded-t-xl" />
                                <div className="p-4 space-y-3">
                                    <div className="h-4 bg-gray-100 rounded w-3/4 mx-auto" />
                                    <div className="h-3 bg-gray-100 rounded w-1/2 mx-auto" />
                                    <div className="h-5 bg-gray-100 rounded w-1/3 mx-auto" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Error State */}
                {isError && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-4">
                            <PackageSearch className="w-10 h-10 text-red-400" />
                        </div>
                        <p className="text-lg font-semibold text-gray-800">Failed to load products</p>
                        <p className="text-gray-500 mt-1 text-sm">Please check the generic name or try again later.</p>
                        <Link
                            href="/"
                            className="mt-6 px-6 py-2.5 bg-[#0784BB] text-white rounded-lg font-semibold text-sm hover:bg-[#066f9e] transition"
                        >
                            Back to Home
                        </Link>
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && !isError && products.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                            <PackageSearch className="w-10 h-10 text-gray-400" />
                        </div>
                        <p className="text-lg font-semibold text-gray-800">
                            No products found for &quot;{apiGenericName}&quot;
                        </p>
                        <p className="text-gray-500 mt-1 text-sm">Try a different generic name or browse our shop.</p>
                        <Link
                            href="/shop"
                            className="mt-6 px-6 py-2.5 bg-[#0784BB] text-white rounded-lg font-semibold text-sm hover:bg-[#066f9e] transition"
                        >
                            Browse Shop
                        </Link>
                    </div>
                )}

                {/* Product Grid */}
                {!isLoading && !isError && products.length > 0 && (
                    <div className={`transition-opacity duration-300 ${isFetching ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {products?.map((item) => (
                                <ProductCardMain key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                )}

                <Pagination 
                    currentPage={page} 
                    lastPage={lastPage} 
                    onPageChange={setPage}
                    isFetching={isFetching}
                />
            </Container>
        </div>
    );
}
