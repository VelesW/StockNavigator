import AuthHeader from "../utils/AuthHeader";
import AuthInput from "../utils/AuthInput";
import AuthButton from "../utils/AuthButton";
import SwitchAuthOption from "../utils/SwitchAuthOption";
import { FaLock, FaUser, FaEnvelope } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import AuthResponse from "../utils/AuthResponse";

interface Response {
    text: string;
    color: string;
}

const RegisterForm = () => {
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [response, setResponse] = useState<Response>({ text: "", color: "" });
    const [responseIsVisible, setResponseIsVisible] = useState<boolean>(false);

    const updateResponse = (text: string, color: string) => {
        setResponse({ text, color });
        setResponseIsVisible(true);
        setTimeout(() => setResponseIsVisible(false), 3000);
    };

    const handleRegister = async () => {
        updateResponse("", "");

        if (!username || !email || !password) {
            updateResponse("Please fill all fields!", "bg-red-300");
            return;
        }

        const data = {
            username: username.trim(),
            email: email.trim(),
            password,
        };

        try {
            const result = await axios.post("http://localhost:8000/api/register/", data, {
                headers: { "Content-Type": "application/json" },
            });
            updateResponse(result.data.message || "Registered Successfully!", "bg-blue-300");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errors = error.response?.data || {};
                const message = errors.email?.[0] || errors.username?.[0] || "Failed to register.";
                updateResponse(message, "bg-red-300");
            } else {
                updateResponse("Unexpected error occurred!", "bg-red-300");
            }
        }
    };

    return (
        <form className="rounded-lg w-72 h-96 text-main-text bg-main-gray shadow-[6px_6px_20px_3px_rgba(0,0,0,0.7)] p-5 flex flex-col justify-center items-center font-exo">
            <AuthHeader 
                text="Sign up" 
            />
            <AuthInput
                type="text"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                placeholder="Email"
                icon={<FaEnvelope />}
            />
            <AuthInput
                type="text"
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                placeholder="Username"
                icon={<FaUser />}
            />
            <AuthInput
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                placeholder="Password"
                icon={<FaLock />}
            />
            {responseIsVisible && (
                <AuthResponse
                    text={response.text}
                    color={response.color}
                    isVisible={responseIsVisible}
                />
            )}
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
    );
};

export default RegisterForm;
