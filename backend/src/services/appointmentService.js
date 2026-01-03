/**
 * Appointment Service
 * Manages healthcare provider appointments
 */

class AppointmentService {
  constructor() {
    this.providers = [
      {
        id: 'provider-001',
        name: 'City Medical Center',
        address: '123 Medical Street, Downtown',
        phone: '+91-987-654-3210',
        specialties: ['General', 'Pediatrics', 'Cardiology'],
        availableSlots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
      },
      {
        id: 'provider-002',
        name: 'Riverside Health Clinic',
        address: '456 Wellness Road, Uptown',
        phone: '+91-876-543-2109',
        specialties: ['General', 'Orthopedics', 'Dermatology'],
        availableSlots: ['08:00', '09:00', '15:00', '16:00', '17:00']
      }
    ];

    this.appointments = [];
  }

  /**
   * Get available providers
   * @returns {Array} List of healthcare providers
   */
  getProviders() {
    return this.providers;
  }

  /**
   * Book an appointment
   * SAFETY: Always maintains appointment record for continuity of care
   * @param {string} providerId - Healthcare provider ID
   * @param {string} userId - User ID
   * @param {string} date - Appointment date (YYYY-MM-DD)
   * @param {string} time - Appointment time (HH:MM)
   * @param {string} appointmentType - Type of appointment
   * @param {string} reason - Reason for visit
   * @returns {Object} Appointment confirmation
   */
  bookAppointment(providerId, userId, date, time, appointmentType, reason) {
    // Validate inputs
    if (!providerId || !userId || !date || !time) {
      throw new Error('Missing required appointment fields');
    }

    // Find provider
    const provider = this.providers.find(p => p.id === providerId);
    if (!provider) {
      throw new Error('Healthcare provider not found');
    }

    // Check if time is available
    if (!provider.availableSlots.includes(time)) {
      throw new Error(`Time ${time} is not available. Available slots: ${provider.availableSlots.join(', ')}`);
    }

    // Create appointment
    const appointmentId = `apt-${Date.now()}`;
    const confirmationNumber = `APT-${new Date().getFullYear()}-${String(this.appointments.length + 1).padStart(4, '0')}`;

    const appointment = {
      appointmentId,
      confirmationNumber,
      userId,
      providerId,
      providerName: provider.name,
      address: provider.address,
      phone: provider.phone,
      date,
      time,
      appointmentType,
      reason,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    this.appointments.push(appointment);

    return {
      appointmentId,
      confirmationNumber,
      provider: provider.name,
      date,
      time,
      location: provider.address,
      phone: provider.phone,
      appointmentType,
      reason,
      status: 'confirmed',
      reminder: 'You will receive a reminder 24 hours before your appointment'
    };
  }

  /**
   * List user's appointments
   * @param {string} userId - User ID
   * @returns {Array} User's appointments
   */
  listAppointments(userId) {
    const userAppointments = this.appointments.filter(apt => apt.userId === userId);
    return {
      userId,
      count: userAppointments.length,
      appointments: userAppointments
    };
  }

  /**
   * Reschedule appointment
   * @param {string} appointmentId - Appointment ID to reschedule
   * @param {string} newDate - New appointment date
   * @param {string} newTime - New appointment time
   * @returns {Object} Updated appointment
   */
  rescheduleAppointment(appointmentId, newDate, newTime) {
    const appointment = this.appointments.find(apt => apt.appointmentId === appointmentId);

    if (!appointment) {
      throw new Error('Appointment not found');
    }

    // Check if new time is available
    const provider = this.providers.find(p => p.id === appointment.providerId);
    if (!provider.availableSlots.includes(newTime)) {
      throw new Error(`Time ${newTime} is not available`);
    }

    appointment.date = newDate;
    appointment.time = newTime;
    appointment.rescheduledAt = new Date().toISOString();

    return {
      appointmentId,
      message: 'Appointment rescheduled successfully',
      newDate,
      newTime,
      status: 'confirmed'
    };
  }

  /**
   * Cancel appointment
   * @param {string} appointmentId - Appointment ID
   * @param {string} reason - Cancellation reason
   * @returns {Object} Cancellation confirmation
   */
  cancelAppointment(appointmentId, reason = '') {
    const appointmentIndex = this.appointments.findIndex(apt => apt.appointmentId === appointmentId);

    if (appointmentIndex === -1) {
      throw new Error('Appointment not found');
    }

    const appointment = this.appointments[appointmentIndex];
    appointment.status = 'cancelled';
    appointment.cancellationReason = reason;
    appointment.cancelledAt = new Date().toISOString();

    return {
      appointmentId,
      message: 'Appointment cancelled successfully',
      status: 'cancelled'
    };
  }

  /**
   * Get appointment details
   * @param {string} appointmentId - Appointment ID
   * @returns {Object} Appointment details
   */
  getAppointmentDetails(appointmentId) {
    const appointment = this.appointments.find(apt => apt.appointmentId === appointmentId);

    if (!appointment) {
      throw new Error('Appointment not found');
    }

    return appointment;
  }
}

export default new AppointmentService();
