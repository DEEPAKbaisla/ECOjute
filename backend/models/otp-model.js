// import mongoose from "mongoose";

// const otpSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       lowercase: true,
//       trim: true,
//     },

//     otp: {
//       type: String,
//       required: true,
//     },

//     purpose: {
//       type: String,
//       enum: ["verify", "reset-password"],
//       required: true,
//     },

//     expiresAt: {
//       type: Date,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // Automatically delete expired OTP documents
// otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// const OTP = mongoose.model("OTP", otpSchema);

// export default OTP;
import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    otp: {
      type: String,
      required: true,
    },
    attempts: {
      type: Number,
      default: 0,
    },

    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Automatically delete expired OTP documents
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;
