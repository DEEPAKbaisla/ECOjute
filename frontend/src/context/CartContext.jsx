
import React, { createContext, useState, useEffect, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Sync localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ Add to cart (safe update)
  const addToCart = (item) => {
    setCart((prevCart) => {
      const exists = prevCart.find((x) => x._id === item._id);

      if (exists) {
        return prevCart.map((x) =>
          x._id === item._id
            ? { ...x, quantity: x.quantity + 1 }
            : x
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  // ✅ Remove item completely
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((x) => x._id !== id));
  };

  // ✅ Increase / Decrease quantity
  const updateQuantity = (id, amount) => {
    setCart((prevCart) =>
      prevCart.map((x) =>
        x._id === id
          ? { ...x, quantity: Math.max(1, x.quantity + amount) }
          : x
      )
    );
  };

  // ✅ Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // ✅ Total items count (for navbar badge)
  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // ✅ Total price
  const getCartTotal = () => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartCount,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);