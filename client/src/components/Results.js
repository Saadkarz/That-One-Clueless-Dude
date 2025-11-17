import React from 'react';

export default function Results({ result, onNext }) {
  if (!result) return <div>Waiting for results...</div>;
  
  const isInformedWin = result.winner === 'informed';
  
  return (
    <div>
      <h3>🏆 Round Results</h3>
      
      <div style={{ 
        textAlign: 'center', 
        padding: '30px', 
        margin: '20px 0',
        borderRadius: '15px',
        background: isInformedWin 
          ? 'linear-gradient(135deg, #51cf66 0%, #2f9e44 100%)'
          : 'linear-gradient(135deg, #ff6b6b 0%, #c92a2a 100%)',
        color: '#fff'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: 10 }}>
          {isInformedWin ? '✅' : '🕵️'}
        </div>
        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
          {isInformedWin ? 'INFORMED WIN!' : 'IMPOSTER WINS!'}
        </div>
      </div>
      
      <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '15px', marginBottom: 20 }}>
        <p style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: '#333', marginBottom: 10 }}>
          The person was:
        </p>
        <p style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>
          {result.secretWord}
        </p>
      </div>
      
      <div style={{ marginBottom: 20 }}>
        <h4 style={{ color: '#667eea', textAlign: 'center', marginBottom: 15 }}>📊 Votes</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
          {result.votes.map(v => (
            <div key={v.id} style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff',
              padding: '15px',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{v.name}</div>
              <div style={{ fontSize: '1.5rem', marginTop: 5 }}>🗳️ {v.votes}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ marginBottom: 20 }}>
        <h4 style={{ color: '#667eea', textAlign: 'center', marginBottom: 15 }}>🏅 Scores</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
          {result.points.map(p => (
            <div key={p.id} style={{ 
              background: '#f8f9fa',
              padding: '15px',
              borderRadius: '10px',
              textAlign: 'center',
              border: '2px solid #667eea'
            }}>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#333' }}>{p.name}</div>
              <div style={{ fontSize: '1.5rem', marginTop: 5, color: '#667eea', fontWeight: 'bold' }}>⭐ {p.score}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: 30 }}>
        <button className="btn" onClick={onNext} style={{ fontSize: '1.2rem', padding: '15px 30px' }}>
          🔄 Back to Lobby
        </button>
      </div>
    </div>
  );
}
