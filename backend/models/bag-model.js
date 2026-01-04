
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
  category: String,
  stock: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String, // store URL or filename
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const bag = mongoose.model("bag", bagSchema);
