import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { login } from "../services/authApi";
import "../styles/auth.css"; // Import the auth-specific styles

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const [loginError, setLoginError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // Check for registration success message when component loads
    useEffect(() => {
        if (location.state?.message) {
            setSuccessMessage(location.state.message);
            // Clear the message from location state after displaying it
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    const handleLogin = async (formData) => {
        try {
            setLoginError(null);
            await login(formData);

            const from = location.state?.from?.pathname || "/dashboard";
            navigate(from, { replace: true });
        } catch (error) {
            console.error("Login failed:", error);
            setLoginError(error.response?.data?.error || "Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Login</h1>
                <p className="auth-subtitle">Welcome back to MyBoulders</p>
                
                {successMessage && (
                    <div className="success-message">{successMessage}</div>
                )}
                
                {loginError && <div className="error-message">{loginError}</div>}
                
                <LoginForm onLoginSuccess={handleLogin} />
                
                <div className="auth-links">
                    <Link to="/register">Don't have an account? Register</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
