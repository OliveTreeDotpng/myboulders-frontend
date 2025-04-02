import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';
import { login } from '../services/authApi';
import '../styles/Dashboard.css';

import { getAllEntries, createEntry, updateEntry, deleteEntry } from '../services/journalApi';

import StatsOverview from '../components/dashboard/StatsOverview';
import ClimbsList from '../components/dashboard/ClimbsList';
import GoalsList from '../components/dashboard/GoalsList';

function Dashboard() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [completedClimbs, setCompletedClimbs] = useState([]);
    const [currentGoals, setCurrentGoals] = useState([]);
    const [completedGoals, setCompletedGoals] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                // ✅ Get username from /auth/me endpoint (JWT-based)
                const authRes = await axiosInstance.get('/auth/me');
                const username = authRes.data.username;

                // 🔍 Fetch user data by username
                const response = await axiosInstance.get(`/users/search?username=${username}`);
                setUserData(response.data);
            } catch (err) {
                console.error(err);
                setError('Failed to load user data');
            } finally {
                setLoading(false);
            }
        };

        const fetchJournalEntries = async () => {
            try {
                const response = await axiosInstance.get('/journal/');
                const climbs = Array.isArray(response.data) ? response.data : [];
                setCompletedClimbs(climbs);
            } catch (err) {
                console.error('Failed to fetch journal entries:', err);
                setCompletedClimbs([]); // Fallback to empty array
            }
        };

        const fetchGoals = async () => {
            try {
                setCurrentGoals([
                    { id: 1, title: 'Complete 5 V3 routes', description: 'Push my limits on V3 difficulty', target_date: '2025-05-01', completed: false },
                    { id: 2, title: 'Master the dyno technique', description: 'Practice dynamic movements on the wall', target_date: '2025-06-15', completed: false }
                ]);
                setCompletedGoals([
                    { id: 3, title: 'Climb twice a week', description: 'Build consistent training habit', target_date: '2025-03-15', completed: true },
                ]);
            } catch (err) {
                console.error('Failed to fetch goals:', err);
            }
        };

        fetchUserData();
        fetchJournalEntries();
        fetchGoals();
    }, []);

    const handleSaveClimb = async (climbData) => {
        try {
            let response;
            if (climbData.id) {
                response = await axiosInstance.put(`/journal/edit/${climbData.id}`, climbData);
                setCompletedClimbs(completedClimbs.map(climb =>
                    climb.id === climbData.id ? response.data : climb
                ));
            } else {
                response = await axiosInstance.post('/journal/post', climbData);
                setCompletedClimbs([...completedClimbs, response.data]);
            }
        } catch (err) {
            console.error('Failed to save climb:', err);
        }
    };

    const handleDeleteClimb = async (id) => {
        try {
            await axiosInstance.delete(`/journal/edit/${id}`);
            setCompletedClimbs(completedClimbs.filter(climb => climb.id !== id));
        } catch (err) {
            console.error('Failed to delete climb:', err);
        }
    };

    const handleSaveGoal = (goalData) => {
        try {
            if (goalData.id) {
                setCurrentGoals(currentGoals.map(goal =>
                    goal.id === goalData.id ? goalData : goal
                ));
            } else {
                const newId = Math.max(...currentGoals.map(goal => goal.id), 0) + 1;
                setCurrentGoals([...currentGoals, { ...goalData, id: newId }]);
            }
        } catch (err) {
            console.error('Failed to save goal:', err);
        }
    };

    const handleCompleteGoal = (id) => {
        const goalToUpdate = currentGoals.find(goal => goal.id === id);
        if (!goalToUpdate) return;

        setCurrentGoals(currentGoals.filter(goal => goal.id !== id));
        setCompletedGoals([...completedGoals, { ...goalToUpdate, completed: true }]);
    };

    const handleDeleteGoal = (id, isCompleted) => {
        if (isCompleted) {
            setCompletedGoals(completedGoals.filter(goal => goal.id !== id));
        } else {
            setCurrentGoals(currentGoals.filter(goal => goal.id !== id));
        }
    };

    if (loading) return <div className="loading">Loading dashboard...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>My Dashboard</h1>
                {userData && <p className="welcome-message">Welcome back, {userData.username}!</p>}
            </header>

            {/* ✅ Only render if array */}
            {Array.isArray(completedClimbs) && (
                <StatsOverview completedClimbs={completedClimbs} />
            )}

            <div className="dashboard-content">
                <ClimbsList
                    climbs={completedClimbs}
                    onSaveClimb={handleSaveClimb}
                    onDeleteClimb={handleDeleteClimb}
                />

                <GoalsList
                    currentGoals={currentGoals}
                    completedGoals={completedGoals}
                    onSaveGoal={handleSaveGoal}
                    onCompleteGoal={handleCompleteGoal}
                    onDeleteGoal={handleDeleteGoal}
                />
            </div>
        </div>
    );

}

export default Dashboard;
