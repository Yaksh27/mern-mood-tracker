// src/components/JournalEntry/JournalEntry.js
import './JournalEntry.css';

export default function JournalEntry({ entry }) {
  return (
    <div className="journal-entry">
      <div className="entry-date">
        {new Date(entry.date).toLocaleDateString()}
      </div>
      <div className="entry-content">
        {entry.content}
      </div>
      {entry.aiResponse && (
        <div className="ai-response">
          <div className="ai-label">AI Reflection</div>
          <div className="ai-content">{entry.aiResponse}</div>
        </div>
      )}
    </div>
  );
}