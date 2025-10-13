import express from "express";
import { addBag, getAllBags } from "../controller/bag-controller.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.get("/", getAllBags);
router.post("/add-bag", upload.single("image"), addBag);

export default router;
