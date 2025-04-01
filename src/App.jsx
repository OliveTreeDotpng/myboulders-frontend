import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import './styles/global.css'
import StyleGuide from './pages/StyleGuide'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'

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
        <Route path="/" element={<LandingPage onStyleGuideClick={() => setShowStyleGuide(true)} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
