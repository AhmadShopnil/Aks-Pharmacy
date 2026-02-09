import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const baseApi = createApi({
    reducerPath: 'api',

    // Base query configuration
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.BASE_URL || 'https://admin.akspharma.com.bd/api/v1',

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
