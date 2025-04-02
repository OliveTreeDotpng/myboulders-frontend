import React, { useState } from 'react';

function LoginForm({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.username || !formData.password) {
      alert('Please enter both username and password');
      return;
    }
    
    try {
      setIsSubmitting(true);
      await onLoginSuccess(formData); // Skicka formdata till parent component
    } catch (error) {
      console.error('Login submission error:', error);
      // Error visas av parent component
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          autoComplete="username"
          className="input"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
          className="input"
        />
      </div>
      
      <button 
        type="submit" 
        className="button button-primary" 
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

export default LoginForm;
