import { FC } from "react";
import { Link } from "react-router-dom";

interface SwitchAuthOptionProps {
    text: string;
    linkName: string;
    path: string;
}

const SwitchAuthOption: FC<SwitchAuthOptionProps> = ({ text, linkName, path }) => {
    return (
        <div className="p-1">
            <p className="text-sm">{text} 
                <Link to={path} className="text-white font-bold ml-2">
                    {linkName}
                </Link>
            </p>
        </div>
    );
}

export default SwitchAuthOption;
