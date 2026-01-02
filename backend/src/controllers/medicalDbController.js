import medicalDbService from '../services/medicalDbService.js';

/**
 * Medical Database Controller
 * Provides access to verified medical information
 * SAFETY: Educational information only
 */

export const searchConditions = (req, res) => {
  try {
    const { searchTerm, language } = req.body;

    if (!searchTerm) {
      return res.status(400).json({
        error: 'searchTerm is required',
        example: {
          searchTerm: 'diabetes',
          language: 'en'
        }
      });
    }

    const results = medicalDbService.searchConditions(searchTerm, language || 'en');

    res.json({
      success: true,
      ...results
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getConditionDetails = (req, res) => {
  try {
    const { conditionId } = req.params;
    const { language } = req.query;

    if (!conditionId) {
      return res.status(400).json({
        error: 'conditionId is required'
      });
    }

    const details = medicalDbService.getConditionDetails(conditionId, language || 'en');

    res.json({
      success: true,
      ...details
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const searchMedications = (req, res) => {
  try {
    const { searchTerm, language } = req.body;

    if (!searchTerm) {
      return res.status(400).json({
        error: 'searchTerm is required',
        example: {
          searchTerm: 'aspirin',
          language: 'en'
        }
      });
    }

    const results = medicalDbService.searchMedications(searchTerm, language || 'en');

    res.json({
      success: true,
      ...results,
      warning: '⚠️ This is informational only. Do NOT use for self-medication.'
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getMedicationDetails = (req, res) => {
  try {
    const { medicationId } = req.params;
    const { language } = req.query;

    if (!medicationId) {
      return res.status(400).json({
        error: 'medicationId is required'
      });
    }

    const details = medicalDbService.getMedicationDetails(medicationId, language || 'en');

    res.json({
      success: true,
      ...details,
      warning: '⚠️ Medications require doctor\'s prescription. Never self-medicate.'
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getHealthTips = (req, res) => {
  try {
    const { category, language } = req.query;

    const tips = medicalDbService.getHealthTips(category || 'general', language || 'en');

    res.json({
      success: true,
      ...tips
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEmergencyContacts = (req, res) => {
  try {
    const { country, language } = req.query;

    const contacts = medicalDbService.getEmergencyContacts(country || 'in', language || 'en');

    res.json({
      success: true,
      ...contacts,
      warning: 'In life-threatening emergency, call emergency services immediately'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
