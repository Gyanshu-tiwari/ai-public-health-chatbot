import express from 'express';
import { createChat, getChats, deleteChat } from '../controllers/chatController.js';
import { isLoggedIn } from '../middleware/isLoggedIn.js';

const router = express.Router();


// POST /api/chat - Handle chat messages
router.get('/create', isLoggedIn, createChat);
router.get('/get', isLoggedIn, getChats);
router.post('/delete', isLoggedIn, deleteChat);

export default router;
