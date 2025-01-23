import LogoPart from "../utils/LogoPart";
import MoneyButtons from "../utils/MoneyButtons";
import MoneyDetails from "../utils/MoneyDetails";
import YourInvestments from "../utils/YourInvestments";

const LeftPanel = () => {
    return (
        <div className="h-full flex flex-col w-[600px] max-h-screen mr-4 bg-zinc-800 ring-1 ring-inset ring-gray-500/40 p-3.5">
            <div className="flex flex-col h-full p-3.5 space-y-3 bg-zinc-900">
                <LogoPart />
                <MoneyDetails text="Free funds" amount={123} />
                <MoneyButtons />
                <hr />
                <YourInvestments />
            </div>
        </div>
    );
};

export default LeftPanel;
