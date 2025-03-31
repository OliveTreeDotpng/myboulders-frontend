// Import React hook to manage component state
import { useState } from "react";

// Import axios instance to make HTTP requests to your backend
import axios from "../api/axios";

// Import a reusable Button component (adjust the path if needed)
import Button from "./Button";

function UserSearch() {
    // username = the input from the user
    // setUsername = function to update the username state
    const [username, setUsername] = useState("")

    const [userData, setUserData] = useState(null);    // userData = holds the user info returned from the backend
    const [error, setError] = useState(null);          // error = stores an error message if something goes wrong
    const [isLoading, setIsLoading] = useState(false); // isLoading = tracks whether the search is in progress

    
    // Function is called when the "Search" button is clicked
    const handleSearch = async () => {
        if (!username.trim()) {
            setError("Please enter a username");
            return;
        }

        setIsLoading(true);
        try {
            // Support both username and ID search
            const isNumeric = !isNaN(username);
            const searchParam = isNumeric 
                ? `user_id=${username}`
                : `username=${username}`;
            
            // Make a GET request to the backend to search for the user
            // The response will contain the user data if found
            const response = await axios.get(`/search?${searchParam}`);
            setUserData(response.data);
            setError(null);
        } catch (error) {
            setError(error.response?.data?.error || "User not found");
            setUserData(null);
        } finally {
            setIsLoading(false);
        }
    };

    // What gets displayed in the browser
    return (
        <div className="user-search-container">
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

            {/* Reusable button component for the search action */}
            <Button 
                onClick={handleSearch} 
                disabled={isLoading}
            >
                {isLoading ? "Searching..." : "Search"}
            </Button>

            {/* If there's an error, show it */}
            {error && <p className="error-text">{error}</p>}

            {/* If user data is available, display it */}
            {userData && (
                <div className="user-profile">
                    <p>ID: {userData.id}</p>
                    <p>Username: {userData.username}</p>
                    <p>Password (hashed): {userData.password_hash}</p>
                </div>
            )}
        </div>
    );
}

// Export the component so it can be used in other files (like App.jsx)
export default UserSearch;
