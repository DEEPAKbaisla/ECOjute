import React, { useEffect, useState } from "react";

import Navbar from "../Navbar";
import toast from "react-hot-toast";
import api from "../../api/axios";

const BagList = () => {
  const [bags, setBags] = useState([]);

  useEffect(() => {
    const fetchBags = async () => {
      try {
        const response = await api.get("/api/bags");
        if (response.data.success) {
          setBags(response.data.data);
        }
      } catch (error) {
        console.log("Error fetching bags:", error);
      }
    };
    fetchBags();
  }, []);

  const addToCart = (bag) => {
    try {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Check if bag already exists in cart
      const existing = cart.find((item) => item._id === bag._id);

      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        cart.push({ ...bag, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      toast.success(`${bag.name} added to cart!`);
    } catch (err) {
      console.log("Error adding to cart:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 dark:bg-gray-800 dark:text-white mt-10">
        <h1 className="text-4xl font-bold mb-4 px-10">Our Products</h1>
        <p className="text-lg text-muted-foreground px-10 mb-8">
          Browse our collection of sustainable jute products
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-10 dark:bg-gray-800  ">
          {bags.map((bag) => (
            <div
              key={bag._id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
              <img
                src={bag.image}
                alt={bag.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-black">{bag.name}</h2>
                <p className="text-gray-500 text-sm">{bag.category}</p>
                <p className="text-gray-800 font-bold mt-2">₹{bag.price}</p>

                <button
                  onClick={() => {
                    addToCart(bag);
                  }}
                  className="bg-green-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-600 transition-all ">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BagList;
