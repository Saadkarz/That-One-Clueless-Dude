import React, { useState, useEffect } from 'react';

export default function Hint({ socket, lobbyId, onWaiting, hintStatus }) {
  const [hint, setHint] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (hintStatus && hintStatus.submitted && hintStatus.total) {
      if (hintStatus.submitted >= hintStatus.total) setSubmitted(true);
    }
  }, [hintStatus]);

  const submit = () => {
    if (!hint) return alert('Enter a one-word hint');
    socket.emit('submit_hint', { lobbyId, hint }, (res) => {
      setSubmitted(true);
      // onWaiting will be called when hints are revealed via socket
    });
  };

  return (
    <div>
      <h3>💡 Submit Your Hint</h3>
      {!submitted ? (
        <div>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <p style={{ fontSize: '1.1rem', marginBottom: 15 }}>Give a <strong>ONE-WORD</strong> hint about the person!</p>
            <input 
              placeholder="one word only..." 
              value={hint} 
              onChange={e => setHint(e.target.value)}
              style={{ fontSize: '1.2rem', padding: '15px', width: '80%', maxWidth: '400px' }}
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <button className="btn" onClick={submit} style={{ fontSize: '1.2rem', padding: '15px 30px' }}>
              ✅ Submit Hint
            </button>
          </div>
          <div style={{ marginTop: 20, textAlign: 'center' }}>
            <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '15px', borderRadius: '10px', color: '#fff', display: 'inline-block' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{hintStatus.submitted || 0}/{hintStatus.total || '?'}</span>
              <p style={{ margin: '5px 0 0 0' }}>hints submitted</p>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '3rem', marginBottom: 20 }}>⏳</div>
          <p style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>Hint submitted! Waiting for others...</p>
          <div style={{ marginTop: 20 }}>
            <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '15px', borderRadius: '10px', color: '#fff', display: 'inline-block' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{hintStatus.submitted || 0}/{hintStatus.total || '?'}</span>
              <p style={{ margin: '5px 0 0 0' }}>hints submitted</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
