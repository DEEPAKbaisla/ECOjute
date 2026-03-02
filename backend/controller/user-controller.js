import { User } from "../models/user_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({ message: "user already exicts" });
    }
    const hashPss = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullname,
      email,
      password: hashPss,
    });

    await user.save();
    res.status(200).json({
      message: "user created successfully",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "invalid credentials" });
    } else {
      res.status(200).json({
        message: "login successfully",
        user: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
          role: user.role,
        },
      });
    }
  } catch (error) {
    return res.status(404).json({ message: "something went wrong" });
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