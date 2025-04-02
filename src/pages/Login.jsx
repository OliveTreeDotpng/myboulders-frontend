import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm"; // justera sökvägen om det behövs

function Login() {
    const navigate = useNavigate();

    const handleLoginSuccess = () => {
        // Redirect after successful login
        navigate("/dashboard");
    };

    return (
        <div>
            <h1>Login</h1>
            <LoginForm onLoginSuccess={handleLoginSuccess} />
        </div>
    );
}

export default Login;
