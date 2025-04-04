import { useState } from 'react';

function SearchResult({ userData, achievements, onProfileClick }) {
    return (
        <div 
            className="user-profile" 
            onClick={() => onProfileClick(userData.id)}
        >
            <div className="user-profile-header">
                <div className="user-info">
                    <h3>{userData.username}</h3>
                    <p className="user-id">ID: {userData.id}</p>
                </div>
            </div>
            
            {achievements && achievements.length > 0 && (
                <div className="user-achievements">
                    <h3>Achievements</h3>
                    <ul className="achievements-list">
                        {achievements.map(achievement => (
                            <li key={achievement.id} className="achievement-item">
                                {achievement.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default SearchResult;