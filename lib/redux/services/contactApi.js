import { baseApi } from './baseApi';

export const contactApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createContact: builder.mutation({
            query: (contactData) => ({
                url: '/contacts/create',
                method: 'POST',
                body: contactData,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useCreateContactMutation } = contactApi;
