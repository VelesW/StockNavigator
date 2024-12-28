import { FC } from "react"

interface AuthButtonProps {
    action: string
}

const AuthButton: FC<AuthButtonProps> = ({action}) => {
    return (
        <div className="pt-0.5 pb-1 pl-7 pr-7 border-2 border-main-text mt-2 font-bold mb-2 mt-2 rounded-md">
            {action}
        </div>
        
    )
}

export default AuthButton