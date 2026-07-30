import { razorpay } from "../config/razorpay.js";
import Order from "../models/orderModel.js";
import { bag } from "../models/bag-model.js";

export const createOrder = async (req, res) => {
  try {
    const { cart, address, amount } = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // Check stock availability
    for (const item of cart) {
      const product = await bag.findById(item._id);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product "${item.name}" not found`,
        });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for "${product.name}". Available: ${product.stock}`,
        });
      }
    }

    const razorpayOrder = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    const orderItems = cart.map((item) => ({
      product: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.images?.[0],
    }));

    const newOrder = await Order.create({
      user: req.user._id,
      items: orderItems,
      address,
      amount,
      razorpayOrderId: razorpayOrder.id,
      paymentStatus: "pending",
    });

    // Decrement stock and increment soldCount
    for (const item of cart) {
      await bag.findByIdAndUpdate(item._id, {
        $inc: { stock: -item.quantity, soldCount: item.quantity },
      });
    }

    res.status(201).json({
      success: true,
      orderId: newOrder._id,
      razorpayOrder,
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Order creation failed",
    });
  }
};
