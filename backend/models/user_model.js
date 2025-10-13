import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bag",
      },
    ],
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
    mobile: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("user", userSchema);
