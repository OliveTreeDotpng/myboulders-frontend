import axiosInstance from './axiosInstance';

/**
 * Login a user with username and password
 * @param {Object} credentials - User credentials
 * @param {string} credentials.username - Username 
 * @param {string} credentials.password - Password
 * @returns {Promise} Promise resolving to login response
 */
export const login = async (credentials) => {
  try {
    // Explicit setting of Content-Type to application/json
    const response = await axiosInstance.post('/auth/login', credentials, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

/**
 * Check if user is authenticated
 * @returns {Promise} Promise resolving to authentication status
 */
export const checkAuth = async () => {
  try {
    const response = await axiosInstance.get('/auth/check');
    return response.data;
  } catch (error) {
    console.error('Auth check error:', error);
    throw error;
  }
};

/**
 * Log out current user
 * @returns {Promise} Promise resolving to logout response
 */
export const logout = async () => {
  try {
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @param {string} userData.username - Username 
 * @param {string} userData.email - Email address
 * @param {string} userData.password - Password
 * @returns {Promise} Promise resolving to registration response
 */
export const register = async (userData) => {
  try {
    // Explicit setting of Content-Type
    const response = await axiosInstance.post('/auth/register', userData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};