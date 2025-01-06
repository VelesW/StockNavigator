import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { GlobalQuote, ApiResponse } from "../../interfaces/interfaces.ts";

interface ShareDialogProps {
  item: any;
  onClose: () => void;
}

const ShareDialog: React.FC<ShareDialogProps> = ({ item, onClose }) => {
  const [counter, setCounter] = useState(0);
  const [shareDetails, setShareDetails] = useState<GlobalQuote | null>(null);

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
      const price = parseFloat(globalQuote["05. price"]);
      getChart(price);
    } catch (error) {
      console.log(error);
    }
  };

  const getChart = (price: number) => {
    console.log(price);
  };

  const handleBgClick = (e: any) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
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
          <button className="px-8 py-1 text-zinc-200 text-sm border-[1px] border-zinc-500 rounded-lg font-semibold">
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
          <button className="px-8 py-1 text-white bg-emerald-500 text-sm border-[1px] border-emerald-500 rounded-lg font-semibold">
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
            <div className="text-zinc-500 text-sm">Ładowanie danych...</div>
          )}
        </div>
        <div className="w-full h-48 bg-black mt-4"></div>
      </div>
    </div>
  );
};

export default ShareDialog;
