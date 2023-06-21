import { ACCESS_KEY } from '@env';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const unsplashApi = createApi({
    reducerPath: 'unsplashApi',
    baseQuery: fetchBaseQuery({ baseUrl: `https://api.unsplash.com` }),
    endpoints: (builder) => ({
        getImagesByPageAndQuery: builder.query<UnsplashResults[], { currentPage: number, query?: string }>({
            query: ({ currentPage, query = 'tesla' }) => {
                return ({
                    url: `/search/photos`,
                    params: {
                        client_id: ACCESS_KEY,
                        page: currentPage,
                        query
                    },
                });
            },
            transformResponse: (response: UnsplashResponce) => {
                return response?.results.map(({
                    alt_description,
                    urls,
                    id,
                    width,
                    height,
                    user: { first_name, last_name },
                }: UnsplashResults) => ({
                    alt_description,
                    urls,
                    id,
                    height,
                    width,
                    user: { first_name, last_name },
                }));
            },
        }),
    }),
});

export const { useGetImagesByPageAndQueryQuery, useLazyGetImagesByPageAndQueryQuery } = unsplashApi;