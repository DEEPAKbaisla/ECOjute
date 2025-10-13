import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar";

const BagList = () => {

  
  const [bags, setBags] = useState([]);

  useEffect(() => {
    const fetchBags = async () => {
      try {
        const response = await axios.get("http://localhost:5000/bags");
        if (response.data.success) {
          setBags(response.data.data);
        }
      } catch (error) {
        console.log("Error fetching bags:", error);
      }
    };
    fetchBags();
  }, []);


  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 dark:bg-gray-900 dark:text-white mt-10">
        <h1 className="text-4xl font-bold mb-4 px-10">Our Products</h1>
        <p className="text-lg text-muted-foreground px-10 mb-8">
          Browse our collection of sustainable jute products
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-10 dark:bg-gray-900  ">
          {bags.map((bag) => (
            <div
              key={bag._id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
              <img
                src={`http://localhost:5000/uploads/${bag.image}`}
                alt={bag.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-black">{bag.name}</h2>
                <p className="text-gray-500 text-sm">{bag.category}</p>
                <p className="text-gray-800 font-bold mt-2">₹{bag.price}</p>
                <button className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md">
                  Add to cart
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


