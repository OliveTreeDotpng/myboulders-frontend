import axiosInstance from './axiosInstance';

/**
 * Upload an image to the server
 * @param {File} imageFile - The image file to upload
 * @returns {Promise} Promise resolving to the image URL data
 */
export const uploadImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('file', imageFile);
    
    const response = await axiosInstance.post('/images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    // Add debug logging to see the actual response structure
    console.log("Image upload response:", response.data);
    
    // Return the whole response data for now, we'll handle the structure in the component
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error(error?.response?.data?.error || 'Failed to upload image');
  }
};

/**
 * Upload a profile image during registration (no authentication required)
 * @param {File} imageFile - The image file to upload
 * @returns {Promise} Promise resolving to the image URL data
 */
export const uploadRegistrationImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('file', imageFile);
    
    const response = await axiosInstance.post('/images/upload/registration', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    console.log("Registration image upload response:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error uploading registration image:', error);
    throw new Error(error?.response?.data?.error || 'Failed to upload profile image');
  }
};