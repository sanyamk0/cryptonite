import { useState } from "react";
import Link from "next/link";
import { GiLightningShield } from "react-icons/gi";
import { FaRegSun } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { useGetCoinListQuery } from "@/services/coinGeckoApi";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: coins } = useGetCoinListQuery();

  const filteredCoins = coins
    ?.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 5);

  return (
    <header className="min-w-fit flex justify-between items-center mx-auto px-2 py-1 mt-3 border-2 border-solid rounded-full">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-2xl font-bold">
            <GiLightningShield className="h-8 w-8" />
          </span>
        </Link>
        <div className="relative w-[400px] flex items-center border-2 border-black rounded-full pl-2 mx-2">
          <IoIosSearch className="h-6 w-6" />
          <input
            type="text"
            className="w-full py-1.5 px-3 outline-none bg-transparent rounded-full"
            placeholder="Search Coins..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <ul className="absolute top-[34px] left-0 z-10 bg-white text-black mt-1 w-full rounded shadow-lg">
              {filteredCoins?.map((coin) => (
                <li key={coin.id} className="p-2 hover:bg-gray-100">
                  <Link href={`/coin/${coin.id}`}>
                    <span>
                      {coin.name} ({coin.symbol.toUpperCase()})
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex items-center">
          <Link href="/explore">
            <span className="mr-4 font-semibold">Explore</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
