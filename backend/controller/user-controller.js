import { User } from "../models/user_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

// export const signup = async (req, res) => {
//   try {
//     const { fullname, email, password } = req.body;

//     const exists = await User.findOne({ email });

//     if (exists) {
//       return res.status(400).json({ message: "user already exicts" });
//     }
//     const hashPss = await bcrypt.hash(password, 10);
//     const user = await User.create({
//       fullname,
//       email,
//       password: hashPss,
//     });

//     await user.save();
//     res.status(200).json({
//       message: "user created successfully",
//       user: {
//         id: user._id,
//         fullname: user.fullname,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// };


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
      { expiresIn: "7d" }
    );

    // 6️⃣ Set Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production" ? "none" : "lax",
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

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "invalid credentials" });
//     }

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//       return res.status(400).json({ message: "invalid credentials" });
//     } else {
//       res.status(200).json({
//         message: "login successfully",
//         user: {
//           _id: user._id,
//           fullname: user.fullname,
//           email: user.email,
//           role: user.role,
//         },
//       });
//     }
//   } catch (error) {
//     return res.status(404).json({ message: "something went wrong" });
//   }
// };

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
        message: "Invalid credentials",
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
      { expiresIn: "7d" }
    );

    // 5️⃣ Set Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production" ? "none" : "lax",
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