import axiosInstance from "./axiosInstance";

export const getAllGoals = async () => {
    try {
        const response = await axiosInstance.get('/goals/');
        return response.data.goals;
    } catch (error) {
        console.error('Error fetching goals:', error);
        throw error;
    }
};

export const createGoal = async (goalData) => {
    try {
        const response = await axiosInstance.post('/goals/', goalData);
        return response;
    } catch (error) {
        console.error('Error creating goal:', error);
        throw error;
    }
};

export const updateGoal = async (goalId, goalData) => {
    try {
        const response = await axiosInstance.put(`/goals/${goalId}`, goalData);
        return response;
    } catch (error) {
        console.error('Error updating goal:', error);
        throw error;
    }
};

export const deleteGoal = async (goalId) => {
    try {
        await axiosInstance.delete(`/goals/${goalId}`);
    } catch (error) {
        console.error('Error deleting goal:', error);
        throw error;
    }
};

export const completeGoal = async (goalId, completed = true) => {
    try {
        const response = await axiosInstance.post(`/goals/${goalId}/complete`, {
            completed: completed
        });
        return response.data;
    } catch (error) {
        console.error('Error completing goal:', error);
        throw error;
    }
};