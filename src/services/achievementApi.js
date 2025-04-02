// Importing the axios instance for API calls to the backend
import axiosInstance from './axiosInstance';

// Fetch achievements for a user
export const fetchAchievements = async (userId) => {
    try {
    const response = await axiosInstance.get(`/achievements/user/${userId}`);
    return response.data.achievements;
    } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch achievements');
    }
};

// Add a new achievement for the logged-in user
export const addAchievement = async (achievementName) => {
    try {
    const response = await axiosInstance.post('/achievements/add', { achievement_name: achievementName });
    return response.data;
    } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to add achievement');
    }
};