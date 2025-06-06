import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import './styles/global.css'
import StyleGuide from './pages/StyleGuide'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import UserSearch from './components/UserSearch'
import UserProfile from './pages/UserProfile'
import Dashboard from './pages/Dashboard'  
import Leaderboard from './pages/Leaderboard'
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  const [showStyleGuide, setShowStyleGuide] = useState(false)

  if (showStyleGuide) {
    return (
      <>
        <button 
          onClick={() => setShowStyleGuide(false)}
          style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 100 }}
        >
          Back to Home
        </button>
        <StyleGuide />
      </>
    )
  }

  return (
    <Router>
      <Routes>
        {/* Publika sidor */}
        <Route path="/" element={<LandingPage onStyleGuideClick={() => setShowStyleGuide(true)} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Skyddade sidor - kräver inloggning */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/search" element={<UserSearch />} />
            <Route path="/profile/:id" element={<UserProfile />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
