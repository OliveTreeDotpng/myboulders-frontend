import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/authApi';
import { uploadImage, uploadRegistrationImage } from '../services/imageApi'; // Use existing image upload service

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState({ uploading: false, error: null });
  const fileInputRef = useRef(null);
  
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Preview the image using existing pattern from ClimbForm
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
    
    setImageFile(file);
  };
  
  const handleClearImage = () => {
    setImageFile(null);
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    // Validate form
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Upload image if selected using the existing image upload service
      let profileImageUrl = null;
      if (imageFile) {
        setUploadStatus({ uploading: true, error: null });
        try {
          // Use the registration-specific upload function
          const uploadResult = await uploadRegistrationImage(imageFile);
          
          console.log("Profile image upload result:", uploadResult);
          
          if (uploadResult?.image_url) {
            profileImageUrl = uploadResult.image_url;
          } else if (typeof uploadResult === 'string') {
            profileImageUrl = uploadResult;
          }
          
          setUploadStatus({ uploading: false, error: null });
        } catch (error) {
          setUploadStatus({ 
            uploading: false, 
            error: error.message || "Failed to upload profile image"
          });
          setError("Failed to upload profile image. Please try again.");
          setIsSubmitting(false);
          return;
        }
      }
      
      // Submit registration data
      const registerData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        profile_image_url: profileImageUrl
      };
      
      await register(registerData);
      
      // Registration successful - redirect to login
      navigate('/login', { 
        state: { 
          message: 'Registration successful! Please login with your new account.'
        } 
      });
      
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create Account</h1>
        <p className="auth-subtitle">Join the MyBoulders community</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username*</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="input"
              minLength="6"
              placeholder="Minimum 6 characters"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password*</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="profile-image">Profile Image (Optional)</label>
            <input
              type="file"
              id="profile-image"
              accept="image/*"
              onChange={handleImageChange}
              className="input"
              ref={fileInputRef}
            />
            
            {previewImage && (
              <div className="image-preview-container">
                <img 
                  src={previewImage} 
                  alt="Profile preview" 
                  className="image-preview" 
                  style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '10px', borderRadius: '50%' }}
                />
                <button 
                  type="button" 
                  className="button button-small" 
                  onClick={handleClearImage}
                >
                  Clear
                </button>
              </div>
            )}
            {uploadStatus.uploading && <p>Uploading image...</p>}
            {uploadStatus.error && (
              <p className="error-text">{uploadStatus.error}</p>
            )}
          </div>
          
          <button 
            type="submit" 
            className="button button-primary" 
            disabled={isSubmitting || uploadStatus.uploading}
          >
            {isSubmitting ? 'Creating Account...' : 'Register'}
          </button>
        </form>
        
        <div className="auth-links">
          <Link to="/login">Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;