import { FC } from "react";
import { FaChevronRight } from "react-icons/fa";
import Navbar from "../components/Navbar";

const DefaultPage: FC = () => {
  return (
    <div className="bg-zinc-900 min-h-screen w-screen flex flex-col items-center justify-center overflow-x-hidden">
      <Navbar />
      <div className="mx-auto w-full max-w-screen-xl h-full flex flex-col items-center justify-center mt-56">
        <h1 className="text-8xl text-white font-semibold text-center">
          Your Marketplace <br />{" "}
          <div className="flex flex-row gap-2">
            with <span className="text-emerald-500"> Investments</span>
            <img src="/growth-investment.svg" alt="" className="w-[100px]" />
          </div>
        </h1>
        <p className="text-zinc-400 mt-4 text-lg">
          Start your investing journey with confidence and ease. Get access to{" "}
          <br /> a wide range of stocks and build your portfolio for a
          successful future.
        </p>
        <div className="flex flex-row gap-6">
          <button className="mt-8 px-8 py-3 border-[1px] border-zinc-500 text-white font-semibold rounded-xl flex items-center justify-center text-lg gap-2 hover:bg-white hover:text-black hover:transition-all hover:duration-200">
            Learn More
          </button>
          <button className="mt-8 px-8 py-3 bg-emerald-500 text-white font-semibold rounded-xl flex items-center justify-center text-lg gap-2">
            Get Started
            <FaChevronRight />
          </button>
        </div>
      </div>
      <div className="mt-32 relative">
        <div className="flow-root h-dvh w-screen" id="clip">
          <div className="mask-clip-path -m-2 bg-gray-900/5 ring-1 p-2 ring-inset ring-gray-500/40 lg:-m-4 lg:rouned-2xl lg:p-4 absolute left-1/2 top-0 z-20 h-[60vh] w-96 origin-center -translate-x-1/2 overflow-hidden rounded-3xl md:w-[1000px]">
            <img
              src="/growth-investment.svg"
              alt="about"
              className="size-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultPage;
