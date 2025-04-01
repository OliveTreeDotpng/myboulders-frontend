import axiosInstance from "./axiosInstance";

export const login = async (userData) => {
  try {
    const response = await axiosInstance.post('/auth/login', userData, {
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    console.error('Error logging in:', error)
    throw error    
  } 
}

export const logout = async () => {
  try {
    const response = await axiosInstance.post('/auth/logout')
    console.log('Logged out successfully', response);
  } catch (error) {
    console.error('Error logging out:', error)
  }
}