import express from 'express';
import {
  checkSymptoms,
  getRecommendedDoctors,
  getEmergencyInfo
} from '../controllers/symptomController.js';

const router = express.Router();

// POST /api/symptoms/check - Check symptoms
router.post('/check', checkSymptoms);

// POST /api/symptoms/doctors - Get recommended doctors
router.post('/doctors', getRecommendedDoctors);

// GET /api/symptoms/emergency - Get emergency information
router.get('/emergency', getEmergencyInfo);

export default router;
