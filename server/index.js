// server/index.js
// Minimal Express + Socket.IO server for Word Imposter demo
// Run: cd server && npm install && node index.js

const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

const PORT = process.env.PORT || 4000;

// Word list - Famous personalities
const WORDS = [
  // Famous Actors
  "Robert Downey Jr.", "Chris Hemsworth", "Dwayne Johnson", "Tom Holland", 
  "Leonardo DiCaprio", "Zendaya", "Emma Stone", "Ryan Reynolds", "Keanu Reeves",
  "Scarlett Johansson", "Margot Robbie", "Johnny Depp", "Samuel L Jackson",
  "Tom Cruise", "Jennifer Lawrence",
  // Famous Football Players
  "Lionel Messi", "Cristiano Ronaldo", "Neymar Jr", "Kylian Mbappé",
  "Mohamed Salah", "Erling Haaland", "Kevin De Bruyne", "Luka Modrić",
  "Karim Benzema", "Vinícius Júnior", "Harry Kane", "Robert Lewandowski",
  "Antoine Griezmann", "Sadio Mané", "Virgil van Dijk",
  // Famous Singers / Musicians
  "Taylor Swift", "Beyoncé", "Rihanna", "Drake", "Billie Eilish",
  "Ed Sheeran", "Ariana Grande", "The Weeknd", "Justin Bieber", "Bruno Mars",
  "Dua Lipa", "Lady Gaga", "Selena Gomez", "Olivia Rodrigo", "Bad Bunny",
  // Global Icons
  "Oprah Winfrey", "Elon Musk", "LeBron James", "Kim Kardashian",
  "David Beckham", "Jackie Chan", "Morgan Freeman", "Will Smith", "Shakira", "BTS",
  // Animated Characters
  "Mickey Mouse", "Bugs Bunny", "SpongeBob", "Shrek", "Donkey",
  "Homer Simpson", "Bart Simpson", "Rick Sanchez", "Morty Smith", "Goku",
  "Naruto", "Luffy", "Elsa", "Dora", "Pikachu", "Tom and Jerry",
  "Scooby-Doo", "Winnie the Pooh", "Minions", "Spider-Man"
];

// Available player colors
const COLORS = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", 
  "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E2",
  "#F8B739", "#52B788", "#E63946", "#A8DADC"
];

// In-memory lobbies: { code: { players: [{id,socketId,name,score}], hostId, game: {...} } }
const lobbies = {};

// Helpers
function generateCode() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let s = ''; for (let i = 0; i < 4; i++) s += letters[Math.floor(Math.random() * letters.length)];
  return s;
}

function pickWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function validateHint(hint) {
  if (!hint) return false;
  const trimmed = hint.trim();
  // single token letters only
  return /^[A-Za-z]+$/.test(trimmed);
}

function lobbyPlayerList(lobby) {
  return lobby.players.map(p => ({ id: p.id, name: p.name, score: p.score, color: p.color }));
}

// Game flow helpers
function startHintPhase(lobbyId) {
  const lobby = lobbies[lobbyId];
  if (!lobby) return;
  lobby.game.phase = 'hint';
  lobby.game.hints = {}; // playerId -> hint
  lobby.game.hintSubmittedCount = 0;
  // 40s timer
  lobby.game.hintTimer = setTimeout(() => {
    revealHints(lobbyId);
  }, 40000);
  io.to(lobbyId).emit('hint_status_update', { submitted: 0, total: lobby.players.length });
}

function revealHints(lobbyId) {
  const lobby = lobbies[lobbyId];
  if (!lobby || lobby.game.revealed) return;
  lobby.game.revealed = true;
  if (lobby.game.hintTimer) clearTimeout(lobby.game.hintTimer);
  // anonymize hints: array of hint strings (some players may not have submitted)
  const hints = lobby.players.map(p => lobby.game.hints[p.id] || null).filter(Boolean);
  io.to(lobbyId).emit('hints_revealed', { hints });
  // move to discussion phase (30s default). Clients will show discussion UI and can team_guess.
  lobby.game.phase = 'discussion';
  lobby.game.discussionTimer = setTimeout(() => {
    // after discussion, open voting on clients
    io.to(lobbyId).emit('hint_status_update', { discussionEnded: true });
  }, 30000);
}

