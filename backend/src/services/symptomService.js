import { getAIChatResponse } from './aiService.js';

/**
 * Symptom Checker Service
 * Provides preliminary symptom analysis with mandatory doctor referral
 * CRITICAL SAFETY: This is NOT a diagnosis tool
 */

class SymptomService {
  constructor() {
    this.commonSymptoms = [
      'fever', 'cough', 'headache', 'fatigue', 'runny nose',
      'sore throat', 'nausea', 'diarrhea', 'shortness of breath',
      'chest pain', 'abdominal pain', 'muscle aches'
    ];

    this.emergencySymptoms = [
      'severe chest pain',
      'difficulty breathing',
      'severe bleeding',
      'loss of consciousness',
      'severe allergic reaction',
      'signs of stroke',
      'severe abdominal pain'
    ];

    // Sample condition information
    this.conditions = {
      'common-cold': {
        symptoms: ['cough', 'runny nose', 'sore throat', 'fatigue'],
        duration: '7-10 days',
        severity: 'mild',
        prevention: 'Hand hygiene, avoid close contact'
      },
      'flu': {
        symptoms: ['fever', 'cough', 'muscle aches', 'fatigue'],
        duration: '7-14 days',
        severity: 'moderate',
        prevention: 'Vaccination, hygiene, rest'
      },
      'migraine': {
        symptoms: ['headache', 'nausea', 'light sensitivity'],
        duration: '4-72 hours',
        severity: 'moderate-severe',
        prevention: 'Stress management, regular sleep'
      }
    };
  }

  /**
   * Check symptoms and provide preliminary analysis
   * SAFETY: Always recommends consulting a healthcare professional
   * @param {Array} symptoms - Array of symptoms
   * @param {string} duration - Duration of symptoms
   * @param {string} severity - Severity level (mild, moderate, severe)
   * @param {number} age - User age
   * @param {string} language - Response language
   * @returns {Object} Analysis with doctor recommendation
   */
  async checkSymptoms(symptoms, duration, severity, age, language = 'en') {
    // Validate inputs
    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      throw new Error('Please provide at least one symptom');
    }

    // Check for emergency symptoms
    const hasEmergencySymptoms = this.checkEmergencySymptoms(symptoms);
    if (hasEmergencySymptoms) {
      return this.getEmergencyResponse(language);
    }

    // Get AI analysis
    const aiAnalysis = await this.getAIAnalysis(symptoms, duration, severity, age, language);

    // Get recommended doctors
    const recommendedDoctors = this.getRecommendedDoctors(symptoms);

