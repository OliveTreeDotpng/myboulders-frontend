import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/authApi";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect to login page after successful logout
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Even if logout fails on server, redirect to login
      navigate("/login");
    }
  };

  return (
    <div style={{ width: '200px', background: '#7ea685', color: 'white', height: '100vh', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>MyBoulders</h2>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: '1' }}>
        <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>MyDashboard</Link>
        <Link to="/sessions" style={{ color: 'white', textDecoration: 'none' }}>Sessions</Link>
        <Link to="/achievements" style={{ color: 'white', textDecoration: 'none' }}>Achievements</Link>
        <Link to="/leaderboard" style={{ color: 'white', textDecoration: 'none' }}>Leaderboard</Link>
        <Link to="/profile/:id" style={{ color: 'white', textDecoration: 'none' }}>My Profile</Link>
        
        {/* Add spacer to push the logout button to the bottom */}
        <div style={{ flex: '1' }}></div>
        
        {/* Logout button */}
        <button 
          onClick={handleLogout}
          style={{ 
            background: 'rgba(0, 0, 0, 0.2)', 
            border: 'none',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '1rem',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>⟲</span> Logout
        </button>
      </nav>
    </div>
  );
};

export default NavBar;
