import React, { FC, useEffect, useState } from "react";
import mainService from "../../services/service.ts";
import HistoryShare from "../marketplace/HistoryShare.tsx";

interface HistoryModalProps {
  onClose: () => void;
}

const HistoryModal: FC<HistoryModalProps> = ({ onClose }) => {
  const [historyShares, setHistoryShares] = useState([]);

  useEffect(() => {
    mainService
      .getUserHistory()
      .then((data) => {
        console.log(data);
        const limitedShares = data.slice(0, 5);
        setHistoryShares(limitedShares);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }, []);

  const handleBgClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleBgClick}
    >
      <div className="bg-zinc-800 ring-1 ring-inset ring-gray-500/50 rounded-xl shadow-xl w-[600px] max-w-[95%] p-6 relative flex flex-col">
        <h1 className="w-full text-center text-white font-semibold text-lg mb-4">
          History
        </h1>
        <div className="flex flex-col gap-4">
          {historyShares.map((item: any, i) => (
            <HistoryShare
              key={i}
              date={item.date}
              priceAtTransaction={item.price_at_transaction}
              quantity={item.quantity}
              symbol={item.symbol}
              totalCost={item.total_cost}
              transactionType={item.transaction_type}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;
