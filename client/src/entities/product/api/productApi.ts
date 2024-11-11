// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ProductT } from '../model/types';

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query<ProductT[], void>({
      query: () => `products`,
      providesTags: ['Products'],
    }),
    deleteProduct: builder.mutation<void, ProductT['id']>({
      // note: an optional `queryFn` may be used in place of `query`
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      //   invalidatesTags: ['Products'],
      // onQueryStarted is useful for optimistic updates
      // The 2nd parameter is the destructured `MutationLifecycleApi`
      async onQueryStarted(arg, { dispatch }) {
        dispatch(
          productApi.util.updateQueryData('getProducts', undefined, (draft) => {
            draft = draft.filter((product) => product.id !== arg);
            return draft;
          }),
        );
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProductsQuery, useDeleteProductMutation } = productApi;
