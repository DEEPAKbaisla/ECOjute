import { User } from "../models/user_model.js";
import bcrypt from "bcrypt";

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

    const match = await bcrypt.compare(password, user.password);
    if (!user || !match) {
      return res.status(400).json({ message: "something went wrong" });
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
    console.log('ye aara ha ' ,error.message);
    return res.status(400).json({ message: "something went wrong in login" });
  }
};

