"use client";

import GlobalMarketChart from "@/components/GlobalMarketChart";
import Header from "@/components/Header";
import PublicCompanyHoldings from "@/components/PublicCompanyHoldings";

export default function Home() {
  return (
    <div className="min-w-fit">
      <Header />
      <main>
        <h1 className="text-center text-2xl font-bold my-4">
          Cryptonite - CryptoCurrency Tracker
        </h1>
        <GlobalMarketChart />
        <PublicCompanyHoldings />
      </main>
    </div>
  );
}
