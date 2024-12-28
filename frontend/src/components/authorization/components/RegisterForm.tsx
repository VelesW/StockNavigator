import AuthHeader from "../utils/AuthHeader"
import AuthInput from "../utils/AuthInput"
import AuthButton from "../utils/AuthButton"
import SwitchAuthOption from "../utils/SwitchAuthOption"
import { FaLock, FaUser, FaEnvelope } from "react-icons/fa"
import { useState } from "react"

const RegisterForm = () => {

    const [email,setEmail] = useState<string>("")
    const [username,setUsername] = useState<string>("")
    const [password,setPassword] = useState<string>("")

    const handleRegister = () => {
        console.log("siema")
    }

    return (
        <form className="rounded-lg w-72 h-96 text-main-text bg-main-gray shadow-[6px_6px_20px_3px_rgba(0,0,0,0.7)] p-5 flex flex-col justify-center items-center font-exo">
            <AuthHeader 
                text="Sign up"
            />
            <AuthInput 
                type="text"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                }}
                placeholder="Email" 
                icon={<FaEnvelope/>}
            />
            <AuthInput
                type="text"
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUsername(e.target.value);
                }} 
                placeholder="Username" 
                icon={<FaUser/>}
            />
            <AuthInput 
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value);
                }}
                placeholder="Password" 
                icon={<FaLock/>}
            />
            <AuthButton 
                action="SIGN UP"
                handleClick={() => handleRegister()}
            />
            <SwitchAuthOption 
                text="Already have an account?" 
                linkName="Sign in" 
                path="/login"
            />
        </form>
    )
}

export default RegisterForm