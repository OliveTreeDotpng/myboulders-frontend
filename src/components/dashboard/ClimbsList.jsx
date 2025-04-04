import React, { useState } from 'react';
import ClimbCard from './ClimbCard';
import ClimbForm from './ClimbForm';

function ClimbsList({ climbs, onSaveClimb, onDeleteClimb }) {
  const [isAddingClimb, setIsAddingClimb] = useState(false);
  const [editingClimb, setEditingClimb] = useState(null);
  
  const handleAddClick = () => {
    setIsAddingClimb(true);
    setEditingClimb(null);
  };
  
  const handleEditClick = (climb) => {
    setEditingClimb(climb);
    setIsAddingClimb(false);
  };
  
  const handleCancelForm = () => {
    setIsAddingClimb(false);
    setEditingClimb(null);
  };
  
  const handleSaveClimb = (climbData) => {
    onSaveClimb(editingClimb ? { ...climbData, id: editingClimb.id } : climbData);
    setIsAddingClimb(false);
    setEditingClimb(null);
  };

  return (
    <section className="climbs-section dashboard-section">
      <header className="section-header">
        <h2>My Completed Climbs</h2>
        <button 
          className="button button-primary" 
          onClick={handleAddClick}
          disabled={isAddingClimb || editingClimb}
        >
          Log New Climb
        </button>
      </header>
      
      {isAddingClimb && (
        <div className="form-container">
          <h3>Log a New Climb</h3>
          <ClimbForm
            onSave={handleSaveClimb}
            onCancel={handleCancelForm}
          />
        </div>
      )}
      
      {editingClimb && (
        <div className="form-container">
          <h3>Edit Climb</h3>
          <ClimbForm
            climb={editingClimb}
            onSave={handleSaveClimb}
            onCancel={handleCancelForm}
          />
        </div>
      )}
      
      <div className="climbs-list">
        {climbs.length === 0 ? (
          <p className="empty-state">You haven't logged any climbs yet.</p>
        ) : (
          climbs.map(climb => (
            <ClimbCard
              key={climb.id}
              climb={climb}
              onEdit={handleEditClick}
              onDelete={onDeleteClimb}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default ClimbsList;