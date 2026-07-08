import { User } from "../models/user_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import otpGenerator from "otp-generator";
import Otp from "../models/otp-model.js";
import { otpTemplate } from "../utils/template/otpTemplate.js";
import { welcomeTemplate } from "../utils/template/welcomeTemplate.js";
import { sendEmail } from "../config/mail.js";
import generateToken from "../utils/generateToken.js";
import crypto from "crypto";
import { resetPasswordTemplate } from "../utils/template/resetPasswordTemplate.js";

export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // 1️⃣ Basic validation
    if (!fullname || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2️⃣ Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 4️⃣ Create user
    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    // 5️⃣ Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    // 6️⃣ Set Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    // Validate input
    if (!fullname || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must be strong.",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered.",
      });
    }

    // Remove previous OTP for this email
    await Otp.deleteMany({
      email: email.toLowerCase(),
    });

    // Generate 6-digit OTP
    const otp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Hash OTP
    const hashedOtp = await bcrypt.hash(otp, 10);

    // Save temporary registration
    await Otp.create({
      fullname,
      email: email.toLowerCase(),
      password: hashedPassword,
      otp: hashedOtp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    // Send Email
    await sendEmail({
      to: email,
      subject: "Verify Your Email",
      html: otpTemplate(fullname, otp),
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully.",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required.",
      });
    }

    const otpData = await Otp.findOne({
      email: email.toLowerCase(),
    });

    if (!otpData) {
      return res.status(400).json({
        success: false,
        message: "OTP not found.",
      });
    }

    // Expired
    if (otpData.expiresAt < new Date()) {
      await Otp.deleteOne({ _id: otpData._id });

      return res.status(400).json({
        success: false,
        message: "OTP expired.",
      });
    }

    // Max attempts
    if (otpData.attempts >= 5) {
      await Otp.deleteOne({ _id: otpData._id });

      return res.status(400).json({
        success: false,
        message: "Too many attempts. Please request a new OTP.",
      });
    }

    const isMatch = await bcrypt.compare(otp, otpData.otp);

    if (!isMatch) {
      otpData.attempts += 1;

      await otpData.save();

      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    const user = await User.create({
      fullname: otpData.fullname,
      email: otpData.email,
      password: otpData.password,
      isVerified: true,
    });

    await Otp.deleteOne({
      _id: otpData._id,
    });

    const token = generateToken(user._id);

    await sendEmail({
      to: user.email,
      subject: "Welcome to Eco Jute 🎉",
      html: welcomeTemplate(user.fullname),
    });

    user.password = undefined;

    return res.status(201).json({
      success: true,
      message: "Email verified successfully.",
      token,
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const otpData = await Otp.findOne({
      email: email.toLowerCase(),
    });

    if (!otpData) {
      return res.status(404).json({
        success: false,
        message: "Registration session not found. Please register again.",
      });
    }

    // Generate new OTP
    const otp = otpGenerator.generate(6, {
      digits: true,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // Hash new OTP
    const hashedOtp = await bcrypt.hash(otp, 10);

    // Update OTP document
    otpData.otp = hashedOtp;
    otpData.expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    otpData.attempts = 0;

    await otpData.save();

    // Send email
    await sendEmail({
      to: otpData.email,
      subject: "Your New Verification OTP",
      html: otpTemplate(otpData.fullname, otp),
    });

    return res.status(200).json({
      success: true,
      message: "OTP resent successfully.",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: "Reset Your EcoJute Password",
      html: resetPasswordTemplate(user.fullname, resetUrl),
    });

    return res.json({
      success: true,
      message: "Reset link sent successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset link.",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);

    user.passwordResetToken = null;
    user.passwordResetExpires = null;

    await user.save();

    return res.json({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 2️⃣ Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user not found",
      });
    }

    // 3️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 4️⃣ Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    // 5️⃣ Set Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Google token missing" });
    }

    // Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { sub, email, name, picture } = payload;

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new Google user
      user = await User.create({
        fullname: name,
        email,
        googleId: sub,
        profilePic: picture,
      });
    } else {
      // If user exists but googleId not linked
      if (!user.googleId) {
        user.googleId = sub;
        user.profilePic = picture;
        await user.save();
      }
    }

    // Generate JWT
    const authToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    // console.log( "aaay", authToken, user);
    return res.status(200).json({
      success: true,
      token: authToken,
      user,
    });
  } catch (error) {
    console.error("Google Login Error:", error);
    return res.status(401).json({
      success: false,
      message: "Google authentication failed",
    });
  }
};

export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};
