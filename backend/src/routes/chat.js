import express from 'express';
import { chat } from '../controllers/chatController.js';

const router = express.Router();

// POST /api/chat - Handle chat messages
router.post('/chat', chat);

export default router;
