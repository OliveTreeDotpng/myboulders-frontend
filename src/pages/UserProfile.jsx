// This page shows a user's profile. It gets the user ID from the URL and fetches their data.
import { useParams } from 'react-router-dom'; // useParams is a hook that lets you access URL parameters
import { useState, useEffect } from 'react'; // React hooks for storing data in state (useState) and running side effects like API calls (useEffect)
import axiosInstance from '../services/axiosInstance'; // backend API instance

function UserProfile() {
    const { id } = useParams();
    const [profileData, setProfileData] = useState(null);
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/users/search?user_id=${id}`);
                setProfileData(response.data);

                // Fetch achievements
                try {
                    const achievementsResponse = await axiosInstance.get(`/users/${id}/achievements`);
                    setAchievements(achievementsResponse.data);
                } catch (achievementError) {
                    console.log('Could not load achievements:', achievementError);
                    setAchievements([]);
                }

                setError(null);
            } catch (err) {
                setError('Could not load profile');
                console.error('Error fetching profile:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [id]);

    if (loading) return <div>Loading profile...</div>;
    if (error) return <div className="error-text">{error}</div>;
    if (!profileData) return <div>No profile data found</div>;

    return (
        <div className="profile-container">
            <h2>{profileData.username}'s Profile</h2>
            <div className="profile-details">
                <p>User ID: {profileData.id}</p>
                <p>Username: {profileData.username}</p>
                
                <div className="user-achievements">
                    <h3>Achievements</h3>
                    {achievements.length > 0 ? (
                        <ul>
                            {achievements.map(achievement => (
                                <li key={achievement.id}>
                                    {achievement.name}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="no-achievements">No achievements yet</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserProfile;