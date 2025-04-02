// Import React hook to manage component state
import { useState } from "react";

// Import axios instance to make HTTP requests to your backend
import axiosInstance from "../services/axiosInstance";

// Import useNavigate hook from react-router-dom for navigation
import { useNavigate } from 'react-router-dom';

// Import the new CSS file
import '../styles/UserSearch.css';

function UserSearch() {
    // username = the input from the user
    // setUsername = function to update the username state
    const [username, setUsername] = useState("");

    const [userData, setUserData] = useState(null);    // userData = holds the user info returned from the backend
    const [error, setError] = useState(null);          // error = stores an error message if something goes wrong
    const [isLoading, setIsLoading] = useState(false); // isLoading = tracks whether the search is in progress
    const [achievements, setAchievements] = useState([]); // Add state for achievements

    const navigate = useNavigate(); // Hook for navigation

    // Function is called when the "Search" button is clicked
    const handleSearch = async () => {
        if (!username.trim()) {
            setError("Please enter a username");
            return;
        }

        setIsLoading(true);
        try {
            let response;
            if (username.toLowerCase() === "admin") {
                // Special case for admin
                response = await axiosInstance.get(`/users/search?username=admin`);
            } else if (!isNaN(username)) {
                // If input is a number, search by user_id
                response = await axiosInstance.get(`/users/search?user_id=${username}`);
            } else {
                // Search by username for all other cases
                response = await axiosInstance.get(`/users/search?username=${username}`);
            }
            
            setUserData(response.data);
            
            // Fetch achievements for the user
            try {
                const achievementsResponse = await axiosInstance.get(`/users/${response.data.id}/achievements`);
                setAchievements(achievementsResponse.data);
            } catch (achievementError) {
                console.log('Could not load achievements:', achievementError);
                setAchievements([]);
            }
            
            setError(null);
            
            // Om sökningen lyckas, visa resultatet men navigera inte automatiskt
            // Användaren kan klicka på resultatet för att gå till profilen
        } catch (error) {
            setError(error.response?.data?.error || "User not found");
            setUserData(null);
            setAchievements([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Function to handle click on user profile
    const handleProfileClick = (userId) => {
        navigate(`/profile/${userId}`);
    };

    // What gets displayed in the browser
    return (
        <div className="user-search-container">
            <h2>Find Users</h2>
            <p>Search for other climbers by username or ID</p>
            
            {/* Input field where user types in a username */}
            <input
                type="text"
                placeholder="Search by username or ID"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input"

                // ARIA attributes for accessibility (screen readers)
                aria-label="Search by username or ID"
                aria-invalid={error ? "true" : "false"}
            />

            {/* Button for the search action */}
            <button 
                onClick={handleSearch} 
                disabled={isLoading}
                className="button"
            >
                {isLoading ? "Searching..." : "Search"}
            </button>

            {/* If there's an error, show it */}
            {error && <p className="error-text">{error}</p>}

            {/* If loading, show searching message */}
            {isLoading && <p>Searching...</p>}

            {/* If user data is available, display it */}
            {userData && (
                <div className="user-profile" 
                    onClick={() => handleProfileClick(userData.id)}
                    style={{ cursor: 'pointer' }}
                >
                    <p>ID: {userData.id}</p>
                    <p>Username: {userData.username}</p>
                    
                    {/* Visa bara achievements om det finns några */}
                    {achievements && achievements.length > 0 && (
                        <div className="user-achievements">
                            <h3>Achievements</h3>
                            <ul>
                                {achievements.map(achievement => (
                                    <li key={achievement.id}>
                                        {achievement.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// Export the component so it can be used in other files (like App.jsx)
export default UserSearch;