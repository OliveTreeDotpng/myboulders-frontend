import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosInstance from '../../services/axiosInstance';
import { checkAuth } from '../../services/authApi';

function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = checking
  const [authError, setAuthError] = useState(null);
  const location = useLocation();
  
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await checkAuth(); // Använd auth-funktionen i stället för direkt axios
        setIsAuthenticated(true);
        setAuthError(null);
      } catch (err) {
        console.log('Auth check failed:', err);
        setIsAuthenticated(false);
        setAuthError(err.response?.data?.error || "Authentication failed");
      }
    };
    
    verifyAuth();
  }, []);
  
  // While checking auth status, show loading spinner
  if (isAuthenticated === null) {
    return <div className="loading">Kontrollerar inloggning...</div>;
  }
  
  // If auth failed, redirect to login with current location stored
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // If authenticated, render the child routes
  return <Outlet />;
}

export default ProtectedRoute;