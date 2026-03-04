import express from "express";
import { createOrder } from "../controller/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createOrder);

export default router;