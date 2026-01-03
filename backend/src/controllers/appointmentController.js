import appointmentService from '../services/appointmentService.js';

/**
 * Appointment Controller
 * Handles appointment booking and management
 */

export const getProviders = (req, res) => {
  try {
    const providers = appointmentService.getProviders();

    res.json({
      success: true,
      count: providers.length,
      providers
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const bookAppointment = (req, res) => {
  try {
    const { providerId, userId, date, time, appointmentType, reason } = req.body;

    // Validate required fields
    if (!providerId || !userId || !date || !time || !appointmentType) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['providerId', 'userId', 'date', 'time', 'appointmentType'],
        example: {
          providerId: 'provider-001',
          userId: 'user-123',
          date: '2024-01-20',
          time: '10:00',
          appointmentType: 'consultation',
          reason: 'Regular checkup'
        }
      });
    }

    const appointment = appointmentService.bookAppointment(
      providerId,
      userId,
      date,
      time,
      appointmentType,
      reason
    );

    res.json({
      success: true,
      message: 'Appointment booked successfully',
      appointment
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const listAppointments = (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        error: 'userId is required'
      });
    }

    const appointments = appointmentService.listAppointments(userId);

    res.json({
      success: true,
      ...appointments
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const rescheduleAppointment = (req, res) => {
  try {
    const { appointmentId, newDate, newTime } = req.body;

    if (!appointmentId || !newDate || !newTime) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['appointmentId', 'newDate', 'newTime']
      });
    }

    const result = appointmentService.rescheduleAppointment(appointmentId, newDate, newTime);

    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const cancelAppointment = (req, res) => {
  try {
    const { appointmentId, reason } = req.body;

    if (!appointmentId) {
      return res.status(400).json({
        error: 'appointmentId is required'
      });
    }

    const result = appointmentService.cancelAppointment(appointmentId, reason);

    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAppointmentDetails = (req, res) => {
  try {
    const { appointmentId } = req.params;

    if (!appointmentId) {
      return res.status(400).json({
        error: 'appointmentId is required'
      });
    }

    const details = appointmentService.getAppointmentDetails(appointmentId);

    res.json({
      success: true,
      appointment: details
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
