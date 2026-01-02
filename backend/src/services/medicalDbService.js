/**
 * Medical Database Service
 * Provides access to verified medical information
 * SAFETY: Educational information only, not for diagnosis
 */

class MedicalDatabaseService {
  constructor() {
    // Sample medical database
    this.conditions = {
      'diabetes': {
        name: 'Diabetes',
        description: 'A condition affecting blood sugar levels',
        types: ['Type 1', 'Type 2', 'Gestational'],
        symptoms: ['increased thirst', 'frequent urination', 'fatigue', 'blurred vision'],
        riskFactors: ['family history', 'obesity', 'age', 'sedentary lifestyle'],
        prevention: ['healthy diet', 'regular exercise', 'weight management', 'stress reduction'],
        recommendation: 'Consult an endocrinologist for diagnosis and management',
        source: 'WHO, CDC, Medical Literature',
        languages: ['en', 'hi']
      },
      'hypertension': {
        name: 'Hypertension (High Blood Pressure)',
        description: 'Persistent elevated blood pressure',
        symptoms: ['headaches', 'shortness of breath', 'chest pain (severe)'],
        riskFactors: ['stress', 'salt intake', 'age', 'family history'],
        prevention: ['limit salt', 'regular exercise', 'stress management', 'healthy weight'],
        recommendation: 'Consult a cardiologist for monitoring and treatment',
        source: 'WHO, ACC/AHA Guidelines',
        languages: ['en', 'hi']
      },
      'asthma': {
        name: 'Asthma',
        description: 'Chronic respiratory condition',
        symptoms: ['wheezing', 'difficulty breathing', 'chest tightness', 'cough (especially night)'],
        triggers: ['allergens', 'exercise', 'cold air', 'stress', 'pollution'],
        prevention: ['avoid triggers', 'inhalers', 'medications', 'breathing exercises'],
        recommendation: 'Consult a pulmonologist for proper diagnosis and inhaler prescription',
        source: 'GINA, American Asthma Foundation',
        languages: ['en', 'hi']
      }
    };

    this.medications = {
      'aspirin': {
        name: 'Aspirin',
        type: 'Pain reliever / Antiplatelet',
        uses: ['headache', 'fever', 'heart health'],
        sideEffects: ['stomach irritation', 'allergic reactions', 'bleeding risk'],
        contraindications: ['pregnancy (3rd trimester)', 'bleeding disorders'],
        note: 'Never self-prescribe. Always consult doctor before use.',
        languages: ['en', 'hi']
      },
      'metformin': {
        name: 'Metformin',
        type: 'Diabetes medication',
        uses: ['type 2 diabetes management'],
        sideEffects: ['nausea', 'diarrhea', 'metallic taste'],
        contraindications: ['kidney disease', 'liver disease'],
        note: 'Prescription required. Only a doctor can prescribe this medication.',
        languages: ['en', 'hi']
      }
    };
  }

  /**
   * Search medical conditions
   * SAFETY: Educational information only
   * @param {string} searchTerm - Search query
   * @param {string} language - Response language
   * @returns {Array} Matching conditions
   */
  searchConditions(searchTerm, language = 'en') {
    if (!searchTerm || searchTerm.trim().length === 0) {
      throw new Error('Please provide a search term');
    }

    const term = searchTerm.toLowerCase();
    const results = [];

    Object.entries(this.conditions).forEach(([key, condition]) => {
      if (condition.name.toLowerCase().includes(term) ||
          condition.description.toLowerCase().includes(term) ||
          condition.symptoms.some(s => s.includes(term))) {
        results.push({
          id: key,
          name: condition.name,
          description: condition.description,
          disclaimer: 'This is educational information. Not a diagnosis.'
        });
      }
    });

    return {
      searchTerm,
      resultsCount: results.length,
      results,
      disclaimer: 'All information is for educational purposes only. Always consult a healthcare professional.',
      language
    };
  }

  /**
   * Get condition details
   * @param {string} conditionId - Condition ID
   * @param {string} language - Response language
   * @returns {Object} Detailed condition information
   */
  getConditionDetails(conditionId, language = 'en') {
    const condition = this.conditions[conditionId];

    if (!condition) {
      throw new Error('Condition not found');
    }

    return {
      id: conditionId,
      name: condition.name,
      description: condition.description,
      types: condition.types,
      symptoms: condition.symptoms,
      riskFactors: condition.riskFactors,
      prevention: condition.prevention,
      recommendation: condition.recommendation,
      source: condition.source,
      disclaimer: 'This information is for awareness only. Not a medical diagnosis. Always consult a healthcare professional.',
      language
    };
  }

