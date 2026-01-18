import { baseApi } from './baseApi';

/**
 * Cart API service
 * Handles cart operations with server synchronization
 */
export const cartApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Get user's cart
        getCart: builder.query({
            query: () => '/cart',
            providesTags: ['Cart'],
        }),

        // Add item to cart
        addToCart: builder.mutation({
            query: (item) => ({
                url: '/cart/items',
                method: 'POST',
                body: item,
            }),
            invalidatesTags: ['Cart'],
        }),

        // Update cart item quantity
        updateCartItem: builder.mutation({
            query: ({ itemId, quantity }) => ({
                url: `/cart/items/${itemId}`,
                method: 'PATCH',
                body: { quantity },
            }),
            invalidatesTags: ['Cart'],
        }),

        // Remove item from cart
        removeFromCart: builder.mutation({
            query: (itemId) => ({
                url: `/cart/items/${itemId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart'],
        }),

        // Clear entire cart
        clearCart: builder.mutation({
            query: () => ({
                url: '/cart',
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart'],
        }),
    }),

    overrideExisting: false,
});

// Export hooks for usage in components
export const {
    useGetCartQuery,
    useAddToCartMutation,
    useUpdateCartItemMutation,
    useRemoveFromCartMutation,
    useClearCartMutation,
} = cartApi;
