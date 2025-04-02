import React, { useState, useEffect } from 'react';

function GoalForm({ goal, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    target_date: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0]
  });

  useEffect(() => {
    if (goal) {
      setFormData(goal);
    }
  }, [goal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="goal-title">Title</label>
        <input
          type="text"
          id="goal-title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="input"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="goal-description">Description</label>
        <textarea
          id="goal-description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="input"
          rows="3"
        ></textarea>
      </div>
      
      <div className="form-group">
        <label htmlFor="goal-date">Target Date</label>
        <input
          type="date"
          id="goal-date"
          name="target_date"
          value={formData.target_date}
          onChange={handleChange}
          className="input"
        />
      </div>
      
      <div className="form-actions">
        <button type="button" className="button button-secondary" onClick={onCancel}>Cancel</button>
        <button type="submit" className="button button-primary">Save Goal</button>
      </div>
    </form>
  );
}

export default GoalForm;