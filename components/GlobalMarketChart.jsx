import {
  useGetBTCPriceQuery,
  useGetETHPriceQuery,
  useGetLTCPriceQuery,
} from "@/services/coinGeckoApi";
import { useGetHourlyMarketCapHistoryQuery } from "@/services/cryptoCompareApi";
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
  TimeScale,
  LogarithmicScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  LogarithmicScale,
  annotationPlugin
);

const GlobalMarketChart = () => {
  const {
    data: btcMarketCapHistory,
    isLoading: isLoadingBTC,
    error: errorBTC,
  } = useGetHourlyMarketCapHistoryQuery("BTC");
  const {
    data: ethMarketCapHistory,
    isLoading: isLoadingETH,
    error: errorETH,
  } = useGetHourlyMarketCapHistoryQuery("ETH");
  const {
    data: ltcMarketCapHistory,
    isLoading: isLoadingLTC,
    error: errorLTC,
  } = useGetHourlyMarketCapHistoryQuery("LTC");

  const { data: btcPriceData } = useGetBTCPriceQuery();
  const { data: ethPriceData } = useGetETHPriceQuery();
  const { data: ltcPriceData } = useGetLTCPriceQuery();

  if (isLoadingBTC || isLoadingETH || isLoadingLTC)
    return <div>Loading chart data...</div>;
  if (errorBTC || errorETH || errorLTC)
    return <div>Error loading chart data</div>;

  const formatMarketCapData = (data, currentPrice) => {
    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }
    const now = Date.now();
    const oneDayAgo = now - 24 * 60 * 60 * 1000;
    return data.slice(-24).map((item, index) => ({
      time: new Date(oneDayAgo + index * 60 * 60 * 1000),
      marketCap: (item.close || item.volume || 0) * currentPrice,
    }));
  };

  const btcPriceUSD = btcPriceData?.bitcoin?.usd || 0;
  const ethPriceUSD = ethPriceData?.ethereum?.usd || 0;
  const ltcPriceUSD = ltcPriceData?.litecoin?.usd || 0;

  const formattedBTCData = formatMarketCapData(
    btcMarketCapHistory?.Data || [],
    btcPriceUSD
  );
  const formattedETHData = formatMarketCapData(
    ethMarketCapHistory?.Data || [],
    ethPriceUSD
  );
  const formattedLTCData = formatMarketCapData(
    ltcMarketCapHistory?.Data || [],
    ltcPriceUSD
  );

  const chartData = {
    labels: formattedBTCData.map((item) => item.time),
    datasets: [
      {
        label: "BTC Market Cap",
        data: formattedBTCData.map((item) => ({
          x: item.time,
          y: item.marketCap,
        })),
        borderColor: "rgba(247, 147, 26, 0.8)",
        backgroundColor: "rgba(247, 147, 26, 0.2)",
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
        tension: 0.4,
        cubicInterpolationMode: "monotone",
      },
      {
        label: "ETH Market Cap",
        data: formattedETHData.map((item) => ({
          x: item.time,
          y: item.marketCap,
        })),
        borderColor: "rgba(98, 126, 234, 0.8)",
        backgroundColor: "rgba(98, 126, 234, 0.2)",
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
        tension: 0.4,
        cubicInterpolationMode: "monotone",
      },
      {
        label: "LTC Market Cap",
        data: formattedLTCData.map((item) => ({
          x: item.time,
          y: item.marketCap,
        })),
        borderColor: "rgba(191, 191, 191, 0.8)",
        backgroundColor: "rgba(191, 191, 191, 0.2)",
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
        tension: 0.4,
        cubicInterpolationMode: "monotone",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white",
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Cryptocurrency Market Cap (Last 24 Hours)",
        color: "white",
        font: {
          size: 18,
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "hour",
          tooltipFormat: "MMM d, yyyy HH:mm",
          displayFormats: {
            hour: "HH:mm",
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "white",
        },
      },
      y: {
        type: "logarithmic",
        title: {
          display: true,
          text: "Market Cap (USD)",
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "white",
          callback: function (value) {
            return "$" + (value / 1e9).toFixed(2) + "B";
          },
        },
        min:
          Math.min(
            ...formattedBTCData.map((d) => d.marketCap),
            ...formattedETHData.map((d) => d.marketCap),
            ...formattedLTCData.map((d) => d.marketCap)
          ) * 0.95,
        max:
          Math.max(
            ...formattedBTCData.map((d) => d.marketCap),
            ...formattedETHData.map((d) => d.marketCap),
            ...formattedLTCData.map((d) => d.marketCap)
          ) * 1.05,
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    animation: {
      duration: 1000,
    },
    hover: {
      mode: "index",
      intersect: false,
    },
  };

  return (
    <div className="mt-8 bg-gray-900 p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Cryptocurrency Market Cap (Last 24 Hours)
      </h2>
      <div style={{ height: "600px" }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default GlobalMarketChart;
