import express from 'express';
import {
  searchConditions,
  getConditionDetails,
  searchMedications,
  getMedicationDetails,
  getHealthTips,
  getEmergencyContacts
} from '../controllers/medicalDbController.js';

const router = express.Router();

// POST /api/medical-db/search-conditions - Search conditions
router.post('/search-conditions', searchConditions);

// GET /api/medical-db/conditions/:conditionId - Get condition details
router.get('/conditions/:conditionId', getConditionDetails);

// POST /api/medical-db/search-medications - Search medications
router.post('/search-medications', searchMedications);

// GET /api/medical-db/medications/:medicationId - Get medication details
router.get('/medications/:medicationId', getMedicationDetails);

// GET /api/medical-db/health-tips - Get health tips
router.get('/health-tips', getHealthTips);

// GET /api/medical-db/emergency-contacts - Get emergency contacts
router.get('/emergency-contacts', getEmergencyContacts);

export default router;
