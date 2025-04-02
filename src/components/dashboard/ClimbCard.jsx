import React, { useState } from 'react';
import ClimbDetailsModal from './ClimbDetailsModal';

function ClimbCard({ climb, onEdit, onDelete }) {
  const [showDetails, setShowDetails] = useState(false);
  
  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="entry-card">
      <div className="entry-header">
        <h3>{climb.route_type} - {climb.difficulty}</h3>
        {climb.flash && <span className="flash-badge">FLASH</span>}
      </div>
      
      <div className="entry-details">
        <p className="date">{formatDate(climb.date)}</p>
        {climb.image_url && (
          <p className="image-indicator">
            <span className="material-icons">photo</span> Image available
          </p>
        )}
      </div>
      
      <div className="entry-actions">
        <button className="action-button view-button" onClick={() => setShowDetails(true)}>
          View
        </button>
        <button className="action-button edit-button" onClick={() => onEdit(climb)}>
          Edit
        </button>
        <button className="action-button delete-button" onClick={() => onDelete(climb.id)}>
          Delete
        </button>
      </div>
      
      {showDetails && (
        <ClimbDetailsModal 
          climb={climb}
          onClose={() => setShowDetails(false)} 
        />
      )}
    </div>
  );
}

export default ClimbCard;