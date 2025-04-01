// This page shows a user's profile. It gets the user ID from the URL and fetches their data.
import { useParams } from 'react-router-dom'; // useParams is a hook that lets you access URL parameters
import { useState, useEffect } from 'react'; // // React hooks for storing data in state (useState) and running side effects like API calls (useEffect)
import axios from '../api/axios'; // backend API instance

function UserProfile() {
    // Get the user ID from the URL parameters (e.g., /profile/123)
    const { id } = useParams();
    
    // Store the user's profile information
    const [profileData, setProfileData] = useState(null);
    
    // Store any error messages
    const [error, setError] = useState(null);

    // When the page loads, fetch the user's data from the backend
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Try to get the user's data using their ID
                const response = await axios.get(`/search?user_id=${id}`);
                setProfileData(response.data);
            } catch (err) {
                // If something goes wrong, show an error message
                setError("Could not load profile");
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
        </div>
    );
}

export default UserProfile;