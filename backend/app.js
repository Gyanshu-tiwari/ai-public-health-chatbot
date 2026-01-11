import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import dotenv from 'dotenv';
dotenv.config();

import chatRoutes from './src/routes/chat.js';
import messageRoutes from './src/routes/message.js';
import authRoutes from './src/routes/auth.js';
import connectDB from './src/config/db.js';



const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.get('/', (req, res) => {
  res.send('Welcome to the Health Chatbot API');
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Server is running',
    features: [
      'Chat (AI health awareness)',
      'Telemedicine (video consultations)',
      'Appointments (booking)',
      'Symptoms (checker with doctor referral)',
      'Medical Database (conditions, medications, health tips)',
      'Health Records (secure storage and sharing)',
      'Insurance (coverage and claims)'
    ]
  });
});

// Public API Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// Protected API Routes (require API key)
app.use('/api/message',messageRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
});

// Start server (skip when running tests)
if (process.env.NODE_ENV !== 'test') {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`📡 Chat endpoint: POST http://localhost:${PORT}/api/chat`);
      });
    })
    .catch((err) => {
      console.error('Failed to start server due to DB error:', err.message);
      process.exit(1);
    });
}

export default app;