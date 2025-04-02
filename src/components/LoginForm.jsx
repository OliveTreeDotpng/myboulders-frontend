import { useState } from "react";
import { login } from "../services/authApi";

function LoginForm({ onLoginSuccess }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ email, password });
            setErrorMessage("");
            onLoginSuccess(); // Call the success callback
        } catch (error) {
            setErrorMessage(error.message || "Login failed. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            <div>
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;