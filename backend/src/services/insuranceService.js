/**
 * Insurance Service
 * Manages insurance coverage checks and claim processing
 */

class InsuranceService {
  constructor() {
    this.insuranceProviders = [
      {
        id: 'ins-001',
        name: 'MediCare Plus',
        coverageArea: ['general-visit', 'specialist', 'lab-tests', 'hospitalization'],
        copay: 50,
        deductible: 1000
      },
      {
        id: 'ins-002',
        name: 'HealthShield',
        coverageArea: ['general-visit', 'specialist', 'emergency', 'surgery'],
        copay: 75,
        deductible: 1500
      }
    ];

    this.claims = [];
    this.treatments = {
      'office-visit': { code: 'OV-001', baseCost: 150, coverage: 80 },
      'specialist-visit': { code: 'SV-001', baseCost: 250, coverage: 70 },
      'lab-test': { code: 'LT-001', baseCost: 100, coverage: 90 },
      'ct-scan': { code: 'CT-001', baseCost: 1000, coverage: 60 },
      'emergency-room': { code: 'ER-001', baseCost: 500, coverage: 80 }
    };
  }

  /**
   * Check insurance coverage
   * @param {string} insuranceId - Insurance policy ID
   * @param {string} treatmentCode - Treatment code
   * @param {string} provider - Healthcare provider
   * @returns {Object} Coverage details
   */
  checkCoverage(insuranceId, treatmentCode, provider) {
    // Validate insurance
    const insurance = this.insuranceProviders.find(i => i.id === insuranceId);
    if (!insurance) {
      throw new Error('Insurance policy not found');
    }

    // Validate treatment
    const treatment = this.treatments[treatmentCode];
    if (!treatment) {
      throw new Error('Treatment code not recognized');
    }

    // Check if treatment is covered
    const isCovered = insurance.coverageArea.some(area =>
      treatmentCode.includes(area.split('-')[0])
    );

    // Calculate costs
    const baseCost = treatment.baseCost;
    const insurancePays = isCovered ? Math.round(baseCost * (treatment.coverage / 100)) : 0;
    const userPays = baseCost - insurancePays + insurance.copay;

    return {
      insuranceId,
      policyName: insurance.name,
      treatmentCode,
      treatmentDescription: this.getTreatmentDescription(treatmentCode),
      provider,
      covered: isCovered,
      baseCost: `$${baseCost}`,
      coveragePercentage: isCovered ? `${treatment.coverage}%` : '0%',
      insurancePays: `$${insurancePays}`,
      copay: `$${insurance.copay}`,
      userResponsibility: `$${userPays}`,
      deductibleRemaining: `$${Math.max(0, insurance.deductible - 600)}`,
      outOfPocketMax: '$5000',
      outOfPocketUsed: '$2400',
      recommendation: isCovered ? 'This treatment is covered by your insurance.' : 'This treatment may not be covered. Please contact your insurance provider.'
    };
  }

  /**
   * Get treatment description
   * @param {string} treatmentCode - Treatment code
   * @returns {string} Treatment description
   */
  getTreatmentDescription(treatmentCode) {
    const descriptions = {
      'office-visit': 'Office visit / Consultation',
      'specialist-visit': 'Specialist consultation',
      'lab-test': 'Laboratory tests',
      'ct-scan': 'CT/CAT Scan',
      'emergency-room': 'Emergency room visit'
    };
    return descriptions[treatmentCode] || 'Medical treatment';
  }

