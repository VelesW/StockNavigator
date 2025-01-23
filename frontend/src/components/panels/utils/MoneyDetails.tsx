import { FC } from "react";

interface MoneyDetailsProps {
  text: string;
  amount: number;
}

const MoneyDetails: FC<MoneyDetailsProps> = ({ text, amount }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-zinc-800 rounded-xl shadow-lg transform hover:scale-[1.02] transition-transform duration-200">
      <p className="text-gray-300 text-lg font-medium">{text}:</p>
      <p className={`text-lg font-semibold ${amount >= 0 ? "text-green-400" : "text-red-400"}`}>
        ${amount.toFixed(2).toLocaleString()}
      </p>
    </div>
  );
};

export default MoneyDetails;
