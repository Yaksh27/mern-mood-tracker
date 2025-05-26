// src/pages/Journal/Journal.js
import { useState, useEffect, useRef } from 'react';
import JournalEntry from '../../components/JournalEntry/JournalEntry';
import './Journal.css';
import { authFetch } from '../../utils/api';

export default function Journal() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({ totalEntries: 0, avgLength: 0, streak: 0 });
  const textareaRef = useRef(null);

  const prompts = [
    "What challenged you today?",
    "What are you grateful for?",
    "What lesson will you take from today?",
    "Describe a moment that stood out.",
    "How have you grown recently?"
  ];
  const [currentPrompt, setCurrentPrompt] = useState('');

// 1. Load journal entries once on mount
useEffect(() => {
  const loadEntries = async () => {
    try {
      const data = await authFetch('http://localhost:5000/api/journals');
      setEntries(data);
    } catch (err) {
      alert(err.message || 'Failed to load journal entries');
    }
  };

  loadEntries();
}, []);

// 2. Animate prompt cycling if input is empty
useEffect(() => {
  if (!newEntry.trim()) {
    const interval = setInterval(() => {
      setCurrentPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
    }, 4000);
    return () => clearInterval(interval);
  }
}, [newEntry]);

// 3. Recalculate stats when entries change
useEffect(() => {
  if (entries.length > 0) {
    const totalChars = entries.reduce((sum, entry) => sum + entry.content.length, 0);
    setStats({
      totalEntries: entries.length,
      avgLength: Math.round(totalChars / entries.length),
      streak: calculateStreak()
    });
  }
}, [entries]);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!newEntry.trim()) return;

  try {
    const saved = await authFetch('http://localhost:5000/api/journals', 'POST', {
      content: newEntry,
    });

    setEntries([saved, ...entries]);
    setNewEntry('');
  } catch (err) {
    alert(err.message || 'Failed to save entry.');
  }
};

  const filteredEntries = entries.filter(entry =>
    entry.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportEntries = (format) => {
    let exportContent = '';
    if (format === 'text') {
      exportContent = entries.map(e =>
        `${new Date(e.date).toLocaleString()}\n${e.content}\n\n`
      ).join('');
      const blob = new Blob([exportContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'mindgarden-journal.txt';
      a.click();
    }
  };

  return (
    <div className="journal-page">
      <div className="journal-header">
        <h1 className="headingDailyJournal">Daily Journal</h1>
        <div className="journal-stats">
          <span title="Total Entries">📝 {stats.totalEntries}</span>
          <span title="Average Length">✍️ {stats.avgLength} chars</span>
          <span title="Writing Streak">🔥 {stats.streak} days</span>
        </div>
      </div>

      <div className="journal-controls">
        <input
          type="text"
          placeholder="Search entries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button
          onClick={() => exportEntries('text')}
          className="export-button"
        >
          Export Entries
        </button>
      </div>

      <form onSubmit={handleSubmit} className="journal-form">
        <div className="animated-placeholder">
          {(!newEntry && currentPrompt) && <span>{currentPrompt}</span>}
        </div>

        <textarea
          ref={textareaRef}
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder=""
          className="journal-textarea"
        />
        <div className="form-footer">
          <div className="length-indicator">
            {newEntry.length > 0 && `${newEntry.length} chars`}
          </div>
          <button
            type="submit"
            className="submit-button"
            disabled={!newEntry.trim()}
          >
            Save Entry
          </button>
        </div>
      </form>

      <div className="entries-list">
        {filteredEntries.map(entry => (
          <div className="fade-in-entry" key={entry.id}>
            <JournalEntry entry={entry} />
          </div>
        ))}
      </div>
    </div>
  );
}

function calculateStreak() {
  return 3; // Placeholder
}
