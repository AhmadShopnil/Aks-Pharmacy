import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * Base API configuration for RTK Query
 * All API services will extend from this base configuration
 */
export const baseApi = createApi({
    reducerPath: 'api',

    // Base query configuration
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',

        // Prepare headers for requests
        prepareHeaders: (headers, { getState }) => {
            //  authentication tokens here
            // const token = getState().auth?.token;
            // if (token) {
            //   headers.set('authorization', `Bearer ${token}`);
            // }

            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),

    // Tag types for cache invalidation
    tagTypes: ['Products', 'Product', 'Cart', 'User', 'Categories'],

    // Endpoints will be injected by individual API services
    endpoints: () => ({}),
});
