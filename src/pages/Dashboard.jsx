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
  const navigate = useNavigate();
  
  // State for authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  
  // State for user data
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for completed climbs and goals
  const [completedClimbs, setCompletedClimbs] = useState([]);
  const [currentGoals, setCurrentGoals] = useState([]);
  const [completedGoals, setCompletedGoals] = useState([]);

  // Check authentication first
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setAuthLoading(true);
        // Try to get a protected resource to check if user is logged in
        await axiosInstance.get('/auth/check');
        setIsAuthenticated(true);
      } catch (err) {
        console.log('User not authenticated, redirecting to login');
        navigate('/login');
      } finally {
        setAuthLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate]);
  
  // Fetch data once authenticated
  useEffect(() => {
    if (!isAuthenticated || authLoading) return;
    
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
        // Use getAllEntries from journalApi service
        const entries = await getAllEntries();
        setCompletedClimbs(entries || []);
      } catch (err) {
        console.error('Failed to fetch journal entries:', err);
        // Don't break the UI if journal entries fail to load
      }
    };

    const fetchGoals = async () => {
      try {
        // Replace mock data with actual API call
        const currentResponse = await axiosInstance.get('/goals/current');
        setCurrentGoals(currentResponse.data.goals || []);
        
        const completedResponse = await axiosInstance.get('/goals/completed');
        setCompletedGoals(completedResponse.data.goals || []);
      } catch (err) {
        console.error('Failed to fetch goals:', err);
        // Fallback to empty arrays on error
        setCurrentGoals([]);
        setCompletedGoals([]);
      }
    };

    fetchUserData();
    fetchJournalEntries();
    fetchGoals();
  }, [isAuthenticated, authLoading, navigate]);

  // Rest of the component remains the same
  const handleSaveClimb = async (climbData) => {
    try {
      // Make sure climbData has both route_type AND difficulty fields
      if (!climbData.route_type || !climbData.difficulty) {
        console.error("Missing required fields for journal entry");
        return;
      }
      
      console.log("Saving climb with data:", climbData);
      
      let savedEntry;
      if (climbData.id) {
        // Update existing entry - make sure to pass difficulty
        savedEntry = await updateEntry(climbData.id, climbData);
        console.log("Updated entry:", savedEntry);
        
        // Update the entry in the local state
        setCompletedClimbs(prev => 
          prev.map(climb => climb.id === climbData.id ? savedEntry : climb)
        );
        
        // Also refresh entries from server to ensure consistency
        fetchJournalEntries();
      } else {
        // Create new entry
        savedEntry = await createEntry(climbData);
        // Add the new entry to the local state
        setCompletedClimbs(prev => [...prev, savedEntry]);
      }
      
    } catch (error) {
      console.error("Failed to save climb:", error);
      // Show error to user
    }
  };

  // Handle deleting a climb
  const handleDeleteClimb = async (id) => {
    try {
      await deleteEntry(id);
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

  if (authLoading || loading) return <div className="loading">Loading dashboard...</div>;
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