import { useState, useEffect } from 'react';
import axiosInstance from '../services/axiosInstance';
import '../styles/Dashboard.css';

import StatsOverview from '../components/dashboard/StatsOverview';
import ClimbsList from '../components/dashboard/ClimbsList';
import GoalsList from '../components/dashboard/GoalsList';

function Dashboard() {
  // State for user data
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for completed climbs and goals
  const [completedClimbs, setCompletedClimbs] = useState([]);
  const [currentGoals, setCurrentGoals] = useState([]);
  const [completedGoals, setCompletedGoals] = useState([]);
  
  // Fetch user data and statistics on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // In a real implementation, this would be the currently logged-in user
        const userId = 1; // Placeholder - replace with actual user ID from auth context
        const response = await axiosInstance.get(`/users/search?user_id=${userId}`);
        setUserData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load user data');
        setLoading(false);
        console.error(err);
      }
    };

    const fetchJournalEntries = async () => {
      try {
        const response = await axiosInstance.get('/journal/');
        setCompletedClimbs(response.data);
      } catch (err) {
        console.error('Failed to fetch journal entries:', err);
      }
    };

    const fetchGoals = async () => {
      try {
        // These would be separate API calls in a real implementation
        // For now using mock data
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

  // Handle saving a climb (new or edited)
  const handleSaveClimb = async (climbData) => {
    try {
      let response;
      if (climbData.id) {
        // Update existing climb
        response = await axiosInstance.put(`/journal/edit/${climbData.id}`, climbData);
        setCompletedClimbs(completedClimbs.map(climb => 
          climb.id === climbData.id ? response.data : climb
        ));
      } else {
        // Create new climb
        response = await axiosInstance.post('/journal/post', climbData);
        setCompletedClimbs([...completedClimbs, response.data]);
      }
    } catch (err) {
      console.error('Failed to save climb:', err);
    }
  };

  // Handle deleting a climb
  const handleDeleteClimb = async (id) => {
    try {
      await axiosInstance.delete(`/journal/edit/${id}`);
      setCompletedClimbs(completedClimbs.filter(climb => climb.id !== id));
    } catch (err) {
      console.error('Failed to delete climb:', err);
    }
  };

  // Handle saving a goal
  const handleSaveGoal = (goalData) => {
    try {
      if (goalData.id) {
        // Update existing goal
        setCurrentGoals(currentGoals.map(goal => 
          goal.id === goalData.id ? goalData : goal
        ));
      } else {
        // Create new goal
        const newId = Math.max(...currentGoals.map(goal => goal.id), 0) + 1;
        setCurrentGoals([...currentGoals, { ...goalData, id: newId }]);
      }
    } catch (err) {
      console.error('Failed to save goal:', err);
    }
  };

  // Handle marking a goal as complete
  const handleCompleteGoal = (id) => {
    const goalToUpdate = currentGoals.find(goal => goal.id === id);
    if (!goalToUpdate) return;
    
    // Remove from current goals
    setCurrentGoals(currentGoals.filter(goal => goal.id !== id));
    
    // Add to completed goals
    setCompletedGoals([...completedGoals, { ...goalToUpdate, completed: true }]);
  };

  // Handle deleting a goal
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

      <StatsOverview completedClimbs={completedClimbs} />

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