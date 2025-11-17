import React from 'react';

export default function Role({ role, word, onEnterHint }) {
  return (
    <div>
      <h3>🎭 Your Role</h3>
      <div className={`role-display ${role === 'imposter' ? 'role-imposter' : 'role-informed'}`}>
        {role === 'imposter' ? '🕵️ You are the IMPOSTER!' : '✅ You are INFORMED!'}
      </div>
      {role !== 'imposter' && (
        <div style={{ textAlign: 'center', padding: '20px', background: 'linear-gradient(135deg, #51cf66 0%, #2f9e44 100%)', borderRadius: '15px', margin: '20px 0' }}>
          <p style={{ fontSize: '1.2rem', marginBottom: 10, color: '#fff' }}>Secret Person:</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff' }}>{word}</p>
        </div>
      )}
      {role === 'imposter' && (
        <div style={{ textAlign: 'center', padding: '20px', background: 'linear-gradient(135deg, #ff6b6b 0%, #c92a2a 100%)', borderRadius: '15px', margin: '20px 0', color: '#fff' }}>
          <p style={{ fontSize: '1.1rem' }}>You must blend in! Give a hint that seems related but don't reveal you don't know the person!</p>
        </div>
      )}
      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <button className="btn" onClick={onEnterHint} style={{ fontSize: '1.2rem', padding: '15px 30px' }}>
          💡 Submit Your Hint
        </button>
      </div>
    </div>
  );
}
