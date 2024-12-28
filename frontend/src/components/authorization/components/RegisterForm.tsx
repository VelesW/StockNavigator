import AuthHeader from "../utils/AuthHeader"
import AuthInput from "../utils/AuthInput"
import AuthButton from "../utils/AuthButton"
import SwitchAuthOption from "../utils/SwitchAuthOption"
import { FaLock, FaUser, FaEnvelope } from "react-icons/fa"

const RegisterForm = () => {
    return (
        <form className="rounded-lg w-72 h-96 text-main-text bg-main-gray shadow-[6px_6px_20px_3px_rgba(0,0,0,0.7)] p-5 flex flex-col justify-center items-center font-exo">
            <AuthHeader text="Sign up"/>
            <AuthInput placeholder="Email" icon={<FaEnvelope/>}/>
            <AuthInput placeholder="Username" icon={<FaUser/>}/>
            <AuthInput placeholder="Password" icon={<FaLock/>}/>
            <AuthButton action="SIGN UP"/>
            <SwitchAuthOption 
                text="Already have an account?" 
                linkName="Sign in" 
                path="/login"
            />
        </form>
    )
}

export default RegisterForm