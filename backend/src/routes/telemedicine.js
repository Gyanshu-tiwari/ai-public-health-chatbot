import express from 'express';
import {
  listDoctors,
  scheduleConsultation,
  getUserSessions,
  endConsultation
} from '../controllers/telemedicineController.js';

const router = express.Router();

// POST /api/telemedicine/doctors - List available doctors
router.post('/doctors', listDoctors);

// POST /api/telemedicine/schedule - Schedule consultation
router.post('/schedule', scheduleConsultation);

// POST /api/telemedicine/sessions - Get user's sessions
router.post('/sessions', getUserSessions);

// POST /api/telemedicine/end-session - End consultation
router.post('/end-session', endConsultation);

export default router;
