import { FC, ReactNode } from "react"
interface AuthInputProps {
    type: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string
    icon: ReactNode
}

const AuthInput: FC<AuthInputProps> = ({
    type,
    value,
    onChange,
    placeholder,
    icon,
}) => {

    return (
        <div className="flex flex-row border-b-2 border-main-text mb-2 mt-2">
            <div className="flex items-center justify-center text-emerald-500">
                {icon}
            </div>
            <div>
                <input 
                    placeholder={placeholder}
                    type={type}
                    className="bg-transparent py-2 px-3 focus:outline-none placeholder-main-text"
                    value={value}
                    onChange={onChange}
                    required
                />
            </div>
        </div>
    )
}

export default AuthInput