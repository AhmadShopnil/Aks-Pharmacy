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
            query: (id) => `/product/${id}`,
            providesTags: (result, error, id) => [{ type: 'Product', id }],
        }),

        // Get products by category
        getProductsByCategory: builder.query({
            query: ({ category, per_page = 50, page = 1, brand_id, order_by, order_direction }) => {
                const params = new URLSearchParams();
                params.append('term_type', 'products');
                if (category) params.append('category_slug', category);
                if (per_page) params.append('per_page', per_page);
                if (page) params.append('page', page);
                if (brand_id) params.append('brand_id', brand_id);
                if (order_by) params.append('order_by', order_by);
                if (order_direction) params.append('order_direction', order_direction);
                return `posts?${params.toString()}`;
            },
            providesTags: (result) =>
                result?.data
                    ? [
                        ...result.data.map(({ id }) => ({ type: 'Product', id })),
                        { type: 'Products', id: 'CATEGORY' },
                    ]
                    : [{ type: 'Products', id: 'CATEGORY' }],
        }),
        // getProductsByCategory: builder.query({
        //     query: (category) => `posts?term_type=products&category_slug=${category}&per_page=100`,
        //     providesTags: (result) =>
        //         result?.data
        //             ? [
        //                 ...result.data.map(({ id }) => ({ type: 'Product', id })),
        //                 { type: 'Products', id: 'CATEGORY' },
        //             ]
        //             : [{ type: 'Products', id: 'CATEGORY' }],
        // }),

        // Get featured/recommended products
        getFeaturedProducts: builder.query({
            query: ({ limit = 10 } = {}) => `/product/featured?limit=${limit}`,
            providesTags: [{ type: 'Products', id: 'FEATURED' }],
        }),

        // Get best selling products
        getBestSellingProducts: builder.query({
            query: ({ limit = 10 } = {}) => `/product/best-selling?limit=${limit}`,
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

        // Get new products
        getNewArrivalsProducts: builder.query({
            query: ({ categorySlug, perPage = 20, page = 1 } = {}) => {
                const params = new URLSearchParams();
                params.append('term_type', 'products');
                params.append('order_by', 'created_at');
                params.append('order_direction', 'desc');
                if (categorySlug) params.append('category_slug', categorySlug);
                if (perPage) params.append('per_page', perPage);
                if (page) params.append('page', page);
                return `posts?${params.toString()}`;
            },
            providesTags: (result) =>
                result?.data
                    ? [
                        ...result.data.map(({ id }) => ({ type: 'Product', id })),
                        { type: 'Products', id: 'NEW_ARRIVALS' },
                    ]
                    : [{ type: 'Products', id: 'NEW_ARRIVALS' }],
        }),


        // Get products by generic name
        getProductsByGeneric: builder.query({
            query: ({ genericName, perPage = 15, page = 1, sort = 'name:asc' } = {}) => {
                const params = new URLSearchParams();
                if (perPage) params.append('per_page', perPage);
                if (page) params.append('page', page);
                if (sort) params.append('sort', sort);
                return `products/by-generic/${encodeURIComponent(genericName)}?${params.toString()}`;
            },
            providesTags: (result) =>
                result?.data
                    ? [
                        ...result.data.map(({ id }) => ({ type: 'Product', id })),
                        { type: 'Products', id: 'GENERIC' },
                    ]
                    : [{ type: 'Products', id: 'GENERIC' }],
        }),

        // Get products by offer slug
        getOfferProducts: builder.query({
            query: ({ slug, perPage = 20, page = 1 } = {}) => {
                const params = new URLSearchParams();
                if (perPage) params.append('per_page', perPage);
                if (page) params.append('page', page);
                return `offers/${slug}/products?${params.toString()}`;
            },
            providesTags: (result) =>
                result?.data
                    ? [
                        ...result.data.map(({ id }) => ({ type: 'Product', id })),
                        { type: 'Products', id: 'OFFER' },
                    ]
                    : [{ type: 'Products', id: 'OFFER' }],
        }),


        // Get products by manufacturer
        getProductsByManufacturer: builder.query({
            query: ({ manufacturerSlug, perPage = 15, page = 1, order_by = 'created_at', order_direction = 'desc' } = {}) => {
                const params = new URLSearchParams();
                params.append('term_type', 'products');
                params.append('product_type', 'medicine');
                if (manufacturerSlug) params.append('manufacturer', manufacturerSlug);
                if (perPage) params.append('per_page', perPage);
                if (page) params.append('page', page);
                if (order_by) params.append('order_by', order_by);
                if (order_direction) params.append('order_direction', order_direction);
                return `posts?${params.toString()}`;
            },
            providesTags: (result) =>
                result?.data
                    ? [
                        ...result.data.map(({ id }) => ({ type: 'Product', id })),
                        { type: 'Products', id: 'MANUFACTURER' },
                    ]
                    : [{ type: 'Products', id: 'MANUFACTURER' }],
        }),

        // Get brands
        getBrands: builder.query({
            query: ({ page = 1, per_page = 1000, order_by = 'order_column', order_direction = 'asc' } = {}) => {
                const params = new URLSearchParams();
                if (page) params.append('page', page);
                if (per_page) params.append('per_page', per_page);
                if (order_by) params.append('order_by', order_by);
                if (order_direction) params.append('order_direction', order_direction);
                return `brands?${params.toString()}`;
            },
            providesTags: [{ type: 'Brands', id: 'LIST' }],
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
    useGetNewArrivalsProductsQuery,
    useGetOfferProductsQuery,
    useGetProductsByGenericQuery,
    useGetProductsByManufacturerQuery,
    useGetBrandsQuery,
} = productsApi;
