import React, { useEffect, useState } from 'react';
import { createSocket } from './socket';
import Lobby from './components/Lobby';
import Role from './components/Role';
import Hint from './components/Hint';
import Discussion from './components/Discussion';
import Voting from './components/Voting';
import Results from './components/Results';

const socket = createSocket();

function App() {
  const [screen, setScreen] = useState('lobby');
  const [players, setPlayers] = useState([]);
  const [hostId, setHostId] = useState(null);
  const [lobbyId, setLobbyId] = useState(null);
  const [meId, setMeId] = useState(null);
  const [role, setRole] = useState(null);
  const [word, setWord] = useState(null);
  const [hints, setHints] = useState([]);
  const [hintStatus, setHintStatus] = useState({});
  const [roundResult, setRoundResult] = useState(null);

  useEffect(() => {
    setMeId(socket.id);
    socket.on('lobby_update', ({ players, hostId, lobbyId }) => {
      setPlayers(players);
      setHostId(hostId);
      setLobbyId(lobbyId);
    });

    socket.on('role_assigned', (payload) => {
      setRole(payload.role);
      setWord(payload.word || null);
      setScreen('role');
    });

    socket.on('hint_status_update', (status) => {
      setHintStatus(status);
    });

    socket.on('hints_revealed', ({ hints }) => {
      setHints(hints || []);
      setScreen('discussion');
    });

    socket.on('guess_result', (res) => {
      if (res.correct) {
        // round result will arrive from server too
      }
    });

    socket.on('round_result', (res) => {
      setRoundResult(res);
      setScreen('results');
    });

    socket.on('error', (e) => alert(e.message || JSON.stringify(e)));

    return () => {
      socket.off();
    };
  }, []);

  const resetForNewRound = () => {
    setRole(null); setWord(null); setHints([]); setHintStatus({}); setRoundResult(null); setScreen('lobby');
  };

  return (
    <div className="app">
      <h2>Word Imposter — Demo</h2>
      <div className="panel">
        {screen === 'lobby' && (
          <Lobby socket={socket} players={players} hostId={hostId} lobbyId={lobbyId} meId={meId} onStart={() => {}} onJoined={() => {}} />
        )}
        {screen === 'role' && (
          <Role role={role} word={word} onEnterHint={() => setScreen('hint')} />
        )}
        {screen === 'hint' && (
          <Hint socket={socket} lobbyId={lobbyId} onWaiting={() => setScreen('discussion')} hintStatus={hintStatus} />
        )}
        {screen === 'discussion' && (
          <Discussion socket={socket} lobbyId={lobbyId} hints={hints} onGotoVoting={() => setScreen('voting')} hintStatus={hintStatus} />
        )}
        {screen === 'voting' && (
          <Voting socket={socket} lobbyId={lobbyId} players={players} meId={meId} />
        )}
        {screen === 'results' && (
          <Results result={roundResult} onNext={() => { resetForNewRound(); }} />
        )}
      </div>
      <div style={{ marginTop: 8 }}>
        <small>Socket: <strong>{socket.io.uri}</strong></small>
      </div>
    </div>
  );
}

export default App;
