import { useState } from "react";
import { login } from "../services/authApi";
import Button from "./Button";

function LoginForm({ onLoginSuccess }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await login({ username, password });
            setErrorMessage("");
            if (onLoginSuccess) {
                onLoginSuccess();
            }
        } catch (error) {
            setErrorMessage(error.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Welcome Back</h2>
                
                {errorMessage && (
                    <p className="error-text" aria-live="polite">
                        {errorMessage}
                    </p>
                )}

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        className="input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        className="input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    disabled={loading}
                    className="auth-button"
                >
                    {loading ? "Logging in..." : "Log in"}
                </Button>
            </form>
        </div>
    );
}

export default LoginForm;
