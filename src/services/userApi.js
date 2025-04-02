import axiosInstance from "./axiosInstance";

// get all users with username instead of id
export const fetchUserByUsername = async (username) => {
    try {
        const response = await axiosInstance.get("/users/search", {
            params: { username },
            withCredentials: true, // if you need to send cookies with the request
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || "Failed to fetch user");
    }
};
