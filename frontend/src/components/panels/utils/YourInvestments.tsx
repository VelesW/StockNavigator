import { FC, useEffect } from "react";
import MoneyDetails from "./MoneyDetails";
import mainService from "../../../services/service";
import { useState } from "react";

const investments = [
  {
    name: "BTC",
    quantity: 1.25,
    buyPrice: 100000,
    currentPrice: 90000,
    change: -10000,
  },
  {
    name: "ETH",
    quantity: 2.75,
    buyPrice: 3500,
    currentPrice: 3200,
    change: -800,
  },
  {
    name: "SOL",
    quantity: 10,
    buyPrice: 50,
    currentPrice: 45,
    change: -5,
  },
  {
    name: "ADA",
    quantity: 100,
    buyPrice: 1.2,
    currentPrice: 1.5,
    change: 0.3,
  },
  {
    name: "XRP",
    quantity: 50,
    buyPrice: 1,
    currentPrice: 1.3,
    change: 0.3,
  },
];

const YourInvestments: FC = () => {

  const [userShares, setUserShares] = useState({})
  useEffect(() => {
    mainService.getUserShares().then((data) => {setUserShares(data)})
  },[])

  console.log(userShares)

  return (
    <div
      className="flex flex-col space-y-6 h-full flex-1 bg-zinc-900 text-white p-2 rounded-lg shadow-lg overflow-y-auto"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "#4b5563 #2c2f35",
      }}
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold flex justify-center pb-2">Your Investments</h2>
        <MoneyDetails text="Total Balance" amount={1234} />
      </div>

      {/* Investments List */}
      <div className="space-y-4">
        {investments.map((investment, index) => (
          <div
            key={index}
            className="bg-zinc-800 rounded-xl shadow-md p-4 space-y-3 transform hover:scale-[1.02] transition-transform duration-200"
          >
            {/* Investment Header */}
            <div className="flex justify-between items-center">
              <p className="text-lg font-medium">{investment.name}</p>
              <p
                className={`${
                  investment.change >= 0 ? "text-green-400" : "text-red-400"
                } font-semibold`}
              >
                {investment.change >= 0
                  ? `+${investment.change.toFixed(2)}`
                  : `${investment.change.toFixed(2)}`}
              </p>
            </div>

            {/* Quantity and Value */}
            <div className="flex justify-between text-sm text-gray-300">
              <p>
                <span className="font-medium">
                  {investment.quantity.toFixed(2)} {investment.name}
                </span>{" "}
                @ {investment.buyPrice.toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">
                  ${(investment.quantity * investment.currentPrice).toLocaleString()}
                </span>
              </p>
            </div>

            {/* Buy vs. Current Price */}
            <div className="flex justify-between items-center text-sm">
              <p className="text-gray-400">Buy Price:</p>
              <p>${investment.buyPrice.toLocaleString()}</p>
              <p className="text-gray-400">Current Price:</p>
              <p>${investment.currentPrice.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourInvestments;
