import React from "react";
import { FaSearch } from "react-icons/fa";

const Marketplace = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="flex w-full justify-end items-center px-16 gap-8 py-8 bg-zinc-800">
        <div className="w-full flex justify-center relative">
          <div className="absolute -top-4">
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
      <div className="mt-4 bg-zinc-800 w-full h-full flex flex-col items-center py-16">
        <div className="flex w-[800px] max-w-[95%] flex-col">
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
            <div className="flex flex-row w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
