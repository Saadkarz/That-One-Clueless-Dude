// client/src/socket.js
// Utility to create socket and centralize event registration
import { io } from 'socket.io-client';

const DEFAULT_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:4000';

export function createSocket() {
  const socket = io(DEFAULT_URL, { transports: ['websocket'] });
  socket.on('connect', () => console.log('socket connected', socket.id));
  socket.on('disconnect', () => console.log('socket disconnected'));
  socket.on('error', (e) => console.warn('socket error', e));
  return socket;
}
