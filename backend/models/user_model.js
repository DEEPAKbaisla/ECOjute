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
    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationOTPExpires: {
      type: Date,
      default: null,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },
    googleId: {
      type: String,
      default: null,
    },
    profilePic: {
      type: String,
      default: null,
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
    passwordResetToken: {
      type: String,
      default: null,
    },

    passwordResetExpires: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("user", userSchema);
