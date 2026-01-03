import recordsService from '../services/recordsService.js';

/**
 * Health Records Controller
 * Manages secure medical record storage and sharing
 * SAFETY: Strict access control and audit trails
 */

export const uploadRecord = (req, res) => {
  try {
    const { userId, recordType, title, date, filePath, description } = req.body;

    // Validate required fields
    if (!userId || !recordType || !title || !date) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['userId', 'recordType', 'title', 'date'],
        recordTypes: ['prescription', 'lab-report', 'imaging', 'vaccination', 'medical-history', 'allergy-information', 'surgical-records', 'discharge-summary'],
        example: {
          userId: 'user-123',
          recordType: 'prescription',
          title: 'Diabetes Medication Prescription',
          date: '2024-01-10',
          filePath: 'base64-encoded-file',
          description: 'Prescription for daily medication'
        }
      });
    }

    const record = recordsService.uploadRecord(userId, recordType, title, date, filePath, description);

    res.json({
      success: true,
      message: 'Record uploaded and encrypted successfully',
      ...record
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const listRecords = (req, res) => {
  try {
    const { userId, recordType } = req.body;

    if (!userId) {
      return res.status(400).json({
        error: 'userId is required'
      });
    }

    const records = recordsService.listRecords(userId, recordType);

    res.json({
      success: true,
      ...records
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRecord = (req, res) => {
  try {
    const { recordId } = req.params;
    const { userId } = req.body;

    if (!recordId || !userId) {
      return res.status(400).json({
        error: 'recordId and userId are required'
      });
    }

    const record = recordsService.getRecord(recordId, userId);

    res.json({
      success: true,
      record
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const shareRecord = (req, res) => {
  try {
    const { recordId, userId, doctorId, accessLevel } = req.body;

    // Validate required fields
    if (!recordId || !userId || !doctorId) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['recordId', 'userId', 'doctorId'],
        optional: ['accessLevel (view-only, edit)'],
        example: {
          recordId: 'rec-001',
          userId: 'user-123',
          doctorId: 'doc-001',
          accessLevel: 'view-only'
        }
      });
    }

    const result = recordsService.shareRecord(recordId, userId, doctorId, accessLevel || 'view-only');

    res.json({
      success: true,
      message: 'Record shared successfully',
      ...result
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const revokeAccess = (req, res) => {
  try {
    const { recordId, userId, doctorId } = req.body;

    if (!recordId || !userId || !doctorId) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['recordId', 'userId', 'doctorId']
      });
    }

    const result = recordsService.revokeAccess(recordId, userId, doctorId);

    res.json({
      success: true,
      message: 'Access revoked successfully',
      ...result
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteRecord = (req, res) => {
  try {
    const { recordId, userId } = req.body;

    if (!recordId || !userId) {
      return res.status(400).json({
        error: 'recordId and userId are required'
      });
    }

    const result = recordsService.deleteRecord(recordId, userId);

    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAccessLog = (req, res) => {
  try {
    const { recordId, userId } = req.body;

    if (!recordId || !userId) {
      return res.status(400).json({
        error: 'recordId and userId are required'
      });
    }

    const log = recordsService.getAccessLog(recordId, userId);

    res.json({
      success: true,
      ...log
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
