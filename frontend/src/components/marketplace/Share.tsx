import React, { FC } from "react";

interface ShareProps {
  asset_type: string;
  exchange: string;
  name: string;
  symbol: string;
}

const Share: FC<ShareProps> = ({ asset_type, exchange, name, symbol }) => {
  return (
    <div className="flex flex-row justify-between w-full py-4 px-3">
      <div className="flex flex-row items-center gap-2">
        <span>IMG</span>
        <span className="text-white font-semibold text-sm">{name}</span>
      </div>
      <div className="flex gap-8 text-sm">
        <span className="text-white font-semibold text-sm">1.235</span>
        <span className="text-white font-semibold text-sm">1.577</span>
        <span className="text-emerald-500 font-semibold text-sm">+0.67</span>
      </div>
    </div>
  );
};

export default Share;
