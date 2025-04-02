import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div style={{ width: '200px', background: '#7ea685', color: 'white', height: '100vh', padding: '1rem' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>MyBoulders</h2>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>MyDashboard</Link>
        <Link to="/sessions" style={{ color: 'white', textDecoration: 'none' }}>Sessions</Link>
        <Link to="/achievements" style={{ color: 'white', textDecoration: 'none' }}>Achievements</Link>
        <Link to="/leaderboard" style={{ color: 'white', textDecoration: 'none' }}>Leaderboard</Link>
      </nav>
    </div>
  );
};

export default NavBar; 
