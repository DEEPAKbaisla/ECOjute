
import jwt from "jsonwebtoken";
import { User } from "../models/user_model.js";

const authMiddleware = async (req, res, next) => {
  try {
    let token;

    // Prefer Authorization header if present
    const authHeader = req.headers.authorization;
    console.log("[AuthMiddleware] authHeader:", authHeader);

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (req.cookies && req.cookies.token) {
      // Fallback to HTTP-only cookie set on login/signup
      token = req.cookies.token;
      console.log("[AuthMiddleware] Found token in cookies");
    }

    if (!token) {
      console.log("[AuthMiddleware] No token found in headers or cookies");
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("[AuthMiddleware] Decoded JWT:", decoded);

    const user = await User.findById(decoded.id);

    if (!user) {
      console.log("[AuthMiddleware] User not found in database for ID:", decoded.id);
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    console.log("[AuthMiddleware] Authenticated user:", user.email, "Role:", user.role);

    next();
  } catch (error) {
    console.error("[AuthMiddleware] Authentication failed:", error.message);
    return res.status(401).json({ message: "Invalid token", error: error.message });
  }
};

export default authMiddleware;