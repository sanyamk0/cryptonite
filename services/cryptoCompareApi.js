import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const CRYPTOCOMPARE_API_KEY = process.env.NEXT_PUBLIC_CRYPTOCOMPARE_API_KEY;

const cryptocompareBaseQuery = fetchBaseQuery({
  baseUrl: "https://min-api.cryptocompare.com/data",
  prepareHeaders: (headers) => {
    headers.set("authorization", `Apikey ${CRYPTOCOMPARE_API_KEY}`);
    return headers;
  },
});

export const cryptoCompareApi = createApi({
  reducerPath: "cryptoCompareApi",
  baseQuery: cryptocompareBaseQuery,
  endpoints: (builder) => ({
    getHourlyMarketCapHistory: builder.query({
      query: (symbol) => {
        const now = Math.floor(Date.now() / 1000);
        const oneDayAgo = now - 24 * 60 * 60;

        return {
          url: "/v2/histohour",
          params: {
            fsym: symbol,
            tsym: "USD",
            limit: 24,
            toTs: now,
            aggregate: 1,
          },
        };
      },
      transformResponse: (response) => response.Data,
    }),
  }),
});

export const { useGetHourlyMarketCapHistoryQuery } = cryptoCompareApi;
