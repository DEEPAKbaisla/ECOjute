import { razorpay } from "../config/razorpay.js";
import Order from "../models/orderModel.js";


export const createOrder = async (req, res) => {
  try {
    const { cart, address, amount } = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // 1️⃣ Create Razorpay Order
    const razorpayOrder = await razorpay.orders.create({
      amount: amount * 100, // Razorpay uses paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    // 2️⃣ Prepare items for DB
    const orderItems = cart.map((item) => ({
      product: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.images?.[0],
    }));

    // 3️⃣ Save Order in DB
    const newOrder = await Order.create({
      user: req.user._id, // from auth middleware
      items: orderItems,
      address,
      amount,
      razorpayOrderId: razorpayOrder.id,
      paymentStatus: "pending",
    });

    res.status(201).json({
      success: true,
      orderId: newOrder._id,
      razorpayOrder,
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({
      success: false,
      message: "Order creation failed",
    });
  }
};