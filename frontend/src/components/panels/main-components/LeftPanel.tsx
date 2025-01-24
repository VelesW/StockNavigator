import { FC, useEffect, useState } from "react";
import mainService from "../../../services/service";
import LogoPart from "../utils/LogoPart";
import MoneyButtons from "../utils/MoneyButtons";
import MoneyDetails from "../utils/MoneyDetails";
import YourInvestments from "../utils/YourInvestments";
import { PanelsProps } from "../../../pages/MainPage";

export interface UserDetails {
    balance: number,
    email: string,
    first_name: string,
    id: number,
    last_name: string,
    username: string,
}

export const baseUser: UserDetails = {
    balance: 0,
    email: "",
    first_name: "",
    id: 0,
    last_name: "",
    username: ""
  };

interface LeftPanelProps {

}

const LeftPanel: FC<PanelsProps> = ({userDetails, setUserDetails}) => {
    const [balance,setBalance] = useState<number>(baseUser.balance)
    
    useEffect(() => {
        mainService.getUserData().then((data) => {
            setUserDetails(data)
        })
        setBalance(userDetails.balance)
    },[balance])
    
    return (
        <div className="h-full flex flex-col w-[600px] max-h-screen mr-4 bg-zinc-800 ring-1 ring-inset ring-gray-500/40 p-3.5">
            <div className="flex flex-col h-full p-3.5 space-y-3 bg-zinc-900">
                <LogoPart firstName={userDetails.first_name} lastName={userDetails.last_name} email={userDetails.email}/>
                <MoneyDetails text="Free funds" amount={userDetails.balance} />
                <MoneyButtons balance={balance} setBalance={setBalance}/>
                <hr />
                <YourInvestments />
            </div>
        </div>
    );
};

export default LeftPanel;
