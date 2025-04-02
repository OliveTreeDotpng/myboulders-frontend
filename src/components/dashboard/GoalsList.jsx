import React, { useState } from 'react';
import GoalCard from './GoalCard';
import GoalForm from './GoalForm';

function GoalsList({ 
  currentGoals, 
  completedGoals, 
  onSaveGoal, 
  onCompleteGoal, 
  onDeleteGoal 
}) {
  const [showForm, setShowForm] = useState(false);
  const [goalToEdit, setGoalToEdit] = useState(null);

  const handleSave = (goalData) => {
    onSaveGoal(goalData);
    setShowForm(false);
    setGoalToEdit(null);
  };

  const handleEdit = (goal) => {
    setGoalToEdit(goal);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setGoalToEdit(null);
  };

  return (
    <section className="goals-section">
      <div className="section-header">
        <h2>Goals</h2>
        <button 
          className="button button-primary" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Create Goal'}
        </button>
      </div>
      
      {showForm && (
        <GoalForm 
          goal={goalToEdit}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
      
      <h3>Current Goals</h3>
      <div className="goals-list">
        {currentGoals.length > 0 ? (
          currentGoals.map(goal => (
            <GoalCard 
              key={goal.id}
              goal={goal}
              onComplete={onCompleteGoal}
              onEdit={handleEdit}
              onDelete={() => onDeleteGoal(goal.id, false)}
              isCompleted={false}
            />
          ))
        ) : (
          <p className="empty-state">No current goals. Create a goal to get started!</p>
        )}
      </div>
      
      <h3>Completed Goals</h3>
      <div className="goals-list completed-goals">
        {completedGoals.length > 0 ? (
          completedGoals.map(goal => (
            <GoalCard 
              key={goal.id}
              goal={goal}
              onDelete={() => onDeleteGoal(goal.id, true)}
              isCompleted={true}
            />
          ))
        ) : (
          <p className="empty-state">No completed goals yet. Keep climbing!</p>
        )}
      </div>
    </section>
  );
}

export default GoalsList;