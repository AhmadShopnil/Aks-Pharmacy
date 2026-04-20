import React, { useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ 
    currentPage, 
    lastPage, 
    onPageChange, 
    isFetching = false 
}) => {
    // Generate page numbers
    const pageNumbers = useMemo(() => {
        const pages = [];
        const maxVisible = 5;
        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let end = Math.min(lastPage, start + maxVisible - 1);
        start = Math.max(1, end - maxVisible + 1);
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    }, [currentPage, lastPage]);

    if (lastPage <= 1) return null;

    return (
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-1.5">
                {/* Prev Button */}
                <button
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1 || isFetching}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 transition
                    disabled:opacity-40 disabled:cursor-not-allowed
                    hover:bg-[#0784BB] hover:text-white hover:border-[#0784BB]"
                >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Prev</span>
                </button>

                {/* Page Numbers */}
                {pageNumbers[0] > 1 && (
                    <>
                        <button
                            onClick={() => onPageChange(1)}
                            className="w-10 h-10 text-sm font-medium rounded-lg border border-gray-200 hover:bg-[#0784BB] hover:text-white hover:border-[#0784BB] transition"
                        >
                            1
                        </button>
                        {pageNumbers[0] > 2 && (
                            <span className="w-10 h-10 flex items-center justify-center text-gray-400">…</span>
                        )}
                    </>
                )}
                {pageNumbers.map(p => (
                    <button
                        key={p}
                        onClick={() => onPageChange(p)}
                        disabled={isFetching}
                        className={`w-10 h-10 text-sm font-medium rounded-lg border transition
                        ${p === currentPage
                            ? 'bg-[#0784BB] text-white border-[#0784BB] shadow-md shadow-[#0784BB]/20'
                            : 'border-gray-200 hover:bg-[#0784BB] hover:text-white hover:border-[#0784BB]'
                        }`}
                    >
                        {p}
                    </button>
                ))}
                {pageNumbers[pageNumbers.length - 1] < lastPage && (
                    <>
                        {pageNumbers[pageNumbers.length - 1] < lastPage - 1 && (
                            <span className="w-10 h-10 flex items-center justify-center text-gray-400">…</span>
                        )}
                        <button
                            onClick={() => onPageChange(lastPage)}
                            className="w-10 h-10 text-sm font-medium rounded-lg border border-gray-200 hover:bg-[#0784BB] hover:text-white hover:border-[#0784BB] transition"
                        >
                            {lastPage}
                        </button>
                    </>
                )}

                {/* Next Button */}
                <button
                    onClick={() => onPageChange(Math.min(lastPage, currentPage + 1))}
                    disabled={currentPage === lastPage || isFetching}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 transition
                    disabled:opacity-40 disabled:cursor-not-allowed
                    hover:bg-[#0784BB] hover:text-white hover:border-[#0784BB]"
                >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
