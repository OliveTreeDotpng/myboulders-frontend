import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { login } from "../services/authApi";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loginError, setLoginError] = useState(null);

  const handleLogin = async (formData) => {
    try {
      setLoginError(null);
      await login(formData);

      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {loginError && <div className="error-message">{loginError}</div>}
      <LoginForm onLoginSuccess={handleLogin} />
    </div>
  );
}

export default Login;
