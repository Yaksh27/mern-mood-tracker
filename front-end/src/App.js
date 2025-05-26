// src/App.js
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import MoodTracker from './pages/MoodTracker/MoodTracker';
import Journal from './pages/Journal/Journal';
import Insights from './pages/Insights/Insights';
import Settings from './pages/Settings/Settings';
import Auth from './pages/Auth/Auth';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="content">
          <Routes>
            <Route path="/" element={<MoodTracker />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;