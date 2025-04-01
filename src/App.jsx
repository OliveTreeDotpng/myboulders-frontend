import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserSearch from './components/UserSearch';
import UserProfile from './components/UserProfile';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <h1>MyBoulders</h1>
                <Routes>
                    <Route path="/" element={<UserSearch />} />
                    <Route path="/profile/:id" element={<UserProfile />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;

