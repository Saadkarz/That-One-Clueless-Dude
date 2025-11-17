import React, { useEffect, useState } from 'react';

const COLORS = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", 
  "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E2",
  "#F8B739", "#52B788", "#E63946", "#A8DADC"
];

export default function Lobby({ socket, players, hostId, lobbyId, meId }) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  useEffect(() => {
    // empty
  }, []);

  const join = () => {
    if (!name) return alert('Enter a name');
    socket.emit('join_lobby', { name, lobbyId: code || undefined, color: selectedColor }, (res) => {
      if (res && res.ok) {
        // joined; lobby_update will arrive
      }
    });
  };

  const startGame = () => {
    socket.emit('start_game', { lobbyId });
  };

  return (
    <div>
      <h3>🎮 Lobby</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 15, marginBottom: 20 }}>
        <input placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Lobby code (or empty to create)" value={code} onChange={e => setCode(e.target.value.toUpperCase())} />
        
        <div>
          <p style={{ textAlign: 'center', marginBottom: 10, fontWeight: 'bold' }}>Choose Your Color:</p>
          <div className="color-picker">
            {COLORS.map(color => (
              <div
                key={color}
                className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>
        
        <button className="btn" onClick={join}>Join Lobby</button>
      </div>

      <div style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: 15 }}>
        <strong>Lobby Code:</strong> <span style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', padding: '5px 15px', borderRadius: '8px', fontWeight: 'bold' }}>{lobbyId || '---'}</span>
      </div>
      
      <div className="players">
        {players.map(p => (
          <div key={p.id} className="player" style={{ backgroundColor: p.color }}>
            {p.name} {p.id===hostId? '👑':''} {p.id===meId? '(you)':''}
          </div>
        ))}
      </div>
      
      <div style={{ textAlign: 'center', marginTop: 15 }}>
        <small style={{ fontSize: '1rem' }}>Players: {players.length}/4 minimum</small>
      </div>
      
      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <button className="btn" onClick={startGame} disabled={!(players.length >= 4 && socket.id === hostId)} style={{ fontSize: '1.2rem', padding: '15px 30px' }}>
          {socket.id === hostId ? '🚀 Start Game' : 'Waiting for host...'}
        </button>
      </div>
    </div>
  );
}
