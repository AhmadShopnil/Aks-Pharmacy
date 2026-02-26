'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, X, Loader2, ArrowRight } from 'lucide-react';
import { useSearchProductsQuery } from '@/lib/redux/services/productsApi';
import { useDebounce } from '@/lib/hooks/useDebounce';

export default function SearchSuggestions({ isMobile = false }) {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const wrapperRef = useRef(null);
    const inputRef = useRef(null);

    // Debounce the search query — waits 400ms after user stops typing
    const debouncedQuery = useDebounce(query, 400);

    // Only fire RTK Query when debounced value is 2+ characters
    const { data, isFetching } = useSearchProductsQuery(debouncedQuery, {
        skip: debouncedQuery.length < 2,
    });

    const products = data?.data || [];

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(e) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setIsOpen(false);
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

    return (
        <div ref={wrapperRef} className={`relative ${isMobile ? 'w-full' : 'flex-1'}`}>
            {/* Search Input */}
            <div
                className={`flex items-center overflow-hidden ${isMobile
                        ? 'bg-teal-50 rounded-md h-10 border border-teal-100'
                        : 'w-full bg-teal-50 rounded-md h-12 border border-teal-100'
                    }`}
            >
                {/* Category dropdown (desktop only) */}
                {!isMobile && (
                    <div className="px-4 h-full flex items-center gap-1 border-r border-gray-200 bg-white text-sm text-gray-700 shrink-0">
                        All
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                )}

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
                    className="flex-1 px-4 bg-transparent outline-none text-sm text-gray-700"
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
                    className={`h-full flex items-center justify-center text-white shrink-0 ${isMobile ? 'bg-teal-700 px-4' : 'bg-[#0784BB] px-5'
                        }`}
                    aria-label="Search"
                >
                    <Search className="w-5 h-5" />
                </button>
            </div>

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
