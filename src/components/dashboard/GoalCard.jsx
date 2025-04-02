import React from 'react';

function GoalCard({ goal, onComplete, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    return new Date(dateString).toLocaleDateString();
  };
  
  return (
    <div className={`goal-card ${goal.completed ? 'completed' : ''}`}>
      <div className="goal-header">
        <h3>{goal.title}</h3>
        {goal.completed ? (
          <span className="completed-badge">COMPLETED</span>
        ) : (
          <span className="target-date">Due: {formatDate(goal.target_date)}</span>
        )}
      </div>
      
      {goal.description && (
        <p className="goal-description">{goal.description}</p>
      )}
      
      <div className="goal-actions">
        {!goal.completed && (
          <button 
            className="action-button view-button" 
            onClick={() => onComplete(goal.id)}
          >
            Complete
          </button>
        )}
        <button 
          className="action-button edit-button" 
          onClick={() => onEdit(goal)}
        >
          Edit
        </button>
        <button 
          className="action-button delete-button" 
          onClick={() => onDelete(goal.id, goal.completed)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default GoalCard;