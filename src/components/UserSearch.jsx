import { useState, useRef, useEffect } from "react";
import axiosInstance from "../services/axiosInstance";
import { useNavigate } from 'react-router-dom';
import '../styles/UserSearch.css';

function UserSearch() {
    const [username, setUsername] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!username.trim()) return;

        setIsLoading(true);
        try {
            let response;
            if (!isNaN(username)) {
                response = await axiosInstance.get(`/users/search?user_id=${username}`);
            } else {
                response = await axiosInstance.get(`/users/search?username=${username}`);
            }
            setSearchResults(Array.isArray(response.data) ? response.data : [response.data]);
            setShowDropdown(true);
            setError(null);
        } catch (error) {
            setError(error.response?.data?.error || "User not found");
            setSearchResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUserClick = (userId) => {
        setUsername("");
        setShowDropdown(false);
        navigate(`/profile/${userId}`);
    };

    return (
        <div className="nav-search-container">
            <form onSubmit={handleSearch} className="nav-search-form">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="nav-search-input"
                    aria-label="Search users"
                />
                <button 
                    type="submit"
                    disabled={isLoading}
                    className="nav-search-button"
                >
                    {isLoading ? "..." : "🔍"}
                </button>
            </form>
            
            {showDropdown && (searchResults.length > 0 || error) && (
                <div className="nav-search-dropdown" ref={dropdownRef}>
                    {error ? (
                        <div className="nav-search-error">{error}</div>
                    ) : (
                        searchResults.map((user) => (
                            <div
                                key={user.id}
                                className="nav-search-result"
                                onClick={() => handleUserClick(user.id)}
                            >
                                {user.username}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default UserSearch;