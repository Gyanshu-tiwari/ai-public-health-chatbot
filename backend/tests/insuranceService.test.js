import test from 'node:test';
import assert from 'node:assert/strict';
import insuranceService from '../src/services/insuranceService.js';

// Unit tests for InsuranceService

test('checkCoverage should return coverage details for valid policy and treatment', () => {
  const provider = insuranceService.insuranceProviders[0];
  const result = insuranceService.checkCoverage(provider.id, 'office-visit', 'City Medical Center');

  assert.equal(result.insuranceId, provider.id);
  assert.equal(result.treatmentCode, 'office-visit');
  assert.ok(result.covered === true || result.covered === false);
  assert.ok(result.baseCost);
  assert.ok(result.userResponsibility);
});

test('processClaim should create a claim and return reimbursement estimate', () => {
  const provider = insuranceService.insuranceProviders[0];

  const result = insuranceService.processClaim(
    provider.id,
    'user-claim-1',
    'office-visit',
    'provider-001',
    200,
    '2024-12-01'
  );

  assert.equal(result.status, 'submitted');
  assert.ok(result.claimId);
  assert.ok(result.expectedReimbursement.startsWith('$'));
});
