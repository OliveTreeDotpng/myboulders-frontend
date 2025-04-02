import React from 'react';
import IconButton from '../common/IconButton';

function ClimbCard({ climb, onEdit, onDelete }) {
  return (
    <div className="entry-card">
      <div className="entry-header">
        <h3>Route #{climb.route_id}</h3>
        {climb.flash && <span className="flash-badge">FLASH</span>}
      </div>
      <div className="entry-details">
        <p className="date">{new Date(climb.date).toLocaleDateString()}</p>
        {climb.notes && <p className="notes">{climb.notes}</p>}
      </div>
      <div className="entry-actions">
        <IconButton
          icon="edit"
          onClick={() => onEdit(climb)}
          title="Edit climb"
          className="edit-button"
        />
        <IconButton
          icon="delete"
          onClick={() => onDelete(climb.id)}
          title="Delete climb"
          className="delete-button"
        />
      </div>
    </div>
  );
}

export default ClimbCard;