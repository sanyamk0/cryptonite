import { useState } from "react";
import Link from "next/link";
import { GiLightningShield } from "react-icons/gi";
import { FaRegSun } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <header className="min-w-fit flex justify-between items-center mx-auto px-2 py-1 mt-3 border-2 border-solid rounded-full">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-2xl font-bold">
            <GiLightningShield className="h-8 w-8" />
          </span>
        </Link>
        <div className="w-[400px] flex items-center border-2 border-black rounded-full pl-2 mx-2">
          <IoIosSearch className="h-6 w-6" />
          <input
            type="text"
            className="w-full py-1.5 px-3 outline-none bg-transparent rounded-full"
            placeholder="Search Coins..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* ToDo: search suggestions */}
        </div>
        <div className="flex items-center">
          <Link href="/explore">
            <span className="mr-4 font-semibold">Explore</span>
          </Link>
          {/* Toggle Theme */}
          <button>
            <FaRegSun className="h-8 w-8" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
