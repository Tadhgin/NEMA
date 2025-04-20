import React, { useState, useEffect } from 'react';

function Reminders() {
  const [reminder, setReminder] = useState('');
  const [when, setWhen] = useState('');
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('reminder_entries');
    if (stored) {
      setEntries(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('reminder_entries', JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reminder.trim()) {
      const newEntry = {
        message: reminder,
        time: when || '(unspecified)',
        timestamp: new Date().toLocaleString()
      };
      setEntries([newEntry, ...entries]);
      setReminder('');
      setWhen('');
    }
  };

  const handleExport = () => {
    const content = entries
      .map((e) => `${e.timestamp} — Reminder: ${e.message} at ${e.time}`)
      .join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reminders.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all reminders?')) {
      setEntries([]);
      localStorage.removeItem('reminder_entries');
    }
  };

  return (
    <div className="card">
      <h2>⏰ Reminders</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Reminder message"
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="When?"
          value={when}
          onChange={(e) => setWhen(e.target.value)}
          style={{ marginTop: '8px' }}
        />
        <br />
        <button type="submit" style={{ marginTop: '10px' }}>
          Save Reminder
        </button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <h3>Saved Reminders</h3>
        {entries.length === 0 && <p>No reminders yet.</p>}
        <ul>
          {entries.map((e, index) => (
            <li key={index}>
              <strong>{e.timestamp}</strong><br />
              {e.message} — <em>{e.time}</em>
            </li>
          ))}
        </ul>

        {entries.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <button onClick={handleExport}>Export Reminders</button>
            <button onClick={handleClear} style={{ marginLeft: '10px' }}>
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reminders;
