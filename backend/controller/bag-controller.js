// import {bag }from "../models/bag-model.js";
// import {uploadCloud} from '../utils/Cloud.js'

// export const addBag = async (req, res) => {
//   try {
//     const { name, description, price, category, stock } = req.body;
//     const image = req.file ? req.file.filename : null;

//     if (!name || !price || !image) {
//       return res.json({ success: false, message: "Name, price, and image required!" });
//     }

//     const newBag = new bag({
//       name,
//       description,
//       price,
//       category,
//       stock,
//       image,
//     });

//     await newBag.save();

//     res.json({ success: true, message: "Bag uploaded successfully!", bag: newBag });
//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, message: "Upload failed!", error });
//   }
// };


import { bag } from "../models/bag-model.js";
import { uploadCloud} from "../utils/Cloud.js";

export const addBag = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const imageFile = req.file; // multer adds this

    if (!name || !price || !imageFile) {
      return res.json({ success: false, message: "Name, price, and image required!" });
    }

    // Upload image buffer to Cloudinary
    const uploadResult = await uploadCloud(imageFile);

    const newBag = new bag({
      name,
      description,
      price,
      category,
      stock,
      image: uploadResult.secure_url, // store Cloudinary URL
    });

    await newBag.save();

    res.json({
      success: true,
      message: "Bag uploaded successfully!",
      bag: newBag,
    });
  } catch (error) {
    console.error("Error uploading bag:", error);
    res.status(500).json({ success: false, message: "Upload failed!", error });
  }
};


export const getAllBags = async (req, res) => {
  try {
    const bags = await bag.find().sort({ createdAt: -1 });
    res.json({ success: true, data: bags });
  } catch (error) {
    res.json({ success: false, message: "Error fetching bags", error });
  }
};