import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import Share from "./Share";

const Marketplace = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [shares, setShares] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    try {
      const token = sessionStorage.getItem("access_token");
      const res = await axios.get("http://localhost:8000/api/shares/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const limitedShares = res.data.slice(0, 30);
      setShares(limitedShares);
      console.log(limitedShares);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex w-full justify-end items-center px-16 gap-8 py-8 bg-zinc-800 ring-1 ring-inset ring-gray-500/40 relative">
        <img src="/logo.png" alt="logo" className="w-[120px] absolute left-8" />
        <div className="flex justify-center relative">
          <div className="">
            <input
              type="text"
              className="w-[500px] max-w-[95%] rounded-lg py-1 px-3 text-sm bg-zinc-700"
              placeholder="Search..."
            />
            <FaSearch className="absolute top-[6px] text-zinc-500 right-10" />
          </div>
        </div>
        <a href="/" className="text-sm text-white font-semibold">
          Marketplace
        </a>
        <a href="/" className="text-sm text-white font-semibold">
          Profile
        </a>
      </div>
      <div className="mt-4 bg-zinc-800 w-full h-full flex flex-col items-center py-16 ring-1 ring-inset ring-gray-500/40">
        <div className="flex w-full max-w-[95%] flex-col">
          <div className="w-full flex justify-between text-zinc-500 text-sm">
            <div>
              <span>NAME</span>
            </div>
            <div className="flex gap-8">
              <span>SELL</span>
              <span>BUY</span>
              <span>INCREASE</span>
            </div>
          </div>
          <div className="flex flex-col">
            {shares.map((item: any, i) => (
              <Share
                key={i}
                asset_type={item.asset_type}
                exchange={item.exchange}
                name={item.name}
                symbol={item.symbol}
              ></Share>
            ))}
            <div className="flex flex-row justify-between w-full py-4 bg-zinc-900 px-3 rounded-lg">
              <div className="flex flex-row items-center gap-2">
                <span>IMG</span>
                <span className="text-white font-semibold text-sm">
                  Example
                </span>
              </div>
              <div className="flex gap-8 text-sm">
                <span className="text-white font-semibold text-sm">1.235</span>
                <span className="text-white font-semibold text-sm">1.577</span>
                <span className="text-emerald-500 font-semibold text-sm">
                  +0.67
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-[800px] max-w-[95%] flex-col mt-12">
          <div className="w-full flex items-center justify-center">
            <button className="text-white py-2 px-2 bg-emerald-500 rounded-lg">
              <FaChevronLeft />
            </button>
            <span className="px-4 text-white text-sm">1 2 .. 4</span>
            <button className="text-white py-2 px-2 bg-emerald-500 rounded-lg">
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
