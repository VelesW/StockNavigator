import Modal from "../../modals/modal";
import { FC, useState } from "react";
import WithdrawModalContent from "../../modals/widthrawModelContent";
import DepositModalContent from "../../modals/depositModelContent";
import sendRequest from "../../../services/sendRequest";
import mainService from "../../../services/service";

interface MoneyButtonsProps {
  balance: number;
  setBalance: (amount: number) => void;
}

const MoneyButtons: FC<MoneyButtonsProps> = ({setBalance, balance}) => {
  const [activeModal, setActiveModal] = useState<"withdraw" | "deposit" | null>(null);

  const handleWithdraw = (amount: number) => {
    if(balance>=amount){
      mainService.widthrawMoney(amount).then((data) => setBalance(data.balance));
      setActiveModal(null);
    } else {
      alert("Please enter a valid amount.");
    }
  };

  const handleDeposit = (amount: number) => {
    mainService.depositMoney(amount).then((data) => setBalance(data.balance));
    setActiveModal(null);
  };

  const onClose = () => {
    setActiveModal(null);
  };

  return (
    <div className="flex justify-between gap-4">
      <button
        onClick={() => setActiveModal("deposit")}
        className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-3 rounded-xl shadow-lg hover:from-green-600 hover:to-green-800 transition-transform transform hover:scale-105 focus:ring-4 focus:ring-green-900 focus:outline-none"
      >
        Deposit
      </button>
      <button
        onClick={() => setActiveModal("withdraw")}
        className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white font-bold py-3 rounded-xl shadow-lg hover:from-red-600 hover:to-red-800 transition-transform transform hover:scale-105 focus:ring-4 focus:ring-red-900 focus:outline-none"
      >
        Withdraw
      </button>
      <Modal isOpen={activeModal === "withdraw"} onClose={onClose}>
        <WithdrawModalContent onSubmit={handleWithdraw} onClose={onClose} />
      </Modal>
      <Modal isOpen={activeModal === "deposit"} onClose={onClose}>
        <DepositModalContent onSubmit={handleDeposit} onClose={onClose} />
      </Modal>
    </div>
  );
};

export default MoneyButtons;
