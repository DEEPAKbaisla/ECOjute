// import React from "react";
// import { useCart } from "../../context/CartContext";
// import Navbar from "../Navbar";

// const Cart = () => {
//   const { cart, removeFromCart, clearCart } = useCart();

//   const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   return (
//     <>
//       <Navbar />
//       <div className="p-10 min-h-screen bg-gray-50 mt-12 dark:bg-gray-800 dark:text-white">
//         <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>

//         {cart.length === 0 ? (
//           <p className="text-gray-600">Your cart is empty..</p>
//         ) : (
//           <>
//             {cart.map(
//               (item) => (
//                 console.log(item.image),
//                 (
//                   <div
//                     key={item._id}
//                     className="flex justify-between items-center bg-white shadow-md p-4 mb-3 rounded-lg">
//                     <div className="flex items-center gap-4">
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-20 h-20 object-cover rounded-lg"
//                       />

//                       <div>
//                         <h2 className="font-semibold">{item.name}</h2>
//                         <p className="text-gray-500">₹{item.price}</p>
//                         <p className="text-sm text-gray-400">
//                           Qty: {item.quantity}
//                         </p>
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => removeFromCart(item._id)}
//                       className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600">
//                       Remove
//                     </button>
//                   </div>
//                 )
//               )
//             )}
//             <div className="text-right mt-5">
//               <p className="text-xl font-bold">Total: ₹{total}</p>
//               <button

//                 className="mt-3 bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-gray-900">
//                 Make payment
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default Cart;

import React from "react";
import { useCart } from "../../context/CartContext";
import Navbar from "../Navbar";
import api from "../../api/axios";
import toast from "react-hot-toast";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePayment = async () => {
    try {
      const { data: order } = await api.post("/api/payment/create-order", {
        amount: total,
      });

      // console.log("ORDER FROM BACKEND:", order);

      if (!order || !order.id) {
        alert("Order ID missing");
        return;
      }

      const options = {
        key: "rzp_live_RzU78pJrxasGQV",
        amount: order.amount,
        currency: order.currency,
        name: "Eco jute",
        description: "UPI Payment",
        order_id: order.id,

        handler: async function (response) {
          console.log("PAYMENT RESPONSE:", response);

          const verifyRes = await api.post("/api/payment/verify", response);

          console.log("VERIFY RESPONSE:", verifyRes.data);

          if (verifyRes.data.success) {
            alert("✅ Payment Successful");
            clearCart();
          } else {
            alert("❌ Payment Verification Failed");
          }
        },

        theme: {
          color: "#16a34a",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      toast.error("Payment failed");
    }
  };

  return (
    <>
      {/* <Navbar />
      <div className="p-10 min-h-screen bg-gray-50 mt-12 dark:bg-gray-800 dark:text-white">
        <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>

        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between bg-white p-4 mb-3 rounded-lg shadow">
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2>{item.name}</h2>
                    <p>₹{item.price}</p>
                    <p>Qty: {item.quantity}</p>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded">
                  Remove
                </button>
              </div>
            ))}

            <div className="text-right mt-6">
              <h2 className="text-xl font-bold">Total: ₹{total}</h2>

              <button
                onClick={handlePayment}
                className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
                Pay with UPI
              </button>
            </div>
          </>
        )}
      </div> */}
      <Navbar />
      <div className="p-10 min-h-screen bg-gray-50 mt-12 dark:bg-gray-800 dark:text-white">
        <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty..</p>
        ) : (
          <>
            {cart.map(
              (item) => (
                (
                  <div
                    key={item._id}
                    className="flex justify-between items-center bg-white shadow-md p-4 mb-3 rounded-lg">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
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
                )
              )
            )}
            <div className="text-right mt-5">
              <p className="text-xl font-bold">Total: ₹{total}</p>
              <button
                onClick={handlePayment}
                className="mt-3 bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-gray-900">
                Make payment
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
