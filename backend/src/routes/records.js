import express from 'express';
import {
  uploadRecord,
  listRecords,
  getRecord,
  shareRecord,
  revokeAccess,
  deleteRecord,
  getAccessLog
} from '../controllers/recordsController.js';

const router = express.Router();

// POST /api/records/upload - Upload record
router.post('/upload', uploadRecord);

// POST /api/records/list - List records
router.post('/list', listRecords);

// POST /api/records/:recordId - Get record
router.post('/:recordId', getRecord);

// POST /api/records/share - Share record
router.post('/share', shareRecord);

// POST /api/records/revoke - Revoke access
router.post('/revoke', revokeAccess);

// DELETE /api/records/delete - Delete record
router.delete('/delete', deleteRecord);

// POST /api/records/access-log - Get access log
router.post('/access-log', getAccessLog);

export default router;
