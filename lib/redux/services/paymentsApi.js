import { baseApi } from './baseApi';

export const paymentsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        initiatePayment: builder.mutation({
            query: (paymentData) => ({
                url: '/payments/initiate',
                method: 'POST',
                body: paymentData,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useInitiatePaymentMutation } = paymentsApi;
