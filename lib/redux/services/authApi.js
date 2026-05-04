import { baseApi } from './baseApi';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
                validateStatus: (response, result) => {
                    return response.status >= 200 && response.status <= 299 && result?.success !== false && !result?.error;
                },
            }),
            invalidatesTags: ['User'],
        }),
        register: builder.mutation({
            query: (userData) => ({
                url: '/register',
                method: 'POST',
                body: userData,
                validateStatus: (response, result) => {
                    return response.status >= 200 && response.status <= 299 && result?.success !== false && !result?.error;
                },
            }),
            invalidatesTags: ['User'],
        }),
    }),
    overrideExisting: false,
});

export const { useLoginMutation, useRegisterMutation } = authApi;
