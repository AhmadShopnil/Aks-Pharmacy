import { BASE_URL } from '@/lib/baseUrl';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const getCookie = (name) => {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
};

export const baseApi = createApi({
  reducerPath: 'api',

  baseQuery: fetchBaseQuery({
    baseUrl: '/api/proxy/api/v1',
    // baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '/api/proxy/api/v1',
    credentials: 'include',

    prepareHeaders: (headers, { getState }) => {
      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');
      headers.set('X-Requested-With', 'XMLHttpRequest');

      const state = getState();
      const token = state.user?.token;
      // console.log('Auth token attached to request', state)

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
        // console.log('Auth token attached to request'); // User can verify in Browser Console
      }

      const xsrfToken = getCookie('XSRF-TOKEN');
      if (xsrfToken) {
        headers.set('X-XSRF-TOKEN', xsrfToken);
      }

      return headers;
    },
  }),

  tagTypes: ['Products', 'Product', 'Cart', 'User', 'Categories', 'Addresses', 'Orders'],
  endpoints: () => ({}),
});