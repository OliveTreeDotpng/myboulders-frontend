import { useState, useEffect } from 'react';
import axiosInstance from '../services/axiosInstance';
import '../styles/Leaderboard.css';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get('/leaderboard');
      setLeaderboardData(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load leaderboard data');
      console.error('Error fetching leaderboard:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getOrdinalSuffix = (position) => {
    const j = position % 10;
    const k = position % 100;
    if (j === 1 && k !== 11) return "st";
    if (j === 2 && k !== 12) return "nd";
    if (j === 3 && k !== 13) return "rd";
    return "th";
  };

  return (
    <div className="leaderboard-page">
      <div className="container">
        <header className="leaderboard-header">
          <h1>Leaderboard</h1>
        </header>

        {isLoading ? (
          <div className="loading-state">
            <div className="loader"></div>
            <p>Loading leaderboard...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <p>{error}</p>
            <button className="button button-primary" onClick={fetchLeaderboardData}>
              Try Again
            </button>
          </div>
        ) : (
          <div className="leaderboard-container">
            {leaderboardData.map((user, index) => (
              <div 
                key={user.id} 
                className={`leaderboard-item ${index < 3 ? `top-${index + 1}` : ''}`}
              >
                <div className="rank">
                  <span className="position">{index + 1}</span>
                  <span className="ordinal">{getOrdinalSuffix(index + 1)}</span>
                </div>
                <div className="user-info">
                  <img 
                    src={user.profileImage || '/default-avatar.png'} 
                    alt={user.username} 
                    className="user-avatar"
                  />
                  <div className="user-details">
                    <h3>{user.username}</h3>
                    <p>{user.totalPoints} points</p>
                  </div>
                </div>
                <div className="stats">
                  <div className="stat">
                    <span className="stat-label">Routes</span>
                    <span className="stat-value">{user.completedRoutes}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Flashes</span>
                    <span className="stat-value">{user.flashes}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Highest Grade</span>
                    <span className="stat-value">{user.highestGrade}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;