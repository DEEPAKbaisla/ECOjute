import express from "express";
import { addBag, deleteBag, getAllBags, getBagById, updateBag, updateBagStatus } from "../controller/bag-controller.js";

import {upload} from '../config/multer.js'
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
const router = express.Router();

router.get("/", getAllBags);
router.get("/:id", getBagById);

router.post("/",  upload.array("images", 5),  authMiddleware, adminMiddleware, addBag);
router.put("/:id", authMiddleware, adminMiddleware, updateBag);
router.patch("/:id/status", authMiddleware, adminMiddleware, updateBagStatus);
router.delete("/:id", authMiddleware, adminMiddleware, deleteBag);

export default router;
