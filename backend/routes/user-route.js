import express from "express";
const router = express.Router();
import { getCurrentUser, googleLogin, login, signup } from "../controller/user-controller.js";
import { protect } from "../middleware/protect.js";

router.post("/signup", signup);
router.post("/login", login);

router.post("/google-login", googleLogin);
router.get("/me", protect, getCurrentUser);

export default router;
