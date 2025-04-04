// This page shows a user's profile. It gets the user ID from the URL and fetches their data.
import { useParams } from 'react-router-dom'; // useParams is a hook that lets you access URL parameters
import { useState, useEffect } from 'react'; // React hooks for storing data in state (useState) and running side effects like API calls (useEffect)
import axiosInstance from '../services/axiosInstance'; // backend API instance
import { followUser, unfollowUser } from '../services/userApi'; // API functions for follow/unfollow actions

function UserProfile() {
    const { id } = useParams();
    const [profileData, setProfileData] = useState(null);
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followLoading, setFollowLoading] = useState(false);

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

    const handleFollow = async () => {
        setFollowLoading(true);
        try {
            if (isFollowing) {
                await unfollowUser(id);
                setIsFollowing(false);
            } else {
                await followUser(id);
                setIsFollowing(true);
            }
        } catch (error) {
            console.error('Failed to follow/unfollow:', error);
        } finally {
            setFollowLoading(false);
        }
    };

    if (loading) return <div>Loading profile...</div>;
    if (error) return <div className="error-text">{error}</div>;
    if (!profileData) return <div>No profile data found</div>;

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h2>{profileData.username}'s Profile</h2>
                <button
                    onClick={handleFollow}
                    disabled={followLoading}
                    className={`button ${isFollowing ? 'button-secondary' : 'button-primary'}`}
                >
                    {followLoading ? "..." : isFollowing ? "Unfollow" : "Follow"}
                </button>
            </div>
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