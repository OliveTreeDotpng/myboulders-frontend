import axiosInstance from "./axiosInstance";

export const login = async (userData) => {
  try {
    const response = await axiosInstance.post('/auth/login', userData, {
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    console.error('Error logging in:', error)
    throw new Error(error?.response?.data?.error || 'Login failed');
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


export const register = async (userData) => {
  try {
      const response = await axiosInstance.post(
          '/auth/register',
          userData,
          {
              // Optional: only needed if backend uses cookies
              withCredentials: true,
          }
      );
      return response.data;
  } catch (error) {
      console.error(" Error registering user:", error);
      throw error;
  }
};
