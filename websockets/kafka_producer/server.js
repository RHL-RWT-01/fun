import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'producer-app',
  brokers: ['kafka:9092']
});

const producer = kafka.producer();

const run = async () => {
  await producer.connect();

  setInterval(async () => {
    const txn = {
      id: Math.random().toString(36).slice(2),
      user: `user_${Math.floor(Math.random() * 1000)}`,
      amount: (Math.random() * 1000).toFixed(2),
      timestamp: new Date().toISOString()
    };

    await producer.send({
      topic: 'transactions',
      messages: [{ value: JSON.stringify({ type: 'transaction', data: txn }) }]
    });

    console.log("Produced:", txn);
  }, 3000);
};

run().catch(console.error);
