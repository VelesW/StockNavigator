import { FC } from "react";
import { TbPigMoney } from "react-icons/tb";

interface ShareProps {
  asset_type: string;
  exchange: string;
  name: string;
  symbol: string;
  containerClass: string;
  onClick: () => void;
}

const Share: FC<ShareProps> = ({
  asset_type,
  exchange,
  name,
  symbol,
  containerClass,
  onClick,
}) => {
  return (
    <>
      <div
        className={`flex flex-row justify-between w-full py-4 px-3 cursor-pointer ${containerClass}`}
        onClick={onClick}
      >
        <div className="flex flex-row items-center gap-2">
          <span>
            <TbPigMoney size={24} className="text-emerald-500" />
          </span>
          <span className="text-white font-semibold text-sm">{name}</span>
        </div>
        <div className="flex flex-row gap-8 text-sm">
          <span className="flex-1 text-white font-semibold text-sm">
            {asset_type}
          </span>
          <span className="flex-1 text-white font-semibold text-sm">
            {exchange}
          </span>
          <span className="flex-1 text-white font-semibold text-sm">
            {symbol}
          </span>
        </div>
      </div>
    </>
  );
};

export default Share;
