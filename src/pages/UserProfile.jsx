// This page shows a user's profile. It gets the user ID from the URL and fetches their data.
import { useParams } from 'react-router-dom'; // useParams is a hook that lets you access URL parameters
import { useState, useEffect } from 'react'; // React hooks for storing data in state (useState) and running side effects like API calls (useEffect)
import axiosInstance from '../services/axiosInstance'; // backend API instance
import { fetchAchievements, addAchievement } from '../services/achievementApi'; // Import the API calls

function UserProfile() {
    // Get the user ID from the URL parameters (e.g., /profile/123)
    const { id } = useParams();

    // Store the user's profile information
    const [profileData, setProfileData] = useState(null);

    // Store any error messages
    const [error, setError] = useState(null);

    const [achievements, setAchievements] = useState([]); // State for achievements

    // State to store the new achievement input value
    const [newAchievement, setNewAchievement] = useState('');
    // State to store any error messages when adding an achievement
    const [addError, setAddError] = useState(null);

    // Function to handle adding a new achievement
    const handleAddAchievement = async () => {
        try {
            // Call the API to add the achievement
            const addedAchievement = await addAchievement(newAchievement);
            // Update the achievements list with the newly added achievement
            setAchievements([...achievements, addedAchievement]);
            // Clear the input field and reset the error state
            setNewAchievement('');
            setAddError(null);
        } catch (err) {
            // If an error occurs, set the error message
            setAddError(err.message);
        }
    };

    // When the page loads, fetch the user's data from the backend
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Try to get the user's data using their ID
                const response = await axiosInstance.get(`/search?user_id=${id}`);
                setProfileData(response.data);

                // Fetch achievements for the user
                const userAchievements = await fetchAchievements(id);
                setAchievements(userAchievements);
            } catch (err) {
                // If something goes wrong, show an error message
                setError('Could not load profile or achievements');
            }
        };
        fetchProfile();
    }, [id]);

    // Show error message if something went wrong
    if (error) return <div className="error-text">{error}</div>;

    // Show loading message while waiting for data
    if (!profileData) return <div>Loading...</div>;

    // Show the user's profile information
    return (
        <div className="profile-container">
            <h2>{profileData.username}'s Profile</h2>
            <div className="profile-details">
                <p>User ID: {profileData.id}</p>
                <p>Username: {profileData.username}</p>
            </div>
            <div className="achievements">
                <h3>Achievements</h3>
                {achievements.length > 0 ? (
                    <ul>
                        {achievements.map((achievement) => (
                            <li key={achievement.id}>
                                {achievement.name} - {new Date(achievement.date).toLocaleDateString()}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No achievements yet.</p>
                )}
            </div>
            {/* Section to add a new achievement */}
            <div className="add-achievement">
                <h3>Add Achievement</h3>
                {/* Input field for entering the achievement name */}
                <input
                    type="text"
                    value={newAchievement}
                    onChange={(e) => setNewAchievement(e.target.value)}
                    placeholder="Achievement name"
                    className="input"
                />
                {/* Button to trigger the add achievement function */}
                <button onClick={handleAddAchievement} className="button button-primary">
                    Add
                </button>
                {/* Display an error message if adding the achievement fails */}
                {addError && <p className="error-text">{addError}</p>}
            </div>
        </div>
    );
}

export default UserProfile;