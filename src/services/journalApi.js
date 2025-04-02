import axiosInstance from "./axiosInstance";

/**
 * Get all journal entries for the authenticated user
 * @returns {Promise} Promise resolving to journal entries data
 */
export const getAllEntries = async () => {
  try {
    const response = await axiosInstance.get('/journal/');
    return response.data.entries;
  } catch (error) {
    console.error('Error fetching journal entries:', error);
    throw new Error(error?.response?.data?.error || 'Failed to fetch journal entries');
  }
};

/**
 * Create a new journal entry
 * @param {Object} entryData Data for the new journal entry
 * @param {number} entryData.route_id ID of the route completed
 * @param {boolean} entryData.flash Whether the route was completed as a flash
 * @param {string} entryData.image_url URL to an image (optional)
 * @param {string} entryData.date ISO format date (optional)
 * @returns {Promise} Promise resolving to the created entry
 */
export const createEntry = async (entryData) => {
  try {
    const response = await axiosInstance.post('/journal/post', entryData);
    return response.data.entry;
  } catch (error) {
    console.error('Error creating journal entry:', error);
    throw new Error(error?.response?.data?.error || 'Failed to create journal entry');
  }
};

/**
 * Get a specific journal entry by ID
 * @param {number} entryId ID of the entry to retrieve
 * @returns {Promise} Promise resolving to the journal entry data
 */
export const getEntry = async (entryId) => {
  try {
    const response = await axiosInstance.get(`/journal/edit/${entryId}`);
    return response.data.entry;
  } catch (error) {
    console.error(`Error fetching journal entry ${entryId}:`, error);
    throw new Error(error?.response?.data?.error || 'Failed to fetch journal entry');
  }
};

/**
 * Update an existing journal entry
 * @param {number} entryId ID of the entry to update
 * @param {Object} entryData Updated data for the journal entry
 * @returns {Promise} Promise resolving to the updated entry
 */
export const updateEntry = async (entryId, entryData) => {
  try {
    const response = await axiosInstance.put(`/journal/edit/${entryId}`, entryData);
    return response.data.entry;
  } catch (error) {
    console.error(`Error updating journal entry ${entryId}:`, error);
    throw new Error(error?.response?.data?.error || 'Failed to update journal entry');
  }
};

/**
 * Delete a journal entry
 * @param {number} entryId ID of the entry to delete
 * @returns {Promise} Promise resolving to success message
 */
export const deleteEntry = async (entryId) => {
  try {
    const response = await axiosInstance.delete(`/journal/edit/${entryId}`);
    return response.data.message;
  } catch (error) {
    console.error(`Error deleting journal entry ${entryId}:`, error);
    throw new Error(error?.response?.data?.error || 'Failed to delete journal entry');
  }
};