'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, X, Loader2, ArrowRight, ChevronDown } from 'lucide-react';
import { useSearchProductsQuery, useGetProductCategoriesQuery } from '@/lib/redux/services/productsApi';
import { useDebounce } from '@/lib/hooks/useDebounce';

export default function SearchSuggestions({ isMobile = false }) {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const wrapperRef = useRef(null);
    const inputRef = useRef(null);
    const categoryRef = useRef(null);

    // Debounce the search query — waits 400ms after user stops typing
    const debouncedQuery = useDebounce(query, 400);

    // Fetch product categories for the dropdown
    const { data: categoriesData } = useGetProductCategoriesQuery();
    const categories = categoriesData?.data || [];

    // Only fire RTK Query when debounced value is 2+ characters
    const { data, isFetching } = useSearchProductsQuery(
        {
            searchTerm: debouncedQuery,
            categorySlug: selectedCategory?.slug || undefined,
        },
        {
            skip: debouncedQuery.length < 2,
        }
    );

    const products = data?.data || [];

    // Close dropdowns on outside click
    useEffect(() => {
        function handleClickOutside(e) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setIsOpen(false);
                setIsCategoryOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Reset highlighted index when results change
    useEffect(() => {
        setHighlightedIndex(-1);
    }, [products]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        if (value.length >= 2) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    };

    const clearSearch = () => {
        setQuery('');
        setIsOpen(false);
        inputRef.current?.focus();
    };

    const handleSelectCategory = (cat) => {
        setSelectedCategory(cat);
        setIsCategoryOpen(false);
        inputRef.current?.focus();
        if (query.length >= 2) {
            setIsOpen(true);
        }
    };

    // Keyboard navigation
    const handleKeyDown = (e) => {
        if (!isOpen || products.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex((prev) =>
                    prev < products.length - 1 ? prev + 1 : 0
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex((prev) =>
                    prev > 0 ? prev - 1 : products.length - 1
                );
                break;
            case 'Enter':
                e.preventDefault();
                if (highlightedIndex >= 0 && products[highlightedIndex]) {
                    window.location.href = `/products/${products[highlightedIndex].slug}`;
                }
                break;
            case 'Escape':
                setIsOpen(false);
                inputRef.current?.blur();
                break;
        }
    };

    const getImage = (item) => {
        const variation = item?.packages?.variations?.[0];
        return (
            variation?.featured_image?.file_url ||
            variation?.gallery_images?.[0]?.file_url ||
            item?.featured_image ||
            '/images/placeholder-product.webp'
        );
    };

    const getPrice = (item) => {
        const variation = item?.packages?.variations?.[0];
        return variation?.sale_price || variation?.display_price || null;
    };

    const showDropdown = isOpen && debouncedQuery.length >= 2;
    const categoryLabel = selectedCategory ? selectedCategory.name : 'All';

    return (
        <div ref={wrapperRef} className={`relative ${isMobile ? 'w-full' : 'flex-1'}`}>
            {/* Search Input Bar */}
            <div
                className={`flex items-center ${isMobile
                    ? 'bg-teal-50 rounded-md h-10 border border-teal-100'
                    : 'w-full bg-teal-50 rounded-md h-12 border border-teal-100'
                    }`}
            >
                {/* Category dropdown trigger */}
                <div ref={categoryRef} className="relative shrink-0 h-full">
                    <button
                        onClick={() => setIsCategoryOpen((prev) => !prev)}
                        className={`h-full flex items-center gap-1 border-r border-gray-200 bg-white text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer ${isMobile ? 'px-2.5 rounded-l-md' : 'px-4 rounded-l-md'}`}
                    >
                        <span className={`truncate ${isMobile ? 'max-w-[60px]' : 'max-w-[100px]'}`}>{categoryLabel}</span>
                        <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onFocus={() => {
                        if (query.length >= 2) setIsOpen(true);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder={
                        isMobile
                            ? 'Search medicine, products...'
                            : 'Search for "healthcare products"'
                    }
                    className="flex-1 px-4 bg-transparent outline-none text-sm text-gray-700 min-w-0"
                    autoComplete="off"
                    role="combobox"
                    aria-expanded={showDropdown}
                    aria-haspopup="listbox"
                    aria-autocomplete="list"
                />

                {/* Loading spinner or clear button */}
                {query.length > 0 && (
                    <div className="flex items-center pr-1">
                        {isFetching ? (
                            <Loader2 className="w-4 h-4 text-gray-400 animate-spin mr-2" />
                        ) : (
                            <button
                                onClick={clearSearch}
                                className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                                aria-label="Clear search"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                )}

                <button
                    className={`h-full flex items-center justify-center text-white shrink-0 ${isMobile ? 'bg-teal-700 px-4 rounded-r-md' : 'bg-[#0784BB] px-5 rounded-r-md'
                        }`}
                    aria-label="Search"
                >
                    <Search className="w-5 h-5" />
                </button>
            </div>

            {/* Category dropdown menu */}
            {isCategoryOpen && (
                <div
                    className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-100 z-[9999] min-w-[220px] max-h-[350px] overflow-y-auto"
                    onMouseDown={(e) => {
                        // Prevent this mousedown from bubbling to the document handler
                        e.stopPropagation();
                    }}
                >
                    {/* All option */}
                    <div
                        onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleSelectCategory(null);
                        }}
                        className={`px-4 py-2.5 text-sm transition-colors cursor-pointer flex items-center gap-2 select-none ${selectedCategory === null
                            ? 'bg-teal-50 text-teal-700 font-semibold'
                            : 'text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <span className="w-5 h-5 rounded bg-gray-100 flex items-center justify-center text-xs shrink-0">🔍</span>
                        All Categories
                    </div>

                    <div className="h-px bg-gray-100" />

                    {/* Category list */}
                    {categories?.map((cat) => (
                        <div
                            key={cat.id}
                            onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleSelectCategory(cat);
                            }}
                            className={`px-4 py-2.5 text-sm transition-colors cursor-pointer flex items-center gap-2 select-none ${selectedCategory?.id === cat.id
                                ? 'bg-teal-50 text-teal-700 font-semibold'
                                : 'text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            {cat.icon ? (
                                <Image src={cat.icon} alt="" width={20} height={20} className="w-5 h-5 rounded object-cover shrink-0" />
                            ) : (
                                <span className="w-5 h-5 rounded bg-teal-100 text-teal-600 flex items-center justify-center text-[10px] font-bold shrink-0">
                                    {cat.name?.charAt(0)}
                                </span>
                            )}
                            <span className="truncate">{cat.name}</span>
                        </div>
                    ))}

                    {categories.length === 0 && (
                        <div className="px-4 py-3 text-sm text-gray-400 text-center flex items-center justify-center gap-2">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Loading categories...
                        </div>
                    )}
                </div>
            )}

            {/* Suggestions Dropdown */}
            {showDropdown && (
                <div
                    className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-2xl border border-gray-100 z-[100] max-h-[70vh] overflow-y-auto"
                    role="listbox"
                >
                    {isFetching && products.length === 0 ? (
                        // Loading skeleton
                        <div className="p-4 space-y-3">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="flex items-center gap-3 animate-pulse">
                                    <div className="w-12 h-12 bg-gray-200 rounded-md shrink-0" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-3 bg-gray-200 rounded w-3/4" />
                                        <div className="h-3 bg-gray-200 rounded w-1/3" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : products.length > 0 ? (
                        <>
                            {/* Results header */}
                            <div className="px-4 py-2 border-b border-gray-50 flex items-center justify-between">
                                <span className="text-xs text-gray-500 font-medium">
                                    {data?.meta?.total || products.length} result{(data?.meta?.total || products.length) !== 1 ? 's' : ''} found
                                    {selectedCategory && (
                                        <span className="text-teal-600"> in {selectedCategory.name}</span>
                                    )}
                                </span>
                                {isFetching && (
                                    <Loader2 className="w-3 h-3 text-gray-400 animate-spin" />
                                )}
                            </div>

                            {/* Product list */}
                            <ul className="py-1">
                                {products.map((item, index) => (
                                    <li key={item.id} role="option" aria-selected={index === highlightedIndex}>
                                        <Link
                                            href={`/products/${item.slug}`}
                                            onClick={() => {
                                                setIsOpen(false);
                                                setQuery('');
                                            }}
                                            className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${index === highlightedIndex
                                                ? 'bg-teal-50'
                                                : 'hover:bg-gray-50'
                                                }`}
                                        >
                                            {/* Product image */}
                                            <div className="w-12 h-12 relative rounded-md overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                                                <Image
                                                    src={getImage(item)}
                                                    alt={item.name || 'Product'}
                                                    fill
                                                    className="object-cover"
                                                    sizes="48px"
                                                />
                                            </div>

                                            {/* Product info */}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-800 truncate">
                                                    {item.name}
                                                </p>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    {getPrice(item) && (
                                                        <span className="text-sm font-semibold text-pink-600">
                                                            ৳ {getPrice(item)}
                                                        </span>
                                                    )}
                                                    {item?.packages?.variations?.[0]?.stock_status === 'in_stock' ? (
                                                        <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium">
                                                            In Stock
                                                        </span>
                                                    ) : (
                                                        <span className="text-[10px] bg-red-50 text-red-500 px-1.5 py-0.5 rounded-full font-medium">
                                                            Out of Stock
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <ArrowRight className="w-4 h-4 text-gray-300 shrink-0" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            {/* View all results */}
                            {(data?.meta?.total || 0) > 10 && (
                                <div className="border-t border-gray-100 p-2">
                                    <Link
                                        href={`/search?q=${encodeURIComponent(query)}`}
                                        onClick={() => {
                                            setIsOpen(false);
                                        }}
                                        className="flex items-center justify-center gap-2 w-full py-2 text-sm font-medium text-[#0784BB] hover:bg-teal-50 rounded-md transition-colors"
                                    >
                                        View all {data?.meta?.total} results
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            )}
                        </>
                    ) : (
                        // No results
                        <div className="p-6 text-center">
                            <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                            <p className="text-sm text-gray-500 font-medium">
                                No products found for &ldquo;{debouncedQuery}&rdquo;
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                Try a different search term
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
