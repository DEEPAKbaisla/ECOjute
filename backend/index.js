import express from "express";
import dotenv from "dotenv";
import bagRoute from "./routes/bag-route.js";
import userRoute from "./routes/user-route.js";
import cartRoute from "./routes/cart-route.js";
import mongoose from "mongoose";
import cors from "cors";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const URI = process.env.MONGODB_URI;

// app.use(
//   cors({
//     origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

const allowedOrigins =
  process.env.NODE_ENV === "development"
    ? ["http://localhost:5173"]
    : ["https://ec-ojute-9nt6.vercel.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow server-to-server & Postman
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(
          new Error(`CORS blocked for origin: ${origin}`)
        );
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

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

app.get("/", (req, res) => {
  res.send("Backend is running very well!");
});
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
