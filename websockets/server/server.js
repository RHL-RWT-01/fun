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

async function kafkaConsumer() {
  await consumer.connect();
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


kafkaConsumer().catch(console.error);




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

