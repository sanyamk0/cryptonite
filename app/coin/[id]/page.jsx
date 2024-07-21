"use client";

import Header from "@/components/Header";
import {
  useGetCoinDataQuery,
  useGetCoinPriceHistoryQuery,
} from "@/services/coinGeckoApi";
import millify from "millify";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinPage = () => {
  const { id } = useParams();
  const {
    data: coinData,
    isLoading: isLoadingCoin,
    error: coinError,
  } = useGetCoinDataQuery(id);

  const {
    data: priceHistory,
    isLoading: isLoadingHistory,
    error: historyError,
  } = useGetCoinPriceHistoryQuery({ id, days: 30 });

  if (isLoadingCoin || isLoadingHistory) return <div>Loading...</div>;
  if (coinError || historyError)
    return <div>Error: {coinError?.message || historyError?.message}</div>;

  const chartData = {
    labels: priceHistory.prices.map((price) =>
      new Date(price[0]).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Price",
        data: priceHistory.prices.map((price) => price[1]),
        borderColor: "#2cff33",
        tension: 0.1,
        radius: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `${coinData.name} Price Chart (30 Days)`,
      },
    },
  };

  return (
    <div className="min-w-fit">
      <Header />
      <main className="p-1">
        <div className="my-4 flex flex-col">
          <img
            src={coinData.image.large}
            alt={coinData.name}
            className="w-14 h-14 mb-2"
          />
          <Link href={`${coinData.links.homepage[0 || 1 || 2 || 3 || 4]}`}>
            <span className="text-sm font-light">{coinData.name}</span>
          </Link>
          <span className="text-xl font-semibold">
            ${coinData.market_data.current_price.usd.toFixed(2)}
          </span>
        </div>
        <div className="my-3 overflow-auto">
          <Line data={chartData} options={chartOptions} />
        </div>
        <div className="flex flex-col">
          <p className="text-2xl font-semibold my-3">Fundamentals</p>
          {coinData.market_data.market_cap && (
            <p className="text-base font-light">
              Market Cap: ${millify(coinData.market_data.market_cap.usd)}
            </p>
          )}
          {coinData.market_data.total_supply && (
            <p className="text-base font-light">
              Total Supply: {coinData.market_data.total_supply}
            </p>
          )}
          {coinData.market_data.max_supply && (
            <p className="text-base font-light">
              Max Supply: {coinData.market_data.max_supply}
            </p>
          )}
          {coinData.market_data.circulating_supply && (
            <p className="text-base font-light">
              Circulating Supply: {coinData.market_data.circulating_supply}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <p className="text-2xl font-semibold my-3">About {coinData.name}</p>
          <p className="text-base">{coinData.description.en}</p>
        </div>
      </main>
    </div>
  );
};

export default CoinPage;
