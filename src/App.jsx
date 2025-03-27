import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import StyleGuide from './pages/StyleGuide'

function App() {
  const [count, setCount] = useState(0)
  const [showStyleGuide, setShowStyleGuide] = useState(false)

  return (
    <>
      {showStyleGuide ? (
        <>
          <button 
            onClick={() => setShowStyleGuide(false)}
            style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 100 }}
          >
            Back to Home
          </button>
          <StyleGuide />
        </>
      ) : (
        <div className="container">
          <div>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>MyBoulders App</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.jsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">
            Click the button below to view the style guide
          </p>
          
          <button 
            onClick={() => setShowStyleGuide(true)}
            style={{ marginTop: 'var(--space-4)' }}
          >
            View Style Guide
          </button>
        </div>
      )}
    </>
  )
}

export default App
