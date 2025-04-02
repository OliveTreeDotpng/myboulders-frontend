import React, { useState } from 'react';
import ClimbCard from './ClimbCard';
import ClimbForm from './ClimbForm';

function ClimbsList({ climbs, onSaveClimb, onDeleteClimb }) {
  const [showForm, setShowForm] = useState(false);
  const [climbToEdit, setClimbToEdit] = useState(null);

  const handleSave = (climbData) => {
    onSaveClimb(climbData);
    setShowForm(false);
    setClimbToEdit(null);
  };

  const handleEdit = (climb) => {
    setClimbToEdit(climb);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setClimbToEdit(null);
  };

  return (
    <section className="climbs-section">
      <div className="section-header">
        <h2>Completed Climbs</h2>
        <button 
          className="button button-primary" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Log Completed Climb'}
        </button>
      </div>
      
      {showForm && (
        <ClimbForm 
          climb={climbToEdit}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
      
      <div className="entries-list">
        {climbs.length > 0 ? (
          climbs.map(climb => (
            <ClimbCard 
              key={climb.id}
              climb={climb}
              onEdit={handleEdit}
              onDelete={onDeleteClimb}
            />
          ))
        ) : (
          <p className="empty-state">No climbs logged yet. Start logging your climbs!</p>
        )}
      </div>
    </section>
  );
}

export default ClimbsList;