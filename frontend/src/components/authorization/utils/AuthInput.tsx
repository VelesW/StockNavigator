import { FC, ReactNode } from "react"
interface AuthInputProps {
    placeholder: string
    icon: ReactNode
}

const AuthInput: FC<AuthInputProps> = ({placeholder, icon}) => {

    return (
        <div className="flex flex-row border-b-2 border-main-text mb-2 mt-2">
            <div className="flex items-center justify-center text-emerald-500">
                {icon}
            </div>
            <input 
                placeholder={placeholder}
                type="text"
                className="bg-transparent py-2 px-3 focus:outline-none placeholder-main-text"
            />
        </div>
    )
}

export default AuthInput