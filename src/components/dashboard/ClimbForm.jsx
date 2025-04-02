import React, { useState, useEffect, useRef } from 'react';
import { uploadImage } from '../../services/imageApi';

function ClimbForm({ climb, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    route_type: 'boulder', // Still needed for backend
    difficulty: '',        // Still needed for backend
    flash: false,
    image_url: '',
    date: new Date().toISOString().split('T')[0]
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState({
    uploading: false,
    error: null
  });
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  // Common climbing grades
  const climbingGrades = [
    '4', '4+', '5', '5+',
    '6A', '6A+', '6B', '6B+', '6C', '6C+',
    '7A', '7A+', '7B', '7B+', '7C', '7C+',
    '8A', '8A+', '8B', '8B+', '8C', '8C+'
  ];

  const routeTypes = ['boulder', 'sport', 'trad']; // Available route types

  useEffect(() => {
    if (climb) {
      // Format date properly if it exists
      const formattedClimb = {
        ...climb,
        route_type: climb.route_type || 'boulder',
        difficulty: climb.difficulty || '',
        flash: climb.flash || false,
        image_url: climb.image_url || '',
        date: climb.date ? new Date(climb.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
      };
      setFormData(formattedClimb);
      
      // If there's an image URL in the existing climb, show it as preview
      if (climb.image_url) {
        setPreviewImage(climb.image_url);
      }
    }
  }, [climb]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);

    // Store the file for later upload
    setImageFile(file);
  };

  const handleClearImage = () => {
    setImageFile(null);
    setPreviewImage(null);
    setFormData({ ...formData, image_url: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Validate required fields
      if (!formData.route_type || !formData.difficulty) {
        alert("Route type and difficulty are required");
        return;
      }

      // First, upload any image if selected
      let imageUrl = formData.image_url;
      if (imageFile) {
        setUploadStatus({ uploading: true, error: null });
        try {
          const uploadResult = await uploadImage(imageFile);
          
          console.log("Upload result:", uploadResult);
          
          if (uploadResult?.url) {
            imageUrl = uploadResult.url;
          } else if (uploadResult?.image_url) {
            imageUrl = uploadResult.image_url;
          } else if (typeof uploadResult === 'string') {
            imageUrl = uploadResult;
          }
          
          setUploadStatus({ uploading: false, error: null });
        } catch (error) {
          setUploadStatus({ 
            uploading: false, 
            error: error.message || "Failed to upload image"
          });
          return; // Stop submission if image upload fails
        }
      }

      // Format the data for backend API - make sure to include difficulty for edits
      const submitData = {
        route_type: formData.route_type,
        difficulty: formData.difficulty,  // Always include difficulty for both new and edit cases
        flash: formData.flash || false,
        image_url: imageUrl || null,
        date: formData.date ? new Date(formData.date).toISOString() : null
      };

      console.log("Submitting journal entry:", submitData);
      onSave(submitData);
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="route-type">Route Type</label>
        <select
          id="route-type"
          name="route_type"
          value={formData.route_type}
          onChange={handleChange}
          required
          className="input"
        >
          {routeTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="difficulty">Difficulty</label>
        <select
          id="difficulty"
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          required
          className="input"
        >
          <option value="">Select a grade</option>
          {climbingGrades.map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>
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
        <label htmlFor="image-upload">Image Upload</label>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          onChange={handleImageChange}
          className="input"
          ref={fileInputRef}
        />
        
        {previewImage && (
          <div className="image-preview-container">
            <img 
              src={previewImage} 
              alt="Preview" 
              className="image-preview" 
            />
            <button 
              type="button" 
              className="button button-small" 
              onClick={handleClearImage}
            >
              Clear Image
            </button>
          </div>
        )}
        
        {uploadStatus.uploading && <p>Uploading image...</p>}
        {uploadStatus.error && (
          <p className="error-text">{uploadStatus.error}</p>
        )}
      </div>
      
      <div className="form-actions">
        <button type="button" className="button button-secondary" onClick={onCancel}>Cancel</button>
        <button 
          type="submit" 
          className="button button-primary"
          disabled={uploadStatus.uploading}
        >
          {uploadStatus.uploading ? 'Uploading...' : 'Save Climb'}
        </button>
      </div>
    </form>
  );
}

export default ClimbForm;