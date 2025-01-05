import Marketplace from "../components/marketplace/Marketplace";

const MainPage = () => {
  return (
    <div className="w-[100dvw] flex flex-row min-h-screen bg-zinc-900 overflow-x-hidden">
      <h1>main</h1>
      <Marketplace />
    </div>
  );
};

export default MainPage;
