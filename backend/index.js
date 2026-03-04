import express from "express";
import dotenv from "dotenv";
import bagRoute from "./routes/bag-route.js";
import userRoute from "./routes/user-route.js";
import cartRoute from "./routes/cart-route.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const URI = process.env.MONGODB_URI;

const allowedOrigins = [
  "http://localhost:5173",
  "https://ec-ojute-9nt6.vercel.app"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(cookieParser());

app.use(express.json());
app.use("/uploads", express.static("uploads"));

// connect to mongoDB
try {
  mongoose.connect(URI);
  console.log("connected to mongodb");
} catch (error) {
  console.log(error.message);
}
//routes
app.use("/api/bags", bagRoute);
app.use("/api/user", userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoutes);

app.use("/api/payment", paymentRoutes);
app.get("/", (req, res) => {
  res.send("Backend is running very well!");
});
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
