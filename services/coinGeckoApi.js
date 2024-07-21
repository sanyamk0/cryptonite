import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COINGECKO_API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;

const coinGeckoBaseQuery = fetchBaseQuery({
  baseUrl: "https://api.coingecko.com/api/v3",
  prepareHeaders: (headers) => {
    headers.set("x-cg-demo-api-key", COINGECKO_API_KEY);
    return headers;
  },
});

export const coinGeckoApi = createApi({
  reducerPath: "coinGeckoApi",
  baseQuery: coinGeckoBaseQuery,
  endpoints: (builder) => ({
    getBTCPrice: builder.query({
      query: () => "simple/price?ids=bitcoin&vs_currencies=usd",
    }),
    getETHPrice: builder.query({
      query: () => "simple/price?ids=ethereum&vs_currencies=usd",
    }),
    getLTCPrice: builder.query({
      query: () => "simple/price?ids=litecoin&vs_currencies=usd",
    }),
    getGlobalData: builder.query({
      query: () => "global",
      transformResponse: (response) => response.data,
    }),
    getCoinList: builder.query({
      query: (page = 1) => ({
        url: "coins/markets",
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 20,
          page,
          sparkline: false,
        },
      }),
    }),
    getCoinData: builder.query({
      query: (id) => `coins/${id}`,
    }),
    getPublicCompaniesHoldings: builder.query({
      query: () => "companies/public_treasury/bitcoin",
    }),
    getCoinPriceHistory: builder.query({
      query: ({ id, days }) => ({
        url: `coins/${id}/market_chart`,
        params: { vs_currency: "usd", days },
      }),
    }),
  }),
});

export const {
  useGetBTCPriceQuery,
  useGetETHPriceQuery,
  useGetLTCPriceQuery,
  useGetGlobalDataQuery,
  useGetCoinListQuery,
  useGetCoinDataQuery,
  useGetPublicCompaniesHoldingsQuery,
  useGetCoinPriceHistoryQuery,
} = coinGeckoApi;
