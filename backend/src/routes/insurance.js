import express from 'express';
import {
  checkCoverage,
  processClaim,
  getClaimStatus,
  listClaims,
  getProviderDetails
} from '../controllers/insuranceController.js';

const router = express.Router();

// POST /api/insurance/check-coverage - Check coverage
router.post('/check-coverage', checkCoverage);

// POST /api/insurance/process-claim - Process claim
router.post('/process-claim', processClaim);

// POST /api/insurance/claim-status - Get claim status
router.post('/claim-status', getClaimStatus);

// POST /api/insurance/claims - List claims
router.post('/claims', listClaims);

// GET /api/insurance/provider/:insuranceId - Get provider details
router.get('/provider/:insuranceId', getProviderDetails);

export default router;
