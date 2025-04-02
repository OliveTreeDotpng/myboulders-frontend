import React, { useState, useEffect } from 'react';

function ClimbForm({ climb, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    route_id: '',
    flash: false,
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  useEffect(() => {
    if (climb) {
      setFormData(climb);
    }
  }, [climb]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="route-id">Route ID</label>
        <input
          type="text"
          id="route-id"
          name="route_id"
          value={formData.route_id}
          onChange={handleChange}
          required
          className="input"
        />
      </div>
      
      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="flash"
            checked={formData.flash}
            onChange={handleChange}
          />
          Completed as Flash
        </label>
      </div>
      
      <div className="form-group">
        <label htmlFor="climb-date">Date</label>
        <input
          type="date"
          id="climb-date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="input"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="climb-notes">Notes</label>
        <textarea
          id="climb-notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="input"
          rows="3"
        ></textarea>
      </div>
      
      <div className="form-actions">
        <button type="button" className="button button-secondary" onClick={onCancel}>Cancel</button>
        <button type="submit" className="button button-primary">Save Climb</button>
      </div>
    </form>
  );
}

export default ClimbForm;