function endRound(lobbyId, winner, reason) {
  const lobby = lobbies[lobbyId];
  if (!lobby || !lobby.game) return;
  const secretWord = lobby.game.secretWord;
  // votes: mapping voterId -> votedPlayerId
  const votes = lobby.game.votes || {};
  // tally
  const tally = {};
  Object.values(votes).forEach(v => { tally[v] = (tally[v] || 0) + 1; });
  const votesArray = lobby.players.map(p => ({ id: p.id, name: p.name, votes: tally[p.id] || 0 }));
  // scoring: simple
  if (winner === 'informed') {
    lobby.players.forEach(p => { if (p.id !== lobby.game.imposterId) p.score += 1; });
  } else {
    lobby.players.forEach(p => { if (p.id === lobby.game.imposterId) p.score += 2; });
  }
  // emit result
  io.to(lobbyId).emit('round_result', {
    winner,
    reason: reason || '',
    secretWord,
    votes: votesArray,
    points: lobby.players.map(p => ({ id: p.id, name: p.name, score: p.score }))
  });
  // cleanup game state so new round can begin
  clearTimeout(lobby.game.hintTimer);
  clearTimeout(lobby.game.discussionTimer);
  lobby.game = null;
}

io.on('connection', socket => {
  console.log('socket connected', socket.id);

  socket.on('join_lobby', (payload, cb) => {
    // payload: { name, lobbyId?, color }
    let { name, lobbyId, color } = payload || {};
    name = (name || 'Player').substring(0, 20);
    color = color || COLORS[0];
    if (!lobbyId) lobbyId = generateCode();
    if (!lobbies[lobbyId]) {
      lobbies[lobbyId] = { players: [], hostId: null, game: null };
    }
    const lobby = lobbies[lobbyId];
    if (lobby.players.length >= 8) {
      socket.emit('error', { message: 'Lobby full' });
      return cb && cb({ ok: false, reason: 'full' });
    }
    const player = { id: socket.id, socketId: socket.id, name, score: 0, color };
    lobby.players.push(player);
    if (!lobby.hostId) lobby.hostId = player.id;

    socket.join(lobbyId);
    console.log(`${name} joined lobby ${lobbyId}`);
    io.to(lobbyId).emit('lobby_update', { players: lobbyPlayerList(lobby), hostId: lobby.hostId, lobbyId, availableColors: COLORS });
    if (cb) cb({ ok: true, lobbyId, players: lobbyPlayerList(lobby), availableColors: COLORS });
  });

  socket.on('start_game', ({ lobbyId }) => {
    const lobby = lobbies[lobbyId];
    if (!lobby) return socket.emit('error', { message: 'Lobby not found' });
    if (socket.id !== lobby.hostId) return socket.emit('error', { message: 'Only host can start' });
    if (lobby.players.length < 4) return socket.emit('error', { message: 'Need 4 players' });

    // create game
    const secretWord = pickWord();
    const imposterIndex = Math.floor(Math.random() * lobby.players.length);
    const imposterId = lobby.players[imposterIndex].id;
    lobby.game = {
      secretWord,
      imposterId,
      phase: 'starting',
      hints: {},
      votes: {},
      revealed: false,
      guessed: false
    };

    // assign roles
    lobby.players.forEach(p => {
      const role = (p.id === imposterId) ? 'imposter' : 'informed';
      const payload = { role };
      if (role === 'informed') payload.word = secretWord;
      io.to(p.socketId).emit('role_assigned', payload);
    });

    // start hint phase
    startHintPhase(lobbyId);
  });

  socket.on('submit_hint', ({ lobbyId, hint }, cb) => {
    const lobby = lobbies[lobbyId];
    if (!lobby || !lobby.game) return socket.emit('error', { message: 'No active game' });
    if (socket.id === lobby.game.imposterId) {
      // imposter can submit decoy hint too, so allow it
    }
    if (!validateHint(hint)) {
      return socket.emit('error', { message: 'Hint must be a single word (letters only)' });
    }
    if (lobby.game.hints[socket.id]) return cb && cb({ ok: false, reason: 'already submitted' });
    lobby.game.hints[socket.id] = hint.trim().toLowerCase();
    lobby.game.hintSubmittedCount = Object.keys(lobby.game.hints).length;
    io.to(lobbyId).emit('hint_status_update', { submitted: lobby.game.hintSubmittedCount, total: lobby.players.length });
    if (lobby.game.hintSubmittedCount >= lobby.players.length) {
      revealHints(lobbyId);
    }
    if (cb) cb({ ok: true });
  });

  socket.on('team_guess', ({ lobbyId, guess }, cb) => {
    const lobby = lobbies[lobbyId];
    if (!lobby || !lobby.game) return socket.emit('error', { message: 'No active game' });
    if (lobby.game.guessed) return cb && cb({ ok: false, reason: 'already guessed' });
    lobby.game.guessed = true;
    const normalized = (guess || '').trim().toLowerCase();
    const correct = normalized === lobby.game.secretWord;
    io.to(lobbyId).emit('guess_result', { correct, guess: normalized });
    if (correct) {
      endRound(lobbyId, 'informed', 'team_guess_correct');
    }
    if (cb) cb({ ok: true, correct });
  });

  socket.on('submit_vote', ({ lobbyId, votedPlayerId }, cb) => {
    const lobby = lobbies[lobbyId];
    if (!lobby || !lobby.game) return socket.emit('error', { message: 'No active game' });
    lobby.game.votes[socket.id] = votedPlayerId;
    const votesCount = Object.keys(lobby.game.votes).length;
    io.to(lobbyId).emit('hint_status_update', { votesCount, total: lobby.players.length });
    if (votesCount >= lobby.players.length) {
      // tally
      const tally = {};
      Object.values(lobby.game.votes).forEach(v => { tally[v] = (tally[v] || 0) + 1; });
      // pick max
      let chosen = null; let max = -1;
      Object.entries(tally).forEach(([pid, count]) => { if (count > max) { max = count; chosen = pid; } });
      const imposterCaught = chosen === lobby.game.imposterId;
      endRound(lobbyId, imposterCaught ? 'informed' : 'imposter', 'voting');
    }
    if (cb) cb({ ok: true });
  });

  socket.on('leave_lobby', ({ lobbyId }) => {
    const lobby = lobbies[lobbyId];
    if (!lobby) return;
    lobby.players = lobby.players.filter(p => p.id !== socket.id);
    if (lobby.hostId === socket.id) lobby.hostId = lobby.players[0] ? lobby.players[0].id : null;
    io.to(lobbyId).emit('lobby_update', { players: lobbyPlayerList(lobby), hostId: lobby.hostId, lobbyId });
    socket.leave(lobbyId);
  });

  socket.on('disconnect', () => {
    // remove player from any lobbies
    Object.keys(lobbies).forEach(code => {
      const lobby = lobbies[code];
      const idx = lobby.players.findIndex(p => p.id === socket.id);
      if (idx !== -1) {
        lobby.players.splice(idx, 1);
        if (lobby.hostId === socket.id) lobby.hostId = lobby.players[0] ? lobby.players[0].id : null;
        io.to(code).emit('lobby_update', { players: lobbyPlayerList(lobby), hostId: lobby.hostId, lobbyId: code });
      }
      // cleanup empty lobbies
      if (lobby.players.length === 0) delete lobbies[code];
    });
    console.log('socket disconnected', socket.id);
  });
});

// Simple GET / to show server is running and optionally serve client build
app.get('/', (req, res) => {
  res.send('Word Imposter server running');
});

server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
