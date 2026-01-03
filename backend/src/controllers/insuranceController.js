import insuranceService from '../services/insuranceService.js';

/**
 * Insurance Controller
 * Handles insurance coverage and claim management
 */

export const checkCoverage = (req, res) => {
  try {
    const { insuranceId, treatmentCode, provider } = req.body;

    // Validate required fields
    if (!insuranceId || !treatmentCode || !provider) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['insuranceId', 'treatmentCode', 'provider'],
        treatmentCodes: ['office-visit', 'specialist-visit', 'lab-test', 'ct-scan', 'emergency-room'],
        example: {
          insuranceId: 'INS-12345',
          treatmentCode: 'office-visit',
          provider: 'City Medical Center'
        }
      });
    }

    const coverage = insuranceService.checkCoverage(insuranceId, treatmentCode, provider);

    res.json({
      success: true,
      ...coverage
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const processClaim = (req, res) => {
  try {
    const { insuranceId, userId, treatmentCode, providerId, amount, date } = req.body;

    // Validate required fields
    if (!insuranceId || !userId || !treatmentCode || !providerId || !amount || !date) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['insuranceId', 'userId', 'treatmentCode', 'providerId', 'amount', 'date'],
        example: {
          insuranceId: 'INS-12345',
          userId: 'user-123',
          treatmentCode: 'office-visit',
          providerId: 'provider-001',
          amount: 150,
          date: '2024-01-10'
        }
      });
    }

    const claim = insuranceService.processClaim(
      insuranceId,
      userId,
      treatmentCode,
      providerId,
      parseFloat(amount),
      date
    );

    res.json({
      success: true,
      message: 'Insurance claim submitted',
      ...claim
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getClaimStatus = (req, res) => {
  try {
    const { claimId, userId } = req.body;

    if (!claimId || !userId) {
      return res.status(400).json({
        error: 'claimId and userId are required'
      });
    }

    const status = insuranceService.getClaimStatus(claimId, userId);

    res.json({
      success: true,
      ...status
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const listClaims = (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        error: 'userId is required'
      });
    }

    const claims = insuranceService.listClaims(userId);

    res.json({
      success: true,
      ...claims
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProviderDetails = (req, res) => {
  try {
    const { insuranceId } = req.params;

    if (!insuranceId) {
      return res.status(400).json({
        error: 'insuranceId is required'
      });
    }

    const details = insuranceService.getProviderDetails(insuranceId);

    res.json({
      success: true,
      ...details
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
