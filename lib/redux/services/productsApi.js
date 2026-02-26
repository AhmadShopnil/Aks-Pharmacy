import { baseApi } from './baseApi';

/**
 * Products API service
 * Handles all product-related API calls with automatic caching
 */
export const productsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Get all products with optional filters
        getProducts: builder.query({
            query: ({ category, limit, page, sort } = {}) => {
                const params = new URLSearchParams();
                if (category) params.append('category', category);
                if (limit) params.append('limit', limit);
                if (page) params.append('page', page);
                if (sort) params.append('sort', sort);

                return `/products?${params.toString()}`;
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Product', id })),
                        { type: 'Products', id: 'LIST' },
                    ]
                    : [{ type: 'Products', id: 'LIST' }],
        }),

        // Get single product by ID
        getProductById: builder.query({
            query: (id) => `/products/${id}`,
            providesTags: (result, error, id) => [{ type: 'Product', id }],
        }),

        // Get products by category
        getProductsByCategory: builder.query({
            query: (category) => `posts?term_type=products&category_slug=${category}&per_page=100`,
            providesTags: (result) =>
                result?.data
                    ? [
                        ...result.data.map(({ id }) => ({ type: 'Product', id })),
                        { type: 'Products', id: 'CATEGORY' },
                    ]
                    : [{ type: 'Products', id: 'CATEGORY' }],
        }),

        // Get featured/recommended products
        getFeaturedProducts: builder.query({
            query: ({ limit = 10 } = {}) => `/products/featured?limit=${limit}`,
            providesTags: [{ type: 'Products', id: 'FEATURED' }],
        }),

        // Get best selling products
        getBestSellingProducts: builder.query({
            query: ({ limit = 10 } = {}) => `/products/best-selling?limit=${limit}`,
            providesTags: [{ type: 'Products', id: 'BEST_SELLING' }],
        }),

        // Search products (supports optional category filter)
        searchProducts: builder.query({
            query: ({ searchTerm, categorySlug } = {}) => {
                const params = new URLSearchParams();
                params.append('term_type', 'products');
                params.append('per_page', '50');
                if (searchTerm) params.append('s', searchTerm);
                if (categorySlug) params.append('category_slug', categorySlug);
                return `posts?${params.toString()}`;
            },
            providesTags: (result) =>
                result?.data
                    ? [
                        ...result.data.map(({ id }) => ({ type: 'Product', id })),
                        { type: 'Products', id: 'SEARCH' },
                    ]
                    : [{ type: 'Products', id: 'SEARCH' }],
        }),

        // Get product categories for search dropdown
        getProductCategories: builder.query({
            query: () => `categories?taxonomy_type=product_categories&limit=100&order_by=order_column&order_direction=asc`,
            providesTags: [{ type: 'Categories', id: 'LIST' }],
        }),
    }),

    overrideExisting: false,
});

// Export hooks 
export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useGetProductsByCategoryQuery,
    useGetFeaturedProductsQuery,
    useGetBestSellingProductsQuery,
    useSearchProductsQuery,
    useGetProductCategoriesQuery,
} = productsApi;
