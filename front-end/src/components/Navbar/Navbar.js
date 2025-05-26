// src/components/Navbar/Navbar.js
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className={`navbar ${darkMode ? 'dark-mode' : ''}`}>
      <div className="nav-brand">
        <Link to="/" className="nav-logo">
          <span className="logo-part1">Mind</span>
          <span className="logo-part2">Garden</span>
        </Link>
      </div>

      <div className="nav-links">
        <Link to="/" className="nav-link">Mood</Link>
        <Link to="/journal" className="nav-link">Journal</Link>
        <Link to="/insights" className="nav-link">Insights</Link>
        <Link to="/settings" className="nav-link">Settings</Link>
      </div>

      <div className="nav-actions">
        <button 
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>

        <Link to="/auth" className="get-started-btn">
          Get Started
        </Link>
      </div>
    </nav>
  );
}
