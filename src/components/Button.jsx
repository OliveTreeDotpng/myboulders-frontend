import React from 'react';
import '../styles/Button.css'; // We'll create this next

function Button({ children, variant = 'primary', type = 'button', onClick, className, disabled }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`button button-${variant} ${className || ''}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;