# 🎭 Word Imposter - The Ultimate Social Deduction Game

<div align="center">

![Game Banner](https://img.shields.io/badge/Game-Word%20Imposter-blueviolet?style=for-the-badge&logo=gamepad)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)
![Players](https://img.shields.io/badge/players-4+-green?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-orange?style=for-the-badge)

**A thrilling multiplayer game where one player is the imposter!**

*Can you blend in, or will you be caught?*

[Play Now](#-getting-started) • [Features](#-features) • [How to Play](#-how-to-play) • [Tech Stack](#-tech-stack)

</div>

---

## 🌟 About The Game

**Word Imposter** is an exciting real-time multiplayer social deduction game built with modern web technologies. Inspired by popular party games, it challenges players to identify the imposter among them using only one-word hints about famous personalities!

### 🎯 Game Concept

- **4+ Players** gather in a lobby
- **3 Informed Players** know the secret celebrity/character
- **1 Imposter** has no clue who it is
- Everyone gives **one-word hints**
- Can the team guess correctly? Can they catch the imposter?

---

## ✨ Features

### 🎨 Beautiful Modern UI
- Stunning gradient backgrounds
- Smooth animations and transitions
- Color-coded player avatars
- Responsive design for all devices

### 🎭 Rich Word Database
Our game includes **100+ famous personalities**:
- 🎬 **Actors**: Robert Downey Jr., Zendaya, Tom Holland, Leonardo DiCaprio...
- ⚽ **Football Players**: Messi, Ronaldo, Mbappé, Haaland...
- 🎤 **Singers**: Taylor Swift, Beyoncé, Drake, Billie Eilish...
- 🌍 **Global Icons**: Elon Musk, LeBron James, Oprah Winfrey...
- 🎨 **Animated Characters**: SpongeBob, Shrek, Goku, Mickey Mouse...

### 🚀 Real-Time Multiplayer
- Instant lobby creation with shareable codes
- Live player updates
- Real-time hint submission
- Synchronized voting system

### 🎮 Game Flow
1. **Lobby** - Join with friends using a 4-letter code
2. **Role Assignment** - Discover if you're informed or the imposter
3. **Hint Phase** - Submit your one-word hint (40s timer)
4. **Discussion** - Analyze hints and make team guesses (30s)
5. **Voting** - Vote for who you think is the imposter
6. **Results** - See scores and start another round!

---

## 🎯 How to Play

### For Informed Players ✅
1. You'll see the secret person's name
2. Give a **one-word hint** that relates to them
3. Be specific enough to help others, but not too obvious!
4. Discuss hints and try to identify the imposter
5. Vote wisely!

### For the Imposter 🕵️
1. You don't know who the person is
2. Listen carefully to others' hints
3. Give a vague hint that could apply to anyone
4. Blend in during discussion
5. Try not to get caught!

### Winning Conditions 🏆
- **Informed Win**: Catch the imposter by majority vote OR guess the person correctly
- **Imposter Wins**: Avoid getting caught in the vote

---

## 🛠️ Tech Stack

<div align="center">

| Frontend | Backend | Real-Time |
|----------|---------|-----------|
| ![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react) | ![Node.js](https://img.shields.io/badge/Node.js-Latest-339933?style=flat-square&logo=node.js) | ![Socket.IO](https://img.shields.io/badge/Socket.IO-4.7-010101?style=flat-square&logo=socket.io) |
| ![CSS3](https://img.shields.io/badge/CSS3-Animations-1572B6?style=flat-square&logo=css3) | ![Express](https://img.shields.io/badge/Express-4.18-000000?style=flat-square&logo=express) | ![WebSocket](https://img.shields.io/badge/WebSocket-Real--Time-4E9BCD?style=flat-square) |

</div>

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- A modern web browser

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Saadkarz/That-One-Clueless-Dude.git
cd That-One-Clueless-Dude
```

2. **Install server dependencies**
```bash
cd server
npm install
```

3. **Install client dependencies**
```bash
cd ../client
npm install
```

### Running the Game

**Terminal 1 - Start the Server:**
```bash
cd server
npm start
```
Server runs on `http://localhost:4000`

**Terminal 2 - Start the Client:**
```bash
cd client
npm start
```
Client runs on `http://localhost:3000`

### 🎮 Play!
1. Open 4 browser windows to `http://localhost:3000`
2. First player creates a lobby (leave code empty)
3. Other players join using the lobby code
4. Host starts the game when 4+ players are ready
5. Have fun! 🎉

---

## 📁 Project Structure

```
That-One-Clueless-Dude/
├── 📂 server/
│   ├── index.js           # Express + Socket.IO server
│   └── package.json       # Server dependencies
├── 📂 client/
│   ├── 📂 public/
│   │   └── index.html     # HTML template
│   ├── 📂 src/
│   │   ├── index.js       # React entry point
│   │   ├── index.css      # Global styles & animations
│   │   ├── socket.js      # Socket.IO connection
│   │   ├── App.js         # Main app component
│   │   └── 📂 components/
│   │       ├── Lobby.js   # Lobby screen
│   │       ├── Role.js    # Role reveal
│   │       ├── Hint.js    # Hint submission
│   │       ├── Discussion.js  # Discussion phase
│   │       ├── Voting.js  # Voting screen
│   │       └── Results.js # Round results
│   └── package.json       # Client dependencies
└── README.md              # You are here!
```

---

## 🎨 Customization

### Change Server Port
Edit `server/index.js`:
```javascript
const PORT = process.env.PORT || 4000;
```

### Change Socket URL
Set environment variable before starting client:
```bash
set REACT_APP_SOCKET_URL=http://localhost:4000
npm start
```

### Add More Words
Edit `server/index.js` and add to the `WORDS` array!

---

## 🎯 Game Rules Summary

| Phase | Duration | Action |
|-------|----------|--------|
| **Lobby** | ∞ | Join and wait for 4+ players |
| **Role** | 10s | View your role |
| **Hints** | 40s | Submit one-word hint |
| **Discussion** | 30s | Analyze hints, optional guess |
| **Voting** | ∞ | Vote for the imposter |
| **Results** | ∞ | View scores and winner |

### 📊 Scoring System
- **Informed Win**: +1 point per informed player
- **Imposter Win**: +2 points for the imposter

---

## 🎓 Learning Resources

This project demonstrates:
- ✅ Real-time multiplayer game architecture
- ✅ WebSocket communication with Socket.IO
- ✅ React hooks and state management
- ✅ Modern CSS animations and gradients
- ✅ Responsive UI design
- ✅ Game logic and flow control

Perfect for learning full-stack JavaScript development!

---

## 🐛 Known Issues & Future Features

### 🔧 Coming Soon
- [ ] Mobile app version
- [ ] Custom word lists
- [ ] Private lobbies with passwords
- [ ] Game replays
- [ ] Leaderboards
- [ ] Chat system
- [ ] Sound effects and music
- [ ] Multiple language support

### 🐞 Known Issues
- Refresh disconnects player from lobby (by design)
- No reconnection feature yet

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

<div align="center">

### **Saad Karzouz**

[![GitHub](https://img.shields.io/badge/GitHub-Saadkarz-181717?style=for-the-badge&logo=github)](https://github.com/Saadkarz)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-blueviolet?style=for-the-badge&logo=google-chrome)](https://github.com/Saadkarz)

*Full-Stack Developer | Game Enthusiast | Problem Solver*

Made with ❤️ and lots of ☕

</div>

---

## 🌟 Acknowledgments

- Inspired by classic social deduction games
- Built with modern web technologies
- Special thanks to the open-source community

---

<div align="center">

### 🎮 Ready to Play?

**[⭐ Star this repo](https://github.com/Saadkarz/That-One-Clueless-Dude)** if you enjoyed the game!

**[🐛 Report a bug](https://github.com/Saadkarz/That-One-Clueless-Dude/issues)** | **[💡 Request a feature](https://github.com/Saadkarz/That-One-Clueless-Dude/issues)**

---

*Can you find the imposter? 🕵️*

</div>
