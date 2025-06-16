'use client';

import { useEffect, useState } from 'react';

type Transaction = {
  id: string;
  user: string;
  amount: string;
  timestamp: string;
};

export default function HomePage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      console.log('Received message:', msg);
      if (msg.type === 'transaction') {
        setTransactions((prev) => [msg.data, ...prev.slice(0, 49)]);
      }
    };

    socket.onopen = () => console.log('Connected to WebSocket');
    socket.onclose = () => console.log('Disconnected');
    socket.onerror = (e) => console.error('WebSocket error', e);

    return () => socket.close();
  }, []);

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">💸 Live Transactions</h1>
      <ul className="space-y-2">
        {transactions.map((tx) => (
          <li key={tx.id} className=" shadow p-3 rounded-md border">
            <div className="text-sm font-medium">
              {tx.user} sent <span className="text-green-600">Rs. {tx.amount}</span>
            </div>
            <div className="text-xs text-gray-500">{new Date(tx.timestamp).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
