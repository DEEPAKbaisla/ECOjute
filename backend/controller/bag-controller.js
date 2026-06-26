import { bag } from "../models/bag-model.js";
import { uploadCloud } from "../utils/Cloud.js";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

export const addBag = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    if (!name || !price || !req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Name, price and at least one image required!",
      });
    }

    // Upload all images to Cloudinary
    const uploadedImages = [];

    for (let file of req.files) {
      const result = await uploadCloud(file);

      uploadedImages.push(result.secure_url);
    }

    const newBag = await bag.create({
      name,
      description,
      price,
      category,
      stock,
      images: uploadedImages, // 👈 array save
    });

    res.json({
      success: true,
      message: "Bag uploaded successfully!",
      bag: newBag,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Upload failed!",
      error: error.message,
    });
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

export const updateBag = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, stock } = req.body;

    const bagData = await bag.findById(id);
    if (!bagData) {
      return res.status(404).json({
        success: false,
        message: "Bag not found",
      });
    }

    // Handle image updates (merge remaining existing images and new uploads)
    let imagesToKeep = [];
    if (req.body.existingImages) {
      try {
        imagesToKeep = JSON.parse(req.body.existingImages);
        if (!Array.isArray(imagesToKeep)) {
          imagesToKeep = [imagesToKeep];
        }
      } catch (e) {
        imagesToKeep = Array.isArray(req.body.existingImages)
          ? req.body.existingImages
          : [req.body.existingImages];
      }
    } else {
      imagesToKeep = bagData.images || [];
    }

    const newUploadedImages = [];
    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        const result = await uploadCloud(file);
        newUploadedImages.push(result.secure_url);
      }
    }

    // Only update if existingImages was explicitly sent or new images were uploaded
    if (
      req.body.existingImages !== undefined ||
      (req.files && req.files.length > 0)
    ) {
      bagData.images = [...imagesToKeep, ...newUploadedImages];
    }

    // Update fields
    bagData.name = name || bagData.name;
    bagData.description = description || bagData.description;
    bagData.price = price || bagData.price;
    bagData.category = category || bagData.category;
    bagData.stock =
      stock !== undefined ? stock === "true" || stock === true : bagData.stock;

    await bagData.save();

    res.json({
      success: true,
      message: "Bag updated successfully",
      bag: bagData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Update failed",
      error,
    });
  }
};

export const updateBagStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;

    const updatedBag = await bag.findByIdAndUpdate(
      id,
      { stock },
      { new: true },
    );

    if (!updatedBag) {
      return res.status(404).json({
        success: false,
        message: "Bag not found",
      });
    }

    res.json({
      success: true,
      message: "Bag status updated",
      bag: updatedBag,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Status update failed",
      error: error.message,
    });
  }
};

export const deleteBag = async (req, res) => {
  try {
    const { id } = req.params;

    // Find bag first
    const bagData = await bag.findById(id);

    if (!bagData) {
      return res.status(404).json({
        success: false,
        message: "Bag not found",
      });
    }

    // Delete all Cloudinary images
    for (const imageUrl of bagData.images) {
      try {
        // Remove query params if any
        const cleanUrl = imageUrl.split("?")[0];

        // Remove extension (.jpg, .png, .webp...)
        const withoutExtension = cleanUrl.substring(
          0,
          cleanUrl.lastIndexOf("."),
        );

        // Get everything after "/upload/"
        const path = withoutExtension.split("/upload/")[1];

        // Remove version (v123456789/)
        const publicId = path.replace(/^v\d+\//, "");

        console.log("Deleting:", publicId);

        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.error("Failed to delete image:", imageUrl, err);
      }
    }

    // Delete bag document
    await bag.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Bag and images deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Delete failed",
      error: error.message,
    });
  }
};

export const getBagById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid bag ID",
      });
    }

    const singleBag = await bag.findById(id);

    if (!singleBag) {
      return res.status(404).json({
        success: false,
        message: "Bag not found",
      });
    }

    res.json({
      success: true,
      bag: singleBag,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching bag",
      error: error.message,
    });
  }
};
