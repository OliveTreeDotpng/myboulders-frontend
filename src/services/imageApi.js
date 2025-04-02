
import axiosInstance from "./axiosInstance";

// Uploads image to /api/images/upload which returns an Imgur URL
export const uploadImageToImgur = async (formData) => {
    try {
        const response = await axiosInstance.post("/images/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
};
