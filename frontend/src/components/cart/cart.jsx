import React from "react";
import { useCart } from "../../context/CartContext";
import Navbar from "../Navbar";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <Navbar />
      <div className="p-10 min-h-screen bg-gray-50 mt-12 dark:bg-gray-800 dark:text-white">
        <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty..</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center bg-white shadow-md p-4 mb-3 rounded-lg">
                <div className="flex items-center gap-4">
                  <img
                    src={`https://ec-ojute.vercel.app/uploads/${item.image}`}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-gray-500">₹{item.price}</p>
                    <p className="text-sm text-gray-400">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600">
                  Remove
                </button>
              </div>
            ))}
            <div className="text-right mt-5">
              <p className="text-xl font-bold">Total: ₹{total}</p>
              <button
                onClick={clearCart}
                className="mt-3 bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-gray-900">
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
