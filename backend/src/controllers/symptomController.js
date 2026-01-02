import symptomService from '../services/symptomService.js';

/**
 * Symptom Checker Controller
 * Handles symptom analysis and screening
 * SAFETY: Always recommends professional medical consultation
 */

export const checkSymptoms = async (req, res) => {
  try {
    const { symptoms, duration, severity, age, language } = req.body;

    // Validate required fields
    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return res.status(400).json({
        error: 'Symptoms array is required with at least one symptom',
        example: {
          symptoms: ['fever', 'cough'],
          duration: '3 days',
          severity: 'moderate',
          age: 35,
          language: 'en'
        }
      });
    }

    if (!duration || !severity || !age) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['symptoms', 'duration', 'severity', 'age'],
        note: 'Language defaults to English if not specified'
      });
    }

    const analysis = await symptomService.checkSymptoms(
      symptoms,
      duration,
      severity,
      parseInt(age),
      language || 'en'
    );

    res.json({
      success: true,
      ...analysis,
      disclaimer: 'THIS IS NOT A MEDICAL DIAGNOSIS. Always consult a qualified healthcare professional.'
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      disclaimer: 'If symptoms are severe, seek emergency medical care immediately'
    });
  }
};

export const getRecommendedDoctors = (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return res.status(400).json({
        error: 'Symptoms array is required'
      });
    }

    const doctors = symptomService.getRecommendedDoctors(symptoms);

    res.json({
      success: true,
      symptoms,
      recommendedSpecialties: doctors,
      message: 'Based on your symptoms, consider consulting these specialties',
      disclaimer: 'This is a preliminary recommendation. Your doctor may refer you to other specialists.'
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getEmergencyInfo = (req, res) => {
  try {
    const { language } = req.query;

    const emergencyInfo = {
      title: 'EMERGENCY SYMPTOMS',
      warning: 'Call emergency immediately if you experience:',
      symptoms: [
        'Severe chest pain or pressure',
        'Difficulty breathing',
        'Severe allergic reaction',
        'Loss of consciousness',
        'Severe bleeding',
        'Symptoms of stroke',
        'Severe abdominal pain'
      ],
      emergencyContacts: {
        us: '911',
        india: '100',
        uk: '999'
      },
      message: language === 'hi'
        ? 'इन लक्षणों में तुरंत आपातकाल संख्या पर कॉल करें'
        : 'Call emergency immediately for these symptoms',
      doNotWait: 'Do not wait - seek emergency care now'
    };

    res.json({
      success: true,
      ...emergencyInfo
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
