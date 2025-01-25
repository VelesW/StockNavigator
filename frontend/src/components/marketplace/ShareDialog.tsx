import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FaMinus, FaPlus } from "react-icons/fa";
import mainService from "../../services/service.ts";
import axios from "axios";
import {
  GlobalQuote,
  ShareDialogProps,
  ChartConfig,
} from "../../interfaces/interfaces.ts";
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
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface BuyShareResponse {
  success: boolean;
  total_cost: number;
}

const ShareDialog: React.FC<ShareDialogProps> = ({ item, onClose }) => {
  const [counter, setCounter] = useState(0);
  const [shareDetails, setShareDetails] = useState<GlobalQuote | null>(null);
  const [chartConfig, setChartConfig] = useState<ChartConfig | null>(null);

  useEffect(() => {
    getShareDetails();
  }, []);

  const getShareDetails = async () => {
    try {
      const token = sessionStorage.getItem("access_token");
      const res = await axios.get(
        "http://localhost:8000/api/shares/IBM/details/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const globalQuote = res.data["Global Quote"];
      setShareDetails(globalQuote);
      const config = getChart(globalQuote);
      setChartConfig(config);
    } catch (error) {
      console.log(error);
    }
  };

  const getChart = (globalQuote: any): ChartConfig => {
    const high = parseFloat(globalQuote["03. high"]);
    const low = parseFloat(globalQuote["04. low"]);
    const price = parseFloat(globalQuote["05. price"]);

    const dataset = Array.from({ length: 7 }, () => {
      const val = Math.random() * (high - low) + low;
      return parseFloat(val.toFixed(2));
    });

    const finalDataset = [
      parseFloat(low.toFixed(2)),
      ...dataset,
      parseFloat(high.toFixed(2)),
      parseFloat(price.toFixed(2)),
    ];

    const labels = [
      "D1",
      "D2",
      "D3",
      "D4",
      "D5",
      "D6",
      "D7",
      "D8",
      "D9",
      "D10",
    ];

    const data = {
      labels,
      datasets: [
        {
          label: "",
          data: finalDataset,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {},
      scales: {
        y: {
          min: parseFloat(low.toFixed(0)) - 10,
          max: parseFloat(high.toFixed(0)) + 10,
          ticks: {
            color: "#ffffff",
          },
        },
        x: {
          ticks: {
            color: "#ffffff",
          },
        },
      },
    };

    return { data, options };
  };

  const handleBgClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const buySingleShare = (amount: number, symbol: string) => {
    mainService
      .buyShare(symbol, amount)
      .then((data: BuyShareResponse) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const sellShare = (amount: number, symbol: string) => {
    mainService
      .sellShare(symbol, amount)
      .then((data: BuyShareResponse) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleBgClick}
    >
      <div className="bg-zinc-800 ring-1 ring-inset ring-gray-500/50 rounded-xl shadow-xl w-[900px] max-w-[95%] p-6 relative flex flex-col">
        <span
          className="absolute top-2 right-2 p-1 bg-zinc-900 rounded-full border-[1px] border-zinc-500 cursor-pointer"
          onClick={onClose}
        >
          <IoClose size={20} className="text-zinc-500" />
        </span>
        <div className="flex flex-row gap-4">
          <h3 className="text-white font-semibold">{item.name}</h3>
          <h3 className="text-zinc-500">{item.symbol}</h3>
        </div>
        <div className="flex flex-row gap-4 mt-4 items-center">
          <button
            className="px-8 py-1 text-zinc-200 text-sm border-[1px] border-zinc-500 rounded-lg font-semibold"
            onClick={() => buySingleShare(counter, item.symbol)}
          >
            BUY
          </button>
          <div className="flex flex-row">
            <button
              className="bg-zinc-500 py-1 px-2 rounded-lg text-zinc-800 cursor-pointer"
              disabled={counter === 0}
              onClick={() => setCounter(counter - 1)}
            >
              <FaMinus size={18} />
            </button>
            <span className="px-2 text-white">{counter}</span>

            <button
              className="bg-zinc-500 py-1 px-2 rounded-lg text-zinc-800 cursor-pointer"
              onClick={() => setCounter(counter + 1)}
            >
              <FaPlus size={18} />
            </button>
          </div>
          <button
            className="px-8 py-1 text-white bg-emerald-500 text-sm border-[1px] border-emerald-500 rounded-lg font-semibold"
            onClick={() => sellShare(counter, item.symbol)}
          >
            SELL
          </button>
        </div>
        <div className="flex flex-row mt-4 gap-8">
          {shareDetails ? (
            <>
              <div className="flex flex-row">
                <h3 className="text-zinc-500 text-sm">Price:</h3>
                <h3 className="ml-4 text-white font-semibold text-sm">
                  {parseFloat(shareDetails["05. price"]).toFixed(2)}
                </h3>
              </div>
              <div className="flex flex-row">
                <h3 className="text-zinc-500 text-sm">Change:</h3>
                {parseFloat(shareDetails["10. change percent"]) > 0 ? (
                  <h3 className="ml-4 text-emerald-500 font-semibold text-sm">
                    {shareDetails["10. change percent"]}
                  </h3>
                ) : (
                  <h3 className="ml-4 text-red-500 font-semibold text-sm">
                    {shareDetails["10. change percent"]}
                  </h3>
                )}
              </div>
            </>
          ) : (
            <div className="text-zinc-500 text-sm">Loading Data...</div>
          )}
        </div>
        <div className="w-full bg-zinc-700 mt-4 rounded-lg">
          {chartConfig && (
            <div className="w-full">
              <Line data={chartConfig.data} options={chartConfig.options} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareDialog;
