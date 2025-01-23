import { FC } from "react";
import MoneyDetails from "./MoneyDetails";

const investments = [
  {
    name: "BTC",
    quantity: 1.25,
    buyPrice: 100000,  // Buy price for each coin
    currentPrice: 90000, // Current price per coin
    change: -10000, // Difference from buy price
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
  {
    name: "XRP",
    quantity: 50,
    buyPrice: 1,
    currentPrice: 1.3,
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

const YourInvestments = () => {
  return (
    <div 
        className="flex h-full flex-1 flex-col space-y-4 overflow-y-auto" 
        style={{
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "#4b5563 #2c2f35",
        }}>
      <p className="text-xl font-semibold text-white">Your Investments</p>
      <MoneyDetails text="Balance" amount={1234} />

      {/* Wrapper for scrollable container */}
      <div className="flex flex-col h-full overflow-y-auto space-y-4 pr-2">
        {investments.map((investment, index) => (
          <div
            key={index}
            className="bg-zinc-700 p-4 rounded-lg shadow-md flex flex-col space-y-3"
          >
            <div className="flex justify-between items-center">
              <p className="text-white font-semibold text-lg">{investment.name}</p>
              <p
                className={`${
                  investment.change > 0 ? "text-green-500" : "text-red-500"
                } font-semibold`}
              >
                {investment.change < 0 ? `-${Math.abs(investment.change)}` : `+${investment.change}`}
              </p>
            </div>

            {/* Cryptocurrency bought and current value display */}
            <div className="flex justify-between items-center text-sm">
              <p>
                <span className="font-medium">{investment.quantity} {investment.name}</span> @{" "}
                <span className="font-medium">{investment.buyPrice}</span>
              </p>
              <p>
                <span className="font-medium">{investment.quantity * investment.currentPrice}</span>
              </p>
            </div>
            
            {/* Value difference */}
            <div className="text-sm">
              <p
                className={`${
                  investment.change < 0 ? "text-red-500" : "text-green-500"
                } font-semibold`}
              >
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourInvestments;
