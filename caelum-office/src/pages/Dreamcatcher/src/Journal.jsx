import React, { useState, useEffect } from 'react';

function Journal() {
  const [entry, setEntry] = useState('');
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('dream_journal_entries');
    if (stored) {
      setEntries(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dream_journal_entries', JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (entry.trim()) {
      const newEntry = {
        text: entry,
        timestamp: new Date().toLocaleString()
      };
      setEntries([newEntry, ...entries]);
      setEntry('');
    }
  };

  const handleExport = () => {
    const content = entries
      .map((e) => `${e.timestamp}\n${e.text}`)
      .join('\n\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dream_journal.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all saved dreams?')) {
      setEntries([]);
      localStorage.removeItem('dream_journal_entries');
    }
  };

  return (
    <div className="card">
      <h2>📝 Dream Journal</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Write your dream here..."
          rows={4}
          style={{ width: '100%', padding: '10px' }}
        />
        <br />
        <button type="submit" style={{ marginTop: '10px' }}>
          Save Dream
        </button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <h3>Saved Entries</h3>
        {entries.length === 0 && <p>No dreams saved yet.</p>}
        <ul>
          {entries.map((e, index) => (
            <li key={index}>
              <strong>{e.timestamp}</strong><br />
              {e.text}
            </li>
          ))}
        </ul>

        {entries.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <button onClick={handleExport}>Export Dreams</button>
            <button onClick={handleClear} style={{ marginLeft: '10px' }}>
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Journal;
