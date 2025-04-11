import React, { useState } from 'react';
import './App.css';
import Mood from './Mood';
import Journal from './Journal';      // Replace with actual filename if needed
import Reminders from './Reminders';  // Replace with actual filename if needed

function App() {
  const [page, setPage] = useState('mood');

  const renderPage = () => {
    switch (page) {
      case 'mood':
        return <Mood />;
      case 'journal':
        return <Journal />;
      case 'reminders':
        return <Reminders />;
      default:
        return <Mood />;
    }
  };

  return (
    <div className="App" style={{ maxWidth: '700px', margin: '40px auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>🌙 Caelum Dreamcatcher</h1>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <button onClick={() => setPage('mood')} disabled={page === 'mood'}>Mood</button>
        <button onClick={() => setPage('reminders')} disabled={page === 'reminders'} style={{ margin: '0 10px' }}>Reminders</button>
        <button onClick={() => setPage('journal')} disabled={page === 'journal'}>Journal</button>
      </div>

      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
