import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import Navbar from "../Navbar";
import api from "../../api/axios";
import toast from "react-hot-toast";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } =
    useCart();

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    addressLine: "",
    city: "",
    pincode: "",
  });

  const total = getCartTotal();

  const handlePayment = async () => {
    if (!address.name || !address.phone || !address.addressLine) {
      toast.error("Please fill address details");
      return;
    }

    try {
      // 1️⃣ Create Order in backend (with cart + address)
      const { data: orderData } = await api.post(
        "/api/orders/create",
        {
          cart,
          address,
          amount: total,
        }
      );

      const razorpayOrder = orderData.razorpayOrder;

      const options = {
        key: "rzp_live_RzU78pJrxasGQV",
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Eco Jute",
        order_id: razorpayOrder.id,

        handler: async function (response) {
          const verifyRes = await api.post(
            "/api/orders/verify-payment",
            {
              ...response,
              orderId: orderData.orderId,
            }
          );

          if (verifyRes.data.success) {
            toast.success("Payment Successful 🎉");
            clearCart();
          } else {
            toast.error("Payment verification failed");
          }
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
      <Navbar />

      <div className="max-w-6xl mx-auto p-6 mt-16 grid md:grid-cols-3 gap-6">
        {/* LEFT - CART ITEMS */}
        <div className="md:col-span-2 space-y-4">
          <h1 className="text-2xl font-bold">Your Cart</h1>

          {cart.length === 0 ? (
            <div className="flex justify-center py-20">
    <Card className="w-full max-w-md text-center">
      <CardContent className="flex flex-col items-center gap-4 p-8">

        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <ShoppingCart className="h-8 w-8 text-muted-foreground" />
        </div>

        <h2 className="text-xl font-semibold">Your cart is empty</h2>

        <p className="text-sm text-muted-foreground">
          Looks like you haven’t added any bags yet. Start shopping to fill it up.
        </p>

        <Button asChild>
          <Link to="/products">Continue Shopping</Link>
        </Button>

      </CardContent>
    </Card>
  </div>

          ) : (
            cart.map((item) => (
              <Card key={item._id}>
                <CardContent className="flex justify-between items-center p-4">
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.images?.[0]}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />

                    <div>
                      <h2 className="font-semibold">{item.name}</h2>
                      <p className="text-muted-foreground">
                        ₹{item.price}
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            updateQuantity(item._id, -1)
                          }
                        >
                          -
                        </Button>

                        <span>{item.quantity}</span>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            updateQuantity(item._id, 1)
                          }
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeFromCart(item._id)}
                    className="px-3"
                  >
                    Remove
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* RIGHT - ADDRESS + PAYMENT */}
        <Card>
          <CardHeader>
            <CardTitle>Delivery Address</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <Input
              placeholder="Full Name"
              onChange={(e) =>
                setAddress({ ...address, name: e.target.value })
              }
            />
            <Input
              placeholder="Phone Number"
              onChange={(e) =>
                setAddress({ ...address, phone: e.target.value })
              }
            />
            <Textarea
              placeholder="Full Address"
              onChange={(e) =>
                setAddress({
                  ...address,
                  addressLine: e.target.value,
                })
              }
            />
            <Input
              placeholder="City"
              onChange={(e) =>
                setAddress({ ...address, city: e.target.value })
              }
            />
            <Input
              placeholder="Pincode"
              onChange={(e) =>
                setAddress({
                  ...address,
                  pincode: e.target.value,
                })
              }
            />

            <Separator />

            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </CardContent>

          <CardFooter>
            <Button className="w-full" onClick={handlePayment}>
              Proceed to Payment
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Cart;
