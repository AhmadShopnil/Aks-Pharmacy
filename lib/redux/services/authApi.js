import { baseApi } from './baseApi';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
            transformResponse: (response) => {
               
                if (response.success === false) {
             
                    throw new Error(response.message || 'Login failed');
                }
                return response;
            },
            invalidatesTags: ['User'],
        }),
        register: builder.mutation({
            query: (userData) => ({
                url: '/register',
                method: 'POST',
                body: userData,
            }),
            transformResponse: (response) => {
                if (response.success === false) {
                    throw new Error(response.message || 'Registration failed');
                }
                return response;
            },
            invalidatesTags: ['User'],
        }),
    }),
    overrideExisting: false,
});

export const { useLoginMutation, useRegisterMutation } = authApi;
