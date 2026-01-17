import express from "express";
import {
  register,
  login,
  logout,
  getUser,
  sendRecoveryOTP,
  verifyRecoveryOTP,
  resetPassword,
} from "../controllers/authController.js";
import { isLoggedIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", isLoggedIn, getUser);

router.post("/send-otp", sendRecoveryOTP);
router.post("/verify-otp", verifyRecoveryOTP);
router.post("/reset-password", resetPassword);

export default router;
