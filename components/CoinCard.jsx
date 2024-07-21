import millify from "millify";
import Link from "next/link";

const CoinCard = ({ coin }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <Link href={`/coin/${coin.id}`}>
        <div className="cursor-pointer">
          <div className="flex justify-between items-start">
            <div className="flex flex-col items-center">
              <img
                src={coin.image}
                alt={coin.name}
                className="w-16 h-16 mb-2"
              />
              <h2 className="text-xl font-semibold">{coin.name}</h2>
              <p className="text-gray-600">{coin.symbol.toUpperCase()}</p>
            </div>
            <div>
              <p className="mt-2">Price: ${coin.current_price.toFixed(2)}</p>
              <p>Market Cap: ${millify(coin.market_cap)}</p>
            </div>
          </div>
          <div className="flex justify-between">
            <p className="text-green-500">
              24h High: ${coin.high_24h.toLocaleString()}
            </p>
            <p className="text-red-500">
              24h Low: ${coin.low_24h.toLocaleString()}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CoinCard;