  /**
   * Search medications
   * SAFETY: Information only, not a prescription
   * @param {string} searchTerm - Medication name or type
   * @param {string} language - Response language
   * @returns {Array} Matching medications
   */
  searchMedications(searchTerm, language = 'en') {
    if (!searchTerm || searchTerm.trim().length === 0) {
      throw new Error('Please provide a search term');
    }

    const term = searchTerm.toLowerCase();
    const results = [];

    Object.entries(this.medications).forEach(([key, med]) => {
      if (med.name.toLowerCase().includes(term) ||
          med.type.toLowerCase().includes(term)) {
        results.push({
          id: key,
          name: med.name,
          type: med.type,
          disclaimer: 'This is informational only. NOT a prescription.'
        });
      }
    });

    return {
      searchTerm,
      resultsCount: results.length,
      results,
      disclaimer: '⚠️ This information is for educational purposes only. Do NOT use for self-treatment. Always consult a doctor before taking any medication.',
      language
    };
  }

  /**
   * Get medication details
   * @param {string} medicationId - Medication ID
   * @param {string} language - Response language
   * @returns {Object} Medication information
   */
  getMedicationDetails(medicationId, language = 'en') {
    const med = this.medications[medicationId];

    if (!med) {
      throw new Error('Medication not found');
    }

    return {
      id: medicationId,
      name: med.name,
      type: med.type,
      uses: med.uses,
      sideEffects: med.sideEffects,
      contraindications: med.contraindications,
      note: med.note,
      disclaimer: 'This is informational content. A doctor must prescribe medications. Never self-medicate.',
      language
    };
  }

  /**
   * Get health tips
   * SAFETY: Preventative and educational information
   * @param {string} category - Category (nutrition, exercise, hygiene, mental-health)
   * @param {string} language - Response language
   * @returns {Array} Health tips
   */
  getHealthTips(category = 'general', language = 'en') {
    const tips = {
      'nutrition': {
        tips: [
          'Eat variety of fruits and vegetables daily',
          'Choose whole grains over refined grains',
          'Limit sugar and salt intake',
          'Stay hydrated - drink adequate water',
          'Include protein in each meal'
        ],
        icon: '🥗'
      },
      'exercise': {
        tips: [
          'Get at least 150 minutes of moderate activity weekly',
          'Include strength training 2x per week',
          'Start slowly and gradually increase intensity',
          'Find activities you enjoy for consistency',
          'Consult doctor before starting new exercise program'
        ],
        icon: '🏃'
      },
      'sleep': {
        tips: [
          'Get 7-9 hours of sleep per night',
          'Maintain consistent sleep schedule',
          'Create dark, cool sleeping environment',
          'Avoid screens 1 hour before bed',
          'Limit caffeine after noon'
        ],
        icon: '😴'
      },
      'mental-health': {
        tips: [
          'Practice daily meditation or mindfulness',
          'Maintain social connections',
          'Manage stress through healthy habits',
          'Seek professional help when needed',
          'Practice gratitude and positive thinking'
        ],
        icon: '🧘'
      }
    };

    const categoryTips = tips[category] || tips['nutrition'];

    return {
      category,
      icon: categoryTips.icon,
      tips: categoryTips.tips,
      reminder: 'These are general wellness tips. Consult healthcare professionals for personalized advice.',
      language
    };
  }

  /**
   * Get emergency contacts
   * @param {string} country - Country code (us, in, etc)
   * @param {string} language - Response language
   * @returns {Object} Emergency contacts
   */
  getEmergencyContacts(country = 'in', language = 'en') {
    const contacts = {
      'in': {
        ambulance: '100',
        police: '101',
        poisoning: '1800-11-6077',
        mentalHealth: '1800-599-0019'
      },
      'us': {
        emergencyService: '911',
        poisonControl: '1-800-222-1222',
        suicidePrevention: '988'
      }
    };

    const countryContacts = contacts[country] || contacts['in'];

    return {
      country,
      contacts: countryContacts,
      message: 'In life-threatening emergency, always call local emergency number immediately.',
      language
    };
  }
}

export default new MedicalDatabaseService();
