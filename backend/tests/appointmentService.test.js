import test from 'node:test';
import assert from 'node:assert/strict';
import appointmentService from '../src/services/appointmentService.js';

// Unit tests for AppointmentService

test('bookAppointment should create a confirmed appointment with valid data', () => {
  const provider = appointmentService.getProviders()[0];

  const result = appointmentService.bookAppointment(
    provider.id,
    'user-test-1',
    '2024-12-31',
    provider.availableSlots[0],
    'consultation',
    'Test appointment'
  );

  assert.equal(result.status, 'confirmed');
  assert.ok(result.appointmentId);
  assert.equal(result.provider, provider.name);
});

test('bookAppointment should throw for invalid provider', () => {
  assert.throws(
    () => {
      appointmentService.bookAppointment(
        'invalid-provider',
        'user-test-2',
        '2024-12-31',
        '10:00',
        'consultation',
        'Invalid test'
      );
    },
    /Healthcare provider not found/
  );
});
