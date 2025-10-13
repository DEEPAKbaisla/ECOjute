// routes/cartRoute.js
import express from "express";
import { Cart } from "../models/cart-model.js";
// import { auth } from "../middleware/multer.js";

const router = express.Router();

// ✅ Add item to cart
router.post("/add",  async (req, res) => {
  try {
    const userId = req.userId; // from auth middleware
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    // If no cart, create new one
    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity }],
      });
    } else {
      // If cart exists, check if product already there
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        // Update quantity
        cart.items[itemIndex].quantity += quantity || 1;
      } else {
        // Add new product
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    res.json({
      success: true,
      message: "Item added to cart successfully!",
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
});

export default router;
