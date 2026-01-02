import telemedicineService from '../services/telemedicineService.js';

/**
 * Telemedicine Controller
 * Handles telemedicine endpoints
 */

export const listDoctors = (req, res) => {
  try {
    const { specialty, language } = req.body;

    if (!specialty) {
      return res.status(400).json({
        error: 'Specialty is required',
        example: { specialty: 'General Practitioner', language: 'en' }
      });
    }

    const doctors = telemedicineService.listDoctors(specialty, language || 'en');

    if (doctors.length === 0) {
      return res.status(404).json({
        message: 'No doctors found for the specified specialty',
        specialty
      });
    }

    res.json({
      success: true,
      count: doctors.length,
      doctors
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const scheduleConsultation = (req, res) => {
  try {
    const { doctorId, userId, dateTime, symptoms, medicalHistory } = req.body;

    // Validate required fields
    if (!doctorId || !userId || !dateTime || !symptoms) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['doctorId', 'userId', 'dateTime', 'symptoms'],
        example: {
          doctorId: 'doc-001',
          userId: 'user-123',
          dateTime: '2024-01-15T14:00:00',
          symptoms: 'Persistent headache',
          medicalHistory: 'Diabetes type 2'
        }
      });
    }

    const session = telemedicineService.scheduleConsultation(
      doctorId,
      userId,
      dateTime,
      symptoms,
      medicalHistory
    );

    res.json({
      success: true,
      message: 'Consultation scheduled successfully',
      session
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserSessions = (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        error: 'userId is required'
      });
    }

    const sessions = telemedicineService.getUserSessions(userId);

    res.json({
      success: true,
      ...sessions
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const endConsultation = (req, res) => {
  try {
    const { sessionId, summary, prescription } = req.body;

    if (!sessionId) {
      return res.status(400).json({
        error: 'sessionId is required'
      });
    }

    const result = telemedicineService.endConsultation(sessionId, summary, prescription);

    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
