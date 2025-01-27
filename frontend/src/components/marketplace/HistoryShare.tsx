import { FC, useEffect, useState } from "react";

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
  const [hour, setHour] = useState<any>();
  const [opeartionDate, setOpeartionDate] = useState<any>();

  useEffect(() => {
    const newDate = new Date(date);

    const padZero = (number: number) => number.toString().padStart(2, "0");

    const year = newDate.getUTCFullYear();
    const month = padZero(newDate.getUTCMonth() + 1);
    const day = padZero(newDate.getUTCDate());
    setOpeartionDate(`${year}-${month}-${day}`);

    const hours = padZero(newDate.getUTCHours());
    const minutes = padZero(newDate.getUTCMinutes());
    setHour(`${hours}:${minutes}`);
  }, []);

  return (
    <div className="w-full py-2 px-4 rounded-lg bg-zinc-900 flex flex-col gap-3">
      <div className="w-full flex flex-row gap-3 items-center">
        <span className="text-zinc-600 text-sm">
          {opeartionDate} {hour}
        </span>
        <span className="text-white text-sm font-semibold">
          {transactionType}
        </span>
        <span className="text-white text-sm font-semibold">
          For: {priceAtTransaction}
        </span>
      </div>
      <div className="w-full flex justify-between text-white">
        <span className="text-md">
          {symbol} - {quantity}
        </span>
        <span className="text-md font-semibold">Total: {totalCost}</span>
      </div>
    </div>
  );
};

export default HistoryShare;
