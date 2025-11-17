import React, { useState } from 'react';

export default function Voting({ socket, lobbyId, players, meId }) {
  const [selected, setSelected] = useState(null);
  const [voted, setVoted] = useState(false);

  const submitVote = () => {
    if (!selected) return alert('Select a player');
    socket.emit('submit_vote', { lobbyId, votedPlayerId: selected }, (res) => {
      setVoted(true);
      // server will broadcast round_result when all votes in
    });
  };

  return (
    <div>
      <h3>🗳️ Voting Time!</h3>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: 20 }}>Who is the IMPOSTER?</p>
      
      {!voted ? (
        <>
          <div className="voting-grid">
            {players.map(p => (
              <div 
                key={p.id} 
                className={`vote-card ${selected===p.id ? 'selected' : ''} ${p.id===meId ? 'disabled' : ''}`}
                style={{ backgroundColor: p.color, color: '#fff' }}
                onClick={() => p.id !== meId && setSelected(p.id)}
              >
                <div style={{ fontSize: '2rem', marginBottom: 10 }}>
                  {p.id===meId ? '👤' : '🎭'}
                </div>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{p.name}</div>
                {p.id===meId && <div style={{ marginTop: 5, fontSize: '0.9rem' }}>(you)</div>}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, textAlign: 'center' }}>
            <button className="btn" onClick={submitVote} style={{ fontSize: '1.2rem', padding: '15px 30px' }}>
              ✅ Submit Vote
            </button>
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '3rem', marginBottom: 20 }}>⏳</div>
          <p style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>Vote submitted! Waiting for results...</p>
        </div>
      )}
    </div>
  );
}
