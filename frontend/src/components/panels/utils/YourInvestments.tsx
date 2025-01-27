import { FC, useEffect } from "react";
import MoneyDetails from "./MoneyDetails";
import mainService from "../../../services/service";
import { useState } from "react";

const YourInvestments: FC = () => {
  const [userShares, setUserShares] = useState([{}]);
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    mainService.getUserHistory().then((data) => {
      setUserShares(data);
    });
  }, []);

  useEffect(() => {
    if (userShares.length === 0) return;
    console.log(userShares);
    const summarizeTransactions = (userShares: any) => {
      return userShares.reduce((acc: any, userShare: any) => {
        const { symbol, transaction_type, quantity, total_cost } = userShare;
        const qty = parseFloat(quantity);
        const cost = parseFloat(total_cost);

        if (!acc[symbol]) {
          acc[symbol] = { buys: 0, sells: 0, total_cost: 0 };
        }

        if (transaction_type === "BUY") {
          acc[symbol].buys += qty;
          acc[symbol].total_cost += cost;
        } else if (transaction_type === "SELL") {
          acc[symbol].sells += qty;
        }

        return acc;
      }, {});
    };

    const calculateNetQuantities = (summary: any) => {
      return Object.keys(summary).map((symbol) => ({
        symbol,
        net: summary[symbol].buys - summary[symbol].sells,
        avgPrice:
          summary[symbol].buys !== 0
            ? parseFloat(
                (summary[symbol].total_cost / summary[symbol].buys).toFixed(2)
              )
            : 0,
      }));
    };

    const summaryData = summarizeTransactions(userShares);
    const netData: any = calculateNetQuantities(summaryData);
    setSummary(netData);
  }, [userShares]);

  return (
    <div
      className="flex flex-col space-y-6 h-full flex-1 bg-zinc-900 text-white p-2 rounded-lg shadow-lg overflow-y-auto cursor-pointer"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "#4b5563 #2c2f35",
      }}
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold flex justify-center pb-2">
          Your Investments
        </h2>
        <MoneyDetails text="Total Balance" amount={1234} />
      </div>

      {/* Investments List */}
      <div className="space-y-4">
        {summary.map((investment: any, index: number) => (
          <div
            key={index}
            className="bg-zinc-800 rounded-xl shadow-md p-4 space-y-3 transform hover:scale-[1.02] transition-transform duration-200"
          >
            {/* Investment Header */}
            <div className="flex justify-between items-center">
              <p className="text-lg font-medium">{investment.symbol}</p>
              <p className="text-lg font-medium">{investment.avgPrice}</p>
            </div>

            {/* Quantity and Value */}
            <div className="flex justify-between text-sm text-gray-300">
              Quantity: {investment.net}
            </div>

            {/* Buy vs. Current Price */}
            <div className="flex justify-between items-center text-sm"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourInvestments;
