import React, { FC, useEffect } from "react";
import mainService from "../../services/service.ts";

interface HistoryModalProps {
  onClose: () => void;
}

const HistoryModal: FC<HistoryModalProps> = ({ onClose }) => {
  useEffect(() => {
    mainService
      .getUserHistory()
      .then((data) => {
        console.log(data);
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
        here
      </div>
    </div>
  );
};

export default HistoryModal;
