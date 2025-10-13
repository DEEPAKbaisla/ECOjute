// import express from "express";
// import multer from "multer";
// import  {bag }from "../models/bag-model.js";

// const router = express.Router();
// export const upload = multer({ dest: "uploads/" });

// router.post("/admin/add-bag", upload.single("image"), async (req, res) => {
//   try {
//     const { name, description, price, category, stock } = req.body;
//     const image = req.file.filename;

//     // Save to DB (example)
//     const bag = await bag.create({
//       name,
//       description,
//       price,
//       category,
//       stock,
//       image,
//     });

//     res.json({ success: true, message: "Bag added!", bag });
//   } catch (err) {
//     console.log(err);
//     res.json({ success: false, message: "Upload failed!" });
//   }
// });

// export default router;

import express from "express";
import multer from "multer";
import path from "path";
import { bag } from "../models/bag-model.js";

const router = express.Router();

// ✅ Define storage engine for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder where images will be stored
  },
  filename: function (req, file, cb) {
    // Generate custom filename with timestamp and original extension
    const ext = path.extname(file.originalname); // .jpeg / .png / .jpg
    cb(null, Date.now() + ext);
  },
});

// ✅ File filter (allow only image types)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG and PNG images are allowed"), false);
  }
};

export const upload = multer({ storage, fileFilter });

// ✅ Route to add bag
router.post("/admin/add-bag", upload.single("image"), async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    // Image path (where file is saved locally)
    const imagePath = `/uploads/${req.file.filename}`;

    // Save in database
    const newBag = await bag.create({
      name,
      description,
      price,
      category,
      stock,
      image: imagePath,
    });

    res.status(200).json({
      success: true,
      message: "Bag added successfully!",
      bag: newBag,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while uploading!",
    });
  }
});

export default router;
