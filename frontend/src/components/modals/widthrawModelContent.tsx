import React, { useState } from "react";

const WithdrawModalContent: React.FC<{ onSubmit: (amount: number) => void }> = ({ onSubmit }) => {
  const [amount, setAmount] = useState<number | "">("");

  const handleSubmit = () => {
    if (amount && amount > 0) {
      onSubmit(amount);
    } else {
      alert("Please enter a valid amount.");
    }
  };

  return (
    <div className="p-6 text-center bg-zinc-800">
      <h2 className="text-xl font-semibold mb-4 text-white">Withdraw Funds</h2>
      <p className="text-white mb-6">Enter the amount you want to withdraw:</p>
      <input
        type="number"
        className="w-full text-white px-4 py-2 bg-zinc-700 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <div className="flex justify-center gap-4">
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500"
          onClick={handleSubmit}
        >
          Withdraw
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-gray-500"
          onClick={() => setAmount("")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default WithdrawModalContent;
