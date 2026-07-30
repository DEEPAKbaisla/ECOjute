import mongoose from "mongoose";

const bagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  mrp: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    enum: ["bags", "accessories", "home"],
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  material: {
    type: String,
    default: "Organic Jute",
  },
  weight: {
    type: String,
    default: "",
  },
  dimensions: {
    width: { type: String, default: "" },
    height: { type: String, default: "" },
    depth: { type: String, default: "" },
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  soldCount: {
    type: Number,
    default: 0,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const bag = mongoose.model("bag", bagSchema);
