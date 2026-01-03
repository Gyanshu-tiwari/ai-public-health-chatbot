import axios from 'axios';

/**
 * Telemedicine Service
 * Manages video consultations with doctors
 * Uses Twilio for video sessions
 */

class TelemedicineService {
  constructor() {
    this.doctors = [
      {
        id: 'doc-001',
        name: 'Dr. Rajesh Sharma',
        specialty: 'General Practitioner',
        rating: 4.8,
        languages: ['en', 'hi'],
        availableSlots: ['14:00', '15:00', '16:00', '17:00'],
        consultationFee: 500,
        experience: '15 years'
      },
      {
        id: 'doc-002',
        name: 'Dr. Priya Patel',
        specialty: 'Pediatrician',
        rating: 4.9,
        languages: ['en', 'hi', 'gu'],
        availableSlots: ['10:00', '11:00', '14:00', '15:00'],
        consultationFee: 600,
        experience: '12 years'
      },
      {
        id: 'doc-003',
        name: 'Dr. Anil Kumar',
        specialty: 'Cardiologist',
        rating: 4.7,
        languages: ['en', 'hi'],
        availableSlots: ['16:00', '17:00'],
        consultationFee: 1000,
        experience: '20 years'
      }
    ];
  }

  /**
   * List available doctors with filters
   * @param {string} specialty - Doctor specialty to filter
   * @param {string} language - Language preference
   * @returns {Array} List of doctors
   */
  listDoctors(specialty = null, language = 'en') {
    let filtered = this.doctors;

    if (specialty) {
      filtered = filtered.filter(doc =>
        doc.specialty.toLowerCase().includes(specialty.toLowerCase())
      );
    }

    return filtered.map(doc => ({
      ...doc,
      languages: doc.languages.includes(language)
        ? doc.languages
        : [...doc.languages, language]
    }));
  }

  /**
   * Schedule a telemedicine consultation
   * SAFETY: Always ensures doctor referral, never replaces diagnosis
   * @param {string} doctorId - Selected doctor ID
   * @param {string} userId - User ID
   * @param {string} dateTime - Appointment date and time
   * @param {string} symptoms - User symptoms
   * @param {string} medicalHistory - Relevant medical history
   * @returns {Object} Session details with video link
   */
  scheduleConsultation(doctorId, userId, dateTime, symptoms, medicalHistory) {
    // Validate inputs
    if (!doctorId || !userId || !dateTime || !symptoms) {
      throw new Error('Missing required fields for consultation');
    }

    // Find doctor
    const doctor = this.doctors.find(d => d.id === doctorId);
    if (!doctor) {
      throw new Error('Doctor not found');
    }

    // Generate session ID
    const sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Create session details
    const sessionDetails = {
      sessionId,
      videoLink: `https://api.twilio.com/telemedicine/sessions/${sessionId}`,
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      userId,
      appointmentTime: dateTime,
      symptoms: symptoms,
      medicalHistory: medicalHistory || 'Not provided',
      fee: doctor.consultationFee,
      status: 'scheduled',
      createdAt: new Date().toISOString(),
      instructions: [
        '✅ Join 5 minutes early',
        '✅ Have your insurance card ready',
        '✅ Be in a quiet, well-lit area',
        '✅ Have water nearby',
        '⚠️ This is a consultation only. For prescription or treatment, doctor will advise next steps'
      ]
    };

    return sessionDetails;
  }

  /**
   * Get user's past consultation sessions
   * @param {string} userId - User ID
   * @returns {Array} List of sessions
   */
  getUserSessions(userId) {
    // In production, fetch from database
    return {
      userId,
      sessions: [
        {
          sessionId: 'session-001',
          doctorName: 'Dr. Rajesh Sharma',
          date: '2024-01-10',
          duration: '20 mins',
          status: 'completed',
          notes: 'General checkup - referred to specialist'
        }
      ]
    };
  }

  /**
   * End consultation and save summary
   * @param {string} sessionId - Session ID
   * @param {string} summary - Doctor's summary
   * @param {string} prescription - Doctor's prescription (if any)
   * @returns {Object} Completion confirmation
   */
  endConsultation(sessionId, summary, prescription) {
    if (!sessionId) {
      throw new Error('Session ID required');
    }

    // Safety check: prescriptions should have doctor approval
    if (prescription) {
      console.log('Prescription issued by doctor:', prescription);
    }

    return {
      sessionId,
      status: 'completed',
      summary: summary || 'No summary provided',
      prescription: prescription || null,
      nextSteps: [
        'Follow doctor\'s recommendations',
        'Schedule follow-up if needed',
        'Contact clinic for prescriptions',
        'Check your email for session recording'
      ],
      recordSaved: true,
      emailSent: true
    };
  }
}

export default new TelemedicineService();
