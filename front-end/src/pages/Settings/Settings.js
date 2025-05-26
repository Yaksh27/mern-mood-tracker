// src/pages/Settings/Settings.js
import './Settings.css';

export default function Settings() {
  return (
    <div className="settings-page">
      <h1>Settings</h1>

      {/* Appearance Section */}
      <div className="settings-card">
        <h2>🎨 Appearance</h2>

        <div className="setting-option">
          <label htmlFor="theme">Theme</label>
          <select id="theme" className="theme-select">
            <option>Default</option>
            <option>Pastel</option>
            <option>Dark</option>
          </select>
        </div>

        <div className="setting-option">
          <label htmlFor="fontSize">Font Size</label>
          <select id="fontSize" className="theme-select">
            <option>Normal</option>
            <option>Large</option>
            <option>Extra Large</option>
          </select>
        </div>

        <div className="setting-option">
          <label>
            <input type="checkbox" className="toggle" />
            Enable Smooth Animations
          </label>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="settings-card">
        <h2>🔔 Notifications</h2>
        <div className="setting-option">
          <label>
            <input type="checkbox" className="toggle" />
            Daily Reminders
          </label>
        </div>
        <div className="setting-option">
          <label>
            <input type="checkbox" className="toggle" />
            Weekly Mood Summary
          </label>
        </div>
      </div>

      {/* Privacy Section */}
      <div className="settings-card">
        <h2>🔒 Privacy</h2>
        <div className="setting-option">
          <label>
            <input type="checkbox" className="toggle" />
            Keep Journal Entries Private
          </label>
        </div>
      </div>

      {/* Account Section */}
      <div className="settings-card">
        <h2>👤 Account</h2>
        <div className="setting-option">
          <button className="logout-button">
            Log Out
          </button>
        </div>
        <div className="setting-option delete-account">
          <button className="delete-button">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
