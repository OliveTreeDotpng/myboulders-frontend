import React, { useState, useEffect, useRef } from 'react';
import { uploadImage } from '../../services/imageApi';

function ClimbForm({ climb, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    grade: '',     // New field for climbing grade
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

  useEffect(() => {
    if (climb) {
      // Format date properly if it exists
      const formattedClimb = {
        ...climb,
        grade: climb.difficulty || '', // Use the difficulty field as grade if available
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
      // First, upload any image if selected
      let imageUrl = formData.image_url;
      if (imageFile) {
        setUploadStatus({ uploading: true, error: null });
        try {
          const uploadResult = await uploadImage(imageFile);
          
          // Add console.log to debug the response structure
          console.log("Upload result:", uploadResult);
          
          // Check different possible response structures
          if (uploadResult?.url) {
            imageUrl = uploadResult.url;
          } else if (uploadResult?.image_url) {
            imageUrl = uploadResult.image_url;
          } else if (typeof uploadResult === 'string') {
            imageUrl = uploadResult;
          } else {
            console.error("Unexpected upload response format:", uploadResult);
            setUploadStatus({ 
              uploading: false, 
              error: "Server returned an invalid response format"
            });
            return;
          }
          
          setUploadStatus({ uploading: false, error: null });
        } catch (error) {
          setUploadStatus({ 
            uploading: false, 
            error: error.message || "Failed to upload image"
          });
          return; // Stop the submission if image upload fails
        }
      }

      // Generate a unique route_id based on selected grade (this is a simplification)
      // In a real app, you might have a proper routes database to select from
      const routeId = formData.route_id || `${formData.grade}-${Date.now()}`;
      
      // Format the data for submission with the image URL from upload
      const submitData = {
        ...formData,
        route_id: routeId,
        difficulty: formData.grade, // Add the grade as the difficulty
        image_url: imageUrl,
        date: new Date(formData.date).toISOString()
      };

      onSave(submitData);
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {/* Grade selection dropdown instead of route ID */}
      <div className="form-group">
        <label htmlFor="grade">Climbing Grade</label>
        <select
          id="grade"
          name="grade"
          value={formData.grade}
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
      
      {/* Image upload section */}
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
        
        {/* Still allow URL input as fallback */}
        <label htmlFor="image-url" className="secondary-label">
          Or enter image URL (optional)
        </label>
        <input
          type="text"
          id="image-url"
          name="image_url"
          value={formData.image_url || ''}
          onChange={handleChange}
          className="input"
          placeholder="https://example.com/image.jpg"
        />
        
        {/* Show image preview if available */}
        {previewImage && (
          <div className="image-preview-container">
            <img 
              src={previewImage} 
              alt="Preview" 
              className="image-preview" 
            />
            <button 
              type="button" 
              className="button button-small button-danger" 
              onClick={handleClearImage}
            >
              Clear Image
            </button>
          </div>
        )}
        
        {/* Show upload status/errors */}
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