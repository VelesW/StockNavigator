import Modal from "../../modals/modal"
import { useState } from "react";
import WithdrawModalContent from "../../modals/widthrawModelContent";
import DepositModalContent from "../../modals/depositModelContent";

const MoneyButtons = () => {
    
    const [activeModal, setActiveModal] = useState<"withdraw" | "deposit" | null>(null);

    const handleWithdraw = (amount: number) => {
        console.log(`Withdrew $${amount}`);
        setActiveModal(null);
    };

    const handleDeposit = (amount: number) => {
        console.log(`Deposited $${amount}`);
        setActiveModal(null);
    };
    return (
        <div className="flex w-full justify-between gap-[5px]">
            <button onClick={() => setActiveModal("deposit")} className="bg-blue-500 text-white font-semibold py-[10px] px-[20px] rounded-lg hover:bg-blue-600 transition-all duration-200 ease-in-out">
                Deposit
            </button>
            <button onClick={() => setActiveModal("withdraw")} className="bg-red-500 text-white font-semibold py-[10px] px-[20px] rounded-lg hover:bg-red-600 transition-all duration-200 ease-in-out">
                Withdraw
            </button>
            <Modal isOpen={activeModal === "withdraw"} onClose={() => setActiveModal(null)}>
            <   WithdrawModalContent onSubmit={handleWithdraw} />
            </Modal>

            <Modal isOpen={activeModal === "deposit"} onClose={() => setActiveModal(null)}>
                <DepositModalContent onSubmit={handleDeposit} />
            </Modal>
        </div>
    )
}

export default MoneyButtons