  /**
   * Process insurance claim
   * @param {string} insuranceId - Insurance policy ID
   * @param {string} userId - Patient ID
   * @param {string} treatmentCode - Treatment code
   * @param {string} providerId - Healthcare provider ID
   * @param {number} amount - Treatment amount
   * @param {string} date - Treatment date
   * @returns {Object} Claim submission confirmation
   */
  processClaim(insuranceId, userId, treatmentCode, providerId, amount, date) {
    // Validate inputs
    if (!insuranceId || !userId || !treatmentCode || !providerId || !amount) {
      throw new Error('Missing required claim information');
    }

    const treatment = this.treatments[treatmentCode];
    if (!treatment) {
      throw new Error('Invalid treatment code');
    }

    // Create claim
    const claimId = `claim-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const claim = {
      claimId,
      insuranceId,
      userId,
      treatmentCode,
      providerId,
      amount,
      date,
      submissionDate: new Date().toISOString(),
      status: 'submitted',
      estimatedApproval: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
    };

    this.claims.push(claim);

    // Calculate reimbursement
    const coverage = treatment.coverage;
    const reimbursement = Math.round(amount * (coverage / 100));

    return {
      claimId,
      status: 'submitted',
      message: 'Claim submitted successfully',
      treatedDate: date,
      submissionDate: claim.submissionDate,
      treatmentAmount: `$${amount}`,
      expectedCoverage: `${coverage}%`,
      expectedReimbursement: `$${reimbursement}`,
      estimatedApprovalDate: claim.estimatedApproval,
      nextSteps: [
        '1. Insurance company will review within 7 days',
        '2. You will receive approval/denial notification',
        '3. If approved, reimbursement will be processed',
        '4. Keep all medical receipts for records'
      ],
      trackingUrl: `/api/insurance/claims/${claimId}/status`
    };
  }

  /**
   * Get claim status
   * @param {string} claimId - Claim ID
   * @param {string} userId - User ID
   * @returns {Object} Claim status
   */
  getClaimStatus(claimId, userId) {
    const claim = this.claims.find(c => c.claimId === claimId);

    if (!claim) {
      throw new Error('Claim not found');
    }

    if (claim.userId !== userId) {
      throw new Error('Unauthorized access to claim');
    }

    // Simulate status progression
    const daysElapsed = Math.floor((Date.now() - new Date(claim.submissionDate).getTime()) / (1000 * 60 * 60 * 24));
    let status = 'submitted';

    if (daysElapsed > 7) {
      status = 'approved';
    } else if (daysElapsed > 3) {
      status = 'processing';
    }

    return {
      claimId,
      status,
      submissionDate: claim.submissionDate,
      amount: `$${claim.amount}`,
      treatmentCode: claim.treatmentCode,
      lastUpdate: new Date().toISOString(),
      timeline: [
        { date: claim.submissionDate, event: 'Claim submitted', completed: true },
        { date: new Date(new Date(claim.submissionDate).getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(), event: 'Initial review', completed: daysElapsed > 3 },
        { date: new Date(new Date(claim.submissionDate).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(), event: 'Final approval', completed: daysElapsed > 7 }
      ]
    };
  }

  /**
   * List user's claims
   * @param {string} userId - User ID
   * @returns {Array} User's claims
   */
  listClaims(userId) {
    const userClaims = this.claims.filter(c => c.userId === userId);

    return {
      userId,
      totalClaims: userClaims.length,
      approvedClaims: userClaims.filter(c => c.status === 'approved').length,
      pendingClaims: userClaims.filter(c => c.status === 'processing' || c.status === 'submitted').length,
      claims: userClaims.map(c => ({
        claimId: c.claimId,
        treatmentCode: c.treatmentCode,
        treatmentDescription: this.getTreatmentDescription(c.treatmentCode),
        amount: `$${c.amount}`,
        date: c.date,
        status: c.status,
        submissionDate: c.submissionDate
      }))
    };
  }

  /**
   * Get insurance provider details
   * @param {string} insuranceId - Insurance provider ID
   * @returns {Object} Provider details
   */
  getProviderDetails(insuranceId) {
    const provider = this.insuranceProviders.find(p => p.id === insuranceId);

    if (!provider) {
      throw new Error('Insurance provider not found');
    }

    return {
      id: provider.id,
      name: provider.name,
      coverageAreas: provider.coverageArea,
      copay: `$${provider.copay}`,
      deductible: `$${provider.deductible}`,
      customerService: '1-800-XXX-XXXX',
      website: `https://${provider.name.replace(/\s+/g, '')}.com`,
      availableCoverages: [
        { type: 'Preventive Care', coverage: '100%' },
        { type: 'In-Network Services', coverage: '70-80%' },
        { type: 'Out-of-Network', coverage: '50%' },
        { type: 'Emergency', coverage: '80%' }
      ]
    };
  }
}

export default new InsuranceService();
