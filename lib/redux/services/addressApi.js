import { baseApi } from './baseApi';

export const addressApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAddresses: builder.query({
            query: () => '/addresses',
            providesTags: ['Addresses'],
        }),
        getAddress: builder.query({
            query: (id) => `/addresses/${id}`,
            providesTags: (result, error, id) => [{ type: 'Addresses', id }],
        }),
        createAddress: builder.mutation({
            query: (addressData) => ({
                url: '/addresses',
                method: 'POST',
                body: addressData,
            }),
            invalidatesTags: ['Addresses'],
        }),
        updateAddress: builder.mutation({
            query: ({ id, ...addressData }) => ({
                url: `/addresses/${id}`,
                method: 'PUT',
                body: addressData,
            }),
            invalidatesTags: ['Addresses'],
        }),
        deleteAddress: builder.mutation({
            query: (id) => ({
                url: `/addresses/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Addresses'],
        }),
        setDefaultAddress: builder.mutation({
            query: (id) => ({
                url: `/addresses/${id}/set-default`,
                method: 'POST',
            }),
            invalidatesTags: ['Addresses'],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetAddressesQuery,
    useGetAddressQuery,
    useCreateAddressMutation,
    useUpdateAddressMutation,
    useDeleteAddressMutation,
    useSetDefaultAddressMutation,
} = addressApi;
