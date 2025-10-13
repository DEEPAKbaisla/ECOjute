import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Navbar from "../Navbar";

const UploadProduct = () => {
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });

  const [preview, setPreview] = useState(null);

  // handle text change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setData({ ...data, image: file });
    setPreview(URL.createObjectURL(file));
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.name || !data.price || !data.image) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const res = await axios.post(
        "http://localhost:5000/bags/add-bag",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success("Bag uploaded successfully!");
        setData({
          name: "",
          description: "",
          price: "",
          category: "",
          stock: "",
          image: "",
        });
        setPreview(null);
      } else {
        toast.error(res.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Upload failed..");
    }
  };

  return (
    <>
    <Navbar/>
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 shadow-md rounded-xl dark:bg-gray-800 dark:text-white h-full">
      <h2 className="text-2xl font-semibold text-gray-800 mb-5 text-center">
        Upload New Bag
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium mb-1">Bag Name *</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter bag name"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={data.description}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            rows="3"
            placeholder="Enter description"></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Price *</label>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter price"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Stock</label>
            <input
              type="number"
              name="stock"
              value={data.stock}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Available quantity"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={data.category}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="E.g. Travel, Laptop, School"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Upload Image *</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border rounded-md px-3 py-2 bg-gray-50 dark:bg-gray-800"
          />

          {preview && (
            <div className="mt-3">
              <img
                src={preview}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-md shadow-sm"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
          Upload Bag
        </button>
      </form>
    </div>
    </>
  );
};

export default UploadProduct;
