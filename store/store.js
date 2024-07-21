import { configureStore } from "@reduxjs/toolkit";
import { coinGeckoApi } from "@/services/coinGeckoApi";
import { cryptoCompareApi } from "@/services/cryptoCompareApi";

export const store = configureStore({
  reducer: {
    [coinGeckoApi.reducerPath]: coinGeckoApi.reducer,
    [cryptoCompareApi.reducerPath]: cryptoCompareApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      coinGeckoApi.middleware,
      cryptoCompareApi.middleware
    ),
});
