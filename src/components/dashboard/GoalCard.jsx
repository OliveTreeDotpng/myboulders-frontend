import React from 'react';

function GoalCard({ goal, onComplete, onEdit, onDelete, isCompleted }) {
  return (
    <div className={`goal-card ${isCompleted ? 'completed' : ''}`}>
      <div className="goal-header">
        <h3>{goal.title}</h3>
        {isCompleted ? (
          <span className="completed-badge">COMPLETED</span>
        ) : (
          <span className="target-date">Target: {new Date(goal.target_date).toLocaleDateString()}</span>
        )}
      </div>
      {goal.description && <p className="goal-description">{goal.description}</p>}
      <div className="goal-actions">
        {!isCompleted && (
          <button 
            className="icon-button complete-button" 
            title="Mark as Complete"
            onClick={() => onComplete(goal.id)}
          >
            <span className="material-icons">check_circle</span>
          </button>
        )}
        {!isCompleted && (
          <button
            className="icon-button edit-button"
            onClick={() => onEdit(goal)}
            title="Edit goal"
          >
            <span className="material-icons">edit</span>
          </button>
        )}
        <button
          className="icon-button delete-button"
          onClick={onDelete}
          title="Delete goal"
        >
          <span className="material-icons">delete</span>
        </button>
      </div>
    </div>
  );
}

export default GoalCard;