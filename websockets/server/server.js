import { WebSocketServer } from 'ws';
import { v4 as uuidv4 } from 'uuid';
import { Kafka } from 'kafkajs';

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


//kafka setup
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['kafka:9092']
})


const consumer = kafka.consumer({ groupId: 'transaction-group' });

async function waitForKafka() {
  const MAX_RETRIES = 10;
  const DELAY_MS = 5000;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await consumer.connect();
      console.log("✅ Connected to Kafka");
      break;
    } catch (err) {
      console.error(`Kafka connection attempt ${attempt} failed, retrying in ${DELAY_MS / 1000}s...`);
      await new Promise((res) => setTimeout(res, DELAY_MS));
    }

    if (attempt === MAX_RETRIES) {
      console.error("❌ Failed to connect to Kafka after multiple attempts");
      process.exit(1);
    }
  }

  await consumer.subscribe({ topic: 'transactions', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const transaction = JSON.parse(message.value.toString());
      console.log(`Received transaction: ${JSON.stringify(transaction)}`);

      const wsMessage = JSON.stringify({ type: 'transaction', data: transaction });

      for (const client of clients) {
        if (client.readyState === 1) {
          client.send(wsMessage);
        }
      }
    },
  });
}

waitForKafka().catch(console.error);




// kafka producer setup







console.log(`WebSocket server running at ws://localhost:${PORT}`);

// setInterval(() => {
//   const transaction = {
//     id: uuidv4(),
//     user: `user_${Math.floor(Math.random() * 1000)}`,
//     amount: (Math.random() * 1000).toFixed(2),
//     timestamp: new Date().toISOString(),
//   };

//   const message = JSON.stringify({ type: 'transaction', data: transaction });

//   for (const client of clients) {
//     if (client.readyState === 1) {
//       client.send(message);
//     }
//   }
// }, 10000);

