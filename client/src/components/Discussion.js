import React, { useState, useEffect } from 'react';

export default function Discussion({ socket, lobbyId, hints, onGotoVoting, hintStatus }) {
  const [timer, setTimer] = useState(30);
  const [guess, setGuess] = useState('');

  useEffect(() => {
    const t = setInterval(() => setTimer(t => Math.max(0, t - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (timer === 0) onGotoVoting();
  }, [timer, onGotoVoting]);

  const submitGuess = () => {
    if (!guess) return alert('Enter guess');
    socket.emit('team_guess', { lobbyId, guess }, (res) => {
      // result will be broadcast via guess_result / round_result
    });
  };

  return (
    <div>
      <h3>💬 Discussion Phase</h3>
      
      <div className="timer">
        ⏰ {timer}s
      </div>
      
      <div style={{ marginBottom: 20 }}>
        <p style={{ textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: 15 }}>All Hints (Anonymous):</p>
        <ul className="hint-list">
          {hints.map((h, i) => <li key={i}>💡 {h}</li>)}
        </ul>
      </div>
      
      <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '15px', marginBottom: 20 }}>
        <p style={{ textAlign: 'center', marginBottom: 10, fontWeight: 'bold', color: '#333' }}>Think you know who it is?</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <input 
            placeholder="Guess the person's name" 
            value={guess} 
            onChange={e => setGuess(e.target.value)}
            style={{ flex: 1, minWidth: '200px', maxWidth: '400px' }}
          />
          <button className="btn" onClick={submitGuess}>🎯 Guess</button>
        </div>
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <button className="btn" onClick={onGotoVoting} style={{ fontSize: '1.2rem', padding: '15px 30px' }}>
          🗳️ Go to Voting
        </button>
      </div>
    </div>
  );
}
