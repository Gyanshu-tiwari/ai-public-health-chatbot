import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRoutes from './routes/chat.js';
import telemedicineRoutes from './routes/telemedicine.js';
import appointmentRoutes from './routes/appointments.js';
import symptomRoutes from './routes/symptoms.js';
import medicalDbRoutes from './routes/medical-db.js';
import recordsRoutes from './routes/records.js';
import insuranceRoutes from './routes/insurance.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

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

// API Routes
app.use('/api', chatRoutes);
app.use('/api/telemedicine', telemedicineRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/symptoms', symptomRoutes);
app.use('/api/medical-db', medicalDbRoutes);
app.use('/api/records', recordsRoutes);
app.use('/api/insurance', insuranceRoutes);

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

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Chat endpoint: POST http://localhost:${PORT}/api/chat`);
});
