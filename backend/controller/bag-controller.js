import { bag } from "../models/bag-model.js";
import { uploadCloud } from "../utils/Cloud.js";


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

      uploadedImages.push(result.secure_url);}

    const newBag = await bag.create({
      name,
      description,
      price,
      category,
      stock,
      images: uploadedImages,  // 👈 array save
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

    // If new image uploaded
    if (req.file) {
      const uploadResult = await uploadCloud(req.file);
      bagData.image = uploadResult.secure_url;
    }

    // Update fields
    bagData.name = name || bagData.name;
    bagData.description = description || bagData.description;
    bagData.price = price || bagData.price;
    bagData.category = category || bagData.category;
    bagData.stock = stock !== undefined ? stock : bagData.stock;

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
      error:error.message ,
    });
  }
};

export const deleteBag = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBag = await bag.findByIdAndDelete(id);

    if (!deletedBag) {
      return res.status(404).json({
        success: false,
        message: "Bag not found",
      });
    }

    res.json({
      success: true,
      message: "Bag deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Delete failed",
      error,
    });
  }
};