    return {
      symptoms: symptoms.join(', '),
      duration,
      severity,
      preliminaryAnalysis: aiAnalysis,
      recommendation: this.getRecommendation(language),
      suggestedDoctors: recommendedDoctors,
      emergencyWarning: false,
      disclaimer: this.getDisclaimer(language),
      nextSteps: [
        '1. Review the analysis above',
        '2. Schedule an appointment with a doctor',
        '3. Keep track of symptom changes',
        '4. Follow doctor\'s advice for treatment'
      ]
    };
  }

  /**
   * Check if symptoms indicate emergency
   * @param {Array} symptoms - Symptoms array
   * @returns {boolean} True if emergency symptoms detected
   */
  checkEmergencySymptoms(symptoms) {
    const lowerSymptoms = symptoms.map(s => s.toLowerCase());
    return this.emergencySymptoms.some(emergency =>
      lowerSymptoms.some(symptom =>
        symptom.includes(emergency.replace('severe ', '').split(' ')[0])
      )
    );
  }

  /**
   * Get emergency response
   * @param {string} language - Response language
   * @returns {Object} Emergency alert
   */
  getEmergencyResponse(language = 'en') {
    const messages = {
      en: {
        title: '⚠️ EMERGENCY - SEEK IMMEDIATE MEDICAL CARE',
        message: 'Your symptoms suggest a potentially serious condition.',
        action: 'CALL EMERGENCY IMMEDIATELY',
        emergency911: 'Call 911 (USA) or your local emergency number',
        emergency100: 'Call 100 (India - Ambulance)',
        doNotWait: 'Do not wait - seek medical help immediately',
        symptomAnalysis: 'Not applicable - Emergency situation'
      },
      hi: {
        title: '⚠️ आपातकाल - तत्काल चिकित्सा सहायता प्राप्त करें',
        message: 'आपके लक्षण संभावित गंभीर स्थिति का संकेत देते हैं।',
        action: 'तुरंत आपातकाल संख्या पर कॉल करें',
        emergency911: 'Call 911 (USA) या आपने स्थानीय आपातकाल संख्या',
        emergency100: 'Call 100 (भारत - एम्बुलेंस)',
        doNotWait: 'प्रतीक्षा न करें - तुरंत चिकित्सा सहायता लें',
        symptomAnalysis: 'लागू नहीं - आपातकालीन स्थिति'
      }
    };

    return {
      emergencyWarning: true,
      ...messages[language] || messages['en']
    };
  }

  /**
   * Get AI analysis using OpenAI
   * @param {Array} symptoms - Symptoms
   * @param {string} duration - Duration
   * @param {string} severity - Severity
   * @param {number} age - Age
   * @param {string} language - Language
   * @returns {string} AI analysis
   */
  async getAIAnalysis(symptoms, duration, severity, age, language) {
    const prompt = language === 'hi'
      ? `मरीज की जानकारी: उम्र ${age}, लक्षण: ${symptoms.join(', ')}, अवधि: ${duration}, गंभीरता: ${severity}। इन लक्षणों के संभावित कारण क्या हो सकते हैं? (केवल संभावित कारण, निदान नहीं)। दृढ़ता से सलाह दें कि डॉक्टर से परामर्श लें।`
      : `Patient info: Age ${age}, symptoms: ${symptoms.join(', ')}, duration: ${duration}, severity: ${severity}. What could cause these symptoms? (Only possibilities, not diagnosis). Strongly recommend consulting a doctor.`;

    try {
      const response = await getAIChatResponse(prompt, language);
      return response;
    } catch (error) {
      console.error('AI analysis error:', error);
      return 'Unable to generate analysis at this time. Please consult a healthcare professional.';
    }
  }

  /**
   * Get recommended doctors based on symptoms
   * @param {Array} symptoms - Symptoms
   * @returns {Array} Recommended doctor specialties
   */
  getRecommendedDoctors(symptoms) {
    const symptomToDoctorMap = {
      'cough': 'General Practitioner',
      'fever': 'General Practitioner',
      'chest pain': 'Cardiologist',
      'headache': 'Neurologist',
      'skin': 'Dermatologist',
      'joint': 'Orthopedist',
      'stomach': 'Gastroenterologist',
      'eye': 'Ophthalmologist'
    };

    let recommendedSpecialties = new Set(['General Practitioner']);

    symptoms.forEach(symptom => {
      const lowerSymptom = symptom.toLowerCase();
      Object.entries(symptomToDoctorMap).forEach(([key, specialty]) => {
        if (lowerSymptom.includes(key)) {
          recommendedSpecialties.add(specialty);
        }
      });
    });

    return Array.from(recommendedSpecialties).map(specialty => ({
      specialty,
      reason: `Recommended for ${specialty} evaluation of your symptoms`
    }));
  }

  /**
   * Get recommendation text
   * @param {string} language - Language
   * @returns {string} Recommendation message
   */
  getRecommendation(language = 'en') {
    const messages = {
      en: '⚠️ RECOMMENDATION: Please consult a healthcare professional for proper diagnosis and treatment. This analysis is for awareness only.',
      hi: '⚠️ सिफारिश: सही निदान और उपचार के लिए कृपया एक स्वास्थ्य पेशेवर से परामर्श लें। यह विश्लेषण केवल जानकारी के लिए है।'
    };
    return messages[language] || messages['en'];
  }

  /**
   * Get disclaimer
   * @param {string} language - Language
   * @returns {string} Disclaimer message
   */
  getDisclaimer(language = 'en') {
    const messages = {
      en: 'This is NOT a medical diagnosis. The analysis is based on symptoms provided and should not be used for self-treatment. Always consult a qualified healthcare professional.',
      hi: 'यह चिकित्सा निदान नहीं है। यह विश्लेषण दिए गए लक्षणों पर आधारित है और आत्म-चिकित्सा के लिए उपयोग नहीं किया जाना चाहिए। हमेशा एक योग्य स्वास्थ्य पेशेवर से परामर्श लें।'
    };
    return messages[language] || messages['en'];
  }
}

export default new SymptomService();
