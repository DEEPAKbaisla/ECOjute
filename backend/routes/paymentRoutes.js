import express from "express";
import crypto from "crypto";
import { razorpay } from "../config/razorpay.js";

const router = express.Router();

router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });
    
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Order creation failed" });
  }
});


router.post("/verify", (req, res) => {
  console.log("🔥 VERIFY ROUTE HIT");

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  console.log("REQ BODY:", req.body);

  const sign = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign)
    .digest("hex");

  console.log("EXPECTED SIGN:", expectedSign);
  console.log("RAZORPAY SIGN:", razorpay_signature);

  if (expectedSign === razorpay_signature) {
    return res.json({ success: true });
  } else {
    return res.status(400).json({ success: false });
  }
});


export default router;
