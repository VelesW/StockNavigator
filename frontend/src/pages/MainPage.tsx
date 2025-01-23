import Marketplace from "../components/Marketplace";
import LeftPanel from "../components/panels/main-components/LeftPanel";
import { useState } from "react";

const MainPage = () => {
  return (
    <div className="w-[100dvw] h-screen p-2 flex max-h-screen flex-row bg-zinc-900 overflow-x-hidden">
      <LeftPanel />
      <Marketplace />
    </div>
  );
};

export default MainPage;
