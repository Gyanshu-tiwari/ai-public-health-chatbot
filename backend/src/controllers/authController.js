import userModel from "../models/user.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer"
import { generateToken } from "../utils/generateToken.js";
import {sendEmail} from "../utils/sendEmail.js"
import jwt from "jsonwebtoken"   // ✅ REQUIRED


/* ================= REGISTER ================= */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user);

    return res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= LOGIN ================= */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  res.status(200).json({ success: true, message: "Logout successful" });
};

/* ================= GET LOGGED-IN USER ================= */
export const getUser = async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
};


/* ================= sendOtp ================= */

export const sendRecoveryOTP = async (req, res) => {
  try {
    const { recipient_email } = req.body;

    if (!recipient_email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await userModel.findOne({ email: recipient_email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    user.resetOTP = otp;
    user.resetOTPExpiry = Date.now() + 5 * 60 * 1000; // 5 mins
    await user.save();

    await sendEmail({ recipient_email, OTP: otp });

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Send Recovery OTP Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
};



// ++++++++++++++ verify otp ++++++++++++++++++++++++


export const verifyRecoveryOTP = async (req, res) => {
  try {
    const { recipient_email, otp } = req.body;

    // ✅ 1. Validate request body
    if (!recipient_email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid request",
      });
    }

    // ✅ 2. Find user
    const user = await userModel.findOne({ email: recipient_email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ 3. Check OTP expiry
    if (!user.resetOTP || !user.resetOTPExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP not requested",
      });
    }

    if (Date.now() > user.resetOTPExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    // ✅ 4. Compare OTP (STRING comparison)
    if (user.resetOTP !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // ✅ 5. OTP verified → clear it
    user.resetOTP = undefined;
    user.resetOTPExpiry = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "OTP verified",
    });

  } catch (error) {
    console.error("Verify OTP Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= RESET PASSWORD ================= */


export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Missing data",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    user.resetOTP = undefined;
    user.resetOTPExpiry = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};