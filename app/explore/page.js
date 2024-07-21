"use client";

import { useState } from "react";
import CoinCard from "@/components/CoinCard";
import Header from "@/components/Header";
import { useGetCoinListQuery } from "@/services/coinGeckoApi";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

const Explore = () => {
  const [page, setPage] = useState(1);
  const { data: coins, isLoading, error } = useGetCoinListQuery(page);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-w-fit">
      <Header />
      <main>
        <h1 className="text-center text-2xl font-bold my-4">
          Explore CryptoCurrencies
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-2">
          {coins.map((coin) => {
            return <CoinCard key={coin.id} coin={coin} />;
          })}
        </div>
        <div className="mt-8 mx-2 flex justify-between">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl disabled:opacity-50"
          >
            <MdOutlineNavigateBefore className="h-6 w-6" />
          </button>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl"
          >
            <MdOutlineNavigateNext className="h-6 w-6" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default Explore;
