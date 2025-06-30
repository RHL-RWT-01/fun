import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/authRoutes.js';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
t
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});
app.get('/', (req, res) => {
    res.send('Hello from the server side!');
});
app.use('/api/auth', authRouter);
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
