// src/pages/MoodTracker/MoodTracker.js
import { useState } from 'react';
import './MoodTracker.css';
import { authFetch } from '../../utils/api';

const baseColors = ['#FFF79D', '#B3F3F9', '#D3D3FF', '#F6B092', '#C1F1C1'];

const rawMoods = [
  'Happy', 'Joyful', 'Excited', 'Gleeful', 'Amused',
  'Neutral', 'Calm', 'Content', 'Relaxed', 'Bored',
  'Sad', 'Disappointed', 'Down', 'Regretful', 'Worried',
  'Angry', 'Frustrated', 'Furious', 'Annoyed', 'Resentful',
  'Tired', 'Sleepy', 'Surprised', 'Flustered', 'Pleading',
  'Confused', 'Pained', 'Exhausted', 'Loving', 'Adoring',
  'Starstruck', 'Confident', 'Hugging', 'Thoughtful', 'Skeptical',
  'Smug', 'Unimpressed', 'Dismissive'
];

const emojiMap = {
  Happy: '😊', Joyful: '😄', Excited: '😃', Gleeful: '😁', Amused: '😆',
  Neutral: '😐', Calm: '😶', Content: '🙂', Relaxed: '😌', Bored: '😑',
  Sad: '😢', Disappointed: '😥', Down: '😞', Regretful: '😔', Worried: '😟',
  Angry: '😡', Frustrated: '😠', Furious: '🤬', Annoyed: '😤', Resentful: '👿',
  Tired: '😴', Sleepy: '🥱', Surprised: '😲', Flustered: '😳', Pleading: '🥺',
  Confused: '😖', Pained: '😣', Exhausted: '😫', Loving: '🥰', Adoring: '😍',
  Starstruck: '🤩', Confident: '😎', Hugging: '🤗', Thoughtful: '🤔', Skeptical: '🤨',
  Smug: '😏', Unimpressed: '😒', Dismissive: '🙄'
};

const moods = rawMoods.map((label, index) => ({
  emoji: emojiMap[label] || '❓',
  label,
  color: baseColors[index % baseColors.length],
}));

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  

  const handleMoodSubmit = async () => {
  try {
    const payload = {
      mood: selectedMood.emoji,
      label: selectedMood.label,
      note,
    };

    await authFetch('http://localhost:5000/api/moods', 'POST', payload);

    alert('Mood logged successfully!');
    setSelectedMood(null);
    setNote('');
  } catch (err) {
    alert(err.message || 'Failed to log mood.');
  }
};

  return (
    
    <div className="mood-tracker">
      <h1>Hi, How are you feeling today?</h1>
      
      <div className="mood-grid">
        {moods.map((mood) => (
          <div 
            key={mood.label}
            className={`mood-option ${selectedMood?.label === mood.label ? 'selected' : ''}`}
            onClick={() => setSelectedMood(mood)}
            style={{ backgroundColor: mood.color }}
          >
            <span className="emoji">{mood.emoji}</span>
            <span className="label">{mood.label}</span>
          </div>
        ))}
      </div>
    
      <h2>
        Please add a mood note below after selecting your current mood : 
      </h2>

      {selectedMood && (
        <div className="mood-actions">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note about your mood..."
            className="mood-note"
          />
          <button 
            className="submit-button"
            onClick={handleMoodSubmit}
          >
            Log My Mood
          </button>
        </div>
      )}
    </div>
  );
}