import axiosInstance from "./axiosInstance";

export const followUser = async (userId) => {
    try {
    const response = await axiosInstance.post(`/users/${userId}/follow`);
    return response.data;
    } catch (error) {
    throw new Error(error?.response?.data?.error || 'Failed to follow user');
    }
};

export const unfollowUser = async (userId) => {
    try {
    const response = await axiosInstance.post(`/users/${userId}/unfollow`);
    return response.data;
    } catch (error) {
    throw new Error(error?.response?.data?.error || 'Failed to unfollow user');
    }
};