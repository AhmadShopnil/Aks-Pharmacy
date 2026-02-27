import { baseApi } from './baseApi';

export const ordersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Fetch all orders for the authenticated user
        getOrders: builder.query({
            query: ({ page = 1 } = {}) => ({
                url: `/orders?page=${page}`,
                method: 'GET',
            }),
            providesTags: (result) =>
                result?.data
                    ? [
                        ...result.data.map(({ id }) => ({ type: 'Orders', id })),
                        { type: 'Orders', id: 'LIST' },
                    ]
                    : [{ type: 'Orders', id: 'LIST' }],
        }),

        // Fetch a single order by ID
        getOrderById: builder.query({
            query: (id) => ({
                url: `/orders/${id}`, // Assuming this endpoint exists, or fallback to filtering/another API
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'Orders', id }],
        }),
    }),
    overrideExisting: false,
});

export const { useGetOrdersQuery, useGetOrderByIdQuery } = ordersApi;
