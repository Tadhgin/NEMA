import React, { useState, useEffect } from 'react';

function Mood() {
  const [mood, setMood] = useState('');
  const [note, setNote] = useState('');
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('mood_entries');
    if (stored) {
      setEntries(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mood_entries', JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const entry = {
      timestamp: new Date().toLocaleString(),
      mood,
      note: note || '(No note)'
    };
    setEntries([entry, ...entries]);
    setMood('');
    setNote('');
  };

  const handleExport = () => {
    const content = entries
      .map((e) => `${e.timestamp} — Mood: ${e.mood}, Note: ${e.note}`)
      .join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mood_log.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all mood entries?')) {
      setEntries([]);
      localStorage.removeItem('mood_entries');
    }
  };

  return (
    <div className="card">
      <h2>🌤️ Mood Tracker</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your mood"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Optional note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={{ marginTop: '8px' }}
        />
        <br />
        <button type="submit" style={{ marginTop: '10px' }}>
          Log Mood
        </button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <h3>Previous Logs</h3>
        {entries.length === 0 && <p>No moods logged yet.</p>}
        <ul>
          {entries.map((entry, index) => (
            <li key={index}>
              <strong>{entry.timestamp}</strong><br />
              Mood: {entry.mood} | Note: {entry.note}
            </li>
          ))}
        </ul>

        {entries.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <button onClick={handleExport}>Export Moods</button>
            <button onClick={handleClear} style={{ marginLeft: '10px' }}>
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Mood;
