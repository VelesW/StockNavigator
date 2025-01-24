import React, { FC } from "react";

interface HistoryShareProps {
  date: any;
  priceAtTransaction: string;
  quantity: number;
  symbol: string;
  totalCost: string;
  transactionType: string;
}

const HistoryShare: FC<HistoryShareProps> = ({
  date,
  priceAtTransaction,
  quantity,
  symbol,
  totalCost,
  transactionType,
}) => {
  return <div className="w-full py-2 px-4 rounded-lg bg-zinc-900"></div>;
};

export default HistoryShare;
