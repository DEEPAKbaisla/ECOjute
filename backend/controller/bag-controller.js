import { bag } from "../models/bag-model.js";
import { uploadCloud } from "../utils/Cloud.js";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

export const addBag = async (req, res) => {
  try {
    const { name, description, price, mrp, category, stock, material, weight, dimensions, isFeatured } = req.body;

    if (!name || !price || !req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Name, price and at least one image required!",
      });
    }

    const uploadedImages = [];
    for (let file of req.files) {
      const result = await uploadCloud(file);
      uploadedImages.push(result.secure_url);
    }

    let parsedDims = {};
    if (dimensions) {
      try {
        parsedDims = typeof dimensions === "string" ? JSON.parse(dimensions) : dimensions;
      } catch (e) {
        parsedDims = {};
      }
    }

    const newBag = await bag.create({
      name,
      description,
      price,
      mrp: mrp || price,
      category,
      stock: stock !== undefined ? Number(stock) : 0,
      material: material || "Organic Jute",
      weight: weight || "",
      dimensions: {
        width: parsedDims.width || "",
        height: parsedDims.height || "",
        depth: parsedDims.depth || "",
      },
      isFeatured: isFeatured === "true" || isFeatured === true,
      images: uploadedImages,
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

export const getFeaturedBags = async (req, res) => {
  try {
    const bags = await bag.find({ isFeatured: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: bags });
  } catch (error) {
    res.json({ success: false, message: "Error fetching featured bags", error });
  }
};

export const updateBag = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, mrp, category, stock, material, weight, dimensions, isFeatured } = req.body;

    const bagData = await bag.findById(id);
    if (!bagData) {
      return res.status(404).json({
        success: false,
        message: "Bag not found",
      });
    }

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

    if (req.body.existingImages !== undefined || (req.files && req.files.length > 0)) {
      bagData.images = [...imagesToKeep, ...newUploadedImages];
    }

    let parsedDims = bagData.dimensions;
    if (dimensions) {
      try {
        parsedDims = typeof dimensions === "string" ? JSON.parse(dimensions) : dimensions;
      } catch (e) {}
    }

    bagData.name = name || bagData.name;
    bagData.description = description !== undefined ? description : bagData.description;
    bagData.price = price || bagData.price;
    bagData.mrp = mrp !== undefined ? mrp : bagData.mrp;
    bagData.category = category || bagData.category;
    bagData.stock = stock !== undefined ? Number(stock) : bagData.stock;
    bagData.material = material || bagData.material;
    bagData.weight = weight !== undefined ? weight : bagData.weight;
    bagData.dimensions = {
      width: parsedDims.width || bagData.dimensions.width,
      height: parsedDims.height || bagData.dimensions.height,
      depth: parsedDims.depth || bagData.dimensions.depth,
    };
    bagData.isFeatured = isFeatured !== undefined ? isFeatured === "true" || isFeatured === true : bagData.isFeatured;

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
      { stock: Number(stock) },
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
      message: "Stock updated",
      bag: updatedBag,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Stock update failed",
      error: error.message,
    });
  }
};

export const deleteBag = async (req, res) => {
  try {
    const { id } = req.params;
    const bagData = await bag.findById(id);

    if (!bagData) {
      return res.status(404).json({
        success: false,
        message: "Bag not found",
      });
    }

    for (const imageUrl of bagData.images) {
      try {
        const cleanUrl = imageUrl.split("?")[0];
        const withoutExtension = cleanUrl.substring(0, cleanUrl.lastIndexOf("."));
        const path = withoutExtension.split("/upload/")[1];
        const publicId = path.replace(/^v\d+\//, "");
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.error("Failed to delete image:", imageUrl, err);
      }
    }

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
