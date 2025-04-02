import React from 'react';

function ClimbDetailsModal({ climb, onClose }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{climb.route_type} - {climb.difficulty}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          {/* Display image prominently at the top if available */}
          {climb.image_url && (
            <div className="climb-image-container">
              <img 
                src={climb.image_url} 
                alt={`${climb.route_type} climb - ${climb.difficulty}`} 
                className="climb-image" 
              />
            </div>
          )}
          
          <div className="climb-details">
            <p><strong>Date:</strong> {formatDate(climb.date)}</p>
            <p><strong>Type:</strong> {climb.route_type}</p>
            <p><strong>Grade:</strong> {climb.difficulty}</p>
            <p><strong>Flash:</strong> {climb.flash ? 'Yes' : 'No'}</p>
            
            {climb.location && (
              <p><strong>Location:</strong> {climb.location}</p>
            )}
            
            {climb.description && (
              <div className="description">
                <p><strong>Description:</strong></p>
                <p>{climb.description}</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="button button-primary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default ClimbDetailsModal;