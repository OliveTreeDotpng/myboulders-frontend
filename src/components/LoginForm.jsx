import { useState } from "react";
import { login } from "../services/authApi";

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

            // Clear error message
            setErrorMessage("");

            // Only call the success function if it's provided
            if (onLoginSuccess) {
                onLoginSuccess();
            }

        } catch (error) {
            // Handle network or server error
            setErrorMessage(error.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Log in</h2>

            {errorMessage && (
                <p style={{ color: "red" }} aria-live="polite">
                    {errorMessage}
                </p>
            )}

            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Log in"}
            </button>
        </form>
    );
}

export default LoginForm;
