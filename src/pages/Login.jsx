import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

function Login() {
    const navigate = useNavigate();

    const handleLoginSuccess = () => {
        navigate("/dashboard");
    };

    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
}

export default Login;
