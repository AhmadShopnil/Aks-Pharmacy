import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',

  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://admin.akspharma.com.bd/api/v1',

    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),

  tagTypes: ['Products', 'Product', 'Cart', 'User', 'Categories'],
  endpoints: () => ({}),
});