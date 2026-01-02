import express from 'express';
import {
  getProviders,
  bookAppointment,
  listAppointments,
  rescheduleAppointment,
  cancelAppointment,
  getAppointmentDetails
} from '../controllers/appointmentController.js';

const router = express.Router();

// GET /api/appointments/providers - Get available providers
router.get('/providers', getProviders);

// POST /api/appointments/book - Book appointment
router.post('/book', bookAppointment);

// POST /api/appointments/list - List user's appointments
router.post('/list', listAppointments);

// PUT /api/appointments/reschedule - Reschedule appointment
router.put('/reschedule', rescheduleAppointment);

// DELETE /api/appointments/cancel - Cancel appointment
router.delete('/cancel', cancelAppointment);

// GET /api/appointments/:appointmentId - Get details
router.get('/:appointmentId', getAppointmentDetails);

export default router;
