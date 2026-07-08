import express from "express";
const router = express.Router();
import {
  forgotPassword,
  getCurrentUser,
  googleLogin,
  login,
  resendOtp,
  resetPassword,
  sendOtp,
  signup,
  verifyOtp,
} from "../controller/user-controller.js";
import { protect } from "../middleware/protect.js";

router.post("/send-otp", sendOtp);
router.post("/signup", signup);
router.post("/login", login);

router.post("/google-login", googleLogin);
router.get("/me", protect, getCurrentUser);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
// router.post("/reset-password", resetPassword);
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

export default router;
