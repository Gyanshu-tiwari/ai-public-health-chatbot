import express from 'express';
import { isLoggedIn } from '../middleware/isLoggedIn.js';
import { textMessageController } from '../controllers/messageController.js';

const router = express.Router()

router.post('/text',isLoggedIn, textMessageController)

export default router;