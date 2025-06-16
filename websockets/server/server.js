import { WebSocketServer } from 'ws';
import { v4 as uuidv4 } from 'uuid';

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

const clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);
  console.log("Client connected");

  ws.on('close', () => {
    clients.delete(ws);
    console.log("Client disconnected");
  });
});

setInterval(() => {
  const transaction = {
    id: uuidv4(),
    user: `user_${Math.floor(Math.random() * 1000)}`,
    amount: (Math.random() * 1000).toFixed(2),
    timestamp: new Date().toISOString(),
  };

  const message = JSON.stringify({ type: 'transaction', data: transaction });

  for (const client of clients) {
    if (client.readyState === 1) { 
      client.send(message);
    }
  }
}, 10000);

console.log(`WebSocket server running at ws://localhost:${PORT}`);
