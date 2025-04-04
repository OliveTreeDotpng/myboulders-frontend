import React, { useState } from 'react';
import { login } from "../services/authApi";
import Button from "./Button";

function LoginForm({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = formData;

    if (!username || !password) {
      alert('Please enter both username and password');
      return;
    }

    try {
      setIsSubmitting(true);
      await login({ username, password });
      setErrorMessage("");
      if (onLoginSuccess) {
        onLoginSuccess(formData);
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage(error.message || 'Login failed');
    } finally {
      setIsSubmitting(false);
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
            name="username"
            className="input"
            value={formData.username}
            onChange={handleChange}
            required
            autoComplete="username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className="input"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="auth-button"
        >
          {isSubmitting ? "Logging in..." : "Log in"}
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
