import React from 'react';

function IconButton({ icon, onClick, title, className }) {
  return (
    <button 
      className={`icon-button ${className}`}
      onClick={onClick}
      title={title}
      type="button"
    >
      <span className="material-icons">{icon}</span>
    </button>
  );
}

export default IconButton;