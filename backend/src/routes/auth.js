import express from 'express';
import { register, login, logout ,getUser } from '../controllers/authController.js';
import { isLoggedIn } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the Chat routes');
});

// POST /api/auth/register - User registration
router.post('/register', register);

// POST /api/auth/login - User login
router.post('/login', login);
router.get("/logout",logout);

router.get("/me", isLoggedIn, getUser);

export default router;
