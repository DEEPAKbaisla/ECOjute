import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import Navbar from "../Navbar";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

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
import { ShoppingCart, Loader2 } from "lucide-react";
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

  const [loading, setLoading] = useState(false);
  const total = getCartTotal();

  const handlePayment = async () => {
    if (!address.name || !address.phone || !address.addressLine) {
      toast.error("Please fill address details");
      return;
    }

    try {
      setLoading(true);
      // 1️⃣ Create Order in backend (with cart + address)
      const { data: orderData } = await api.post("/api/orders/create", {
        cart,
        address,
        amount: total,
      });

      const razorpayOrder = orderData.razorpayOrder;

      const options = {
        key: "rzp_live_RzU78pJrxasGQV",
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Eco Jute",
        order_id: razorpayOrder.id,

        handler: async function (response) {
          try {
            setLoading(true);
            const verifyRes = await api.post("/api/orders/verify-payment", {
              ...response,
              orderId: orderData.orderId,
            });

            if (verifyRes.data.success) {
              toast.success("Payment Successful 🎉");
              clearCart();
            } else {
              toast.error("Payment verification failed");
            }
          } catch (verifyErr) {
            console.error(verifyErr);
            toast.error("Payment verification failed");
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      // Razorpay modal is open, we can reset local button loading state since payment popup is active
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Payment failed");
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Your Cart | EcoJute</title>
        <meta
          name="description"
          content="Review your selected eco-friendly jute bags and proceed to checkout. Shop sustainable products with EcoJute."
        />
      </Helmet>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12 mt-10">
        <h1 className="text-3xl font-serif mb-3">Your Shopping Bag</h1>

        <p className="text-muted-foreground mb-12">
          Review your eco-friendly selection and delivery details.
        </p>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-12">
          {/* LEFT SIDE */}
          <div >
            {cart.length === 0 ? (
              <Card className="text-center p-10 ">
                <CardContent>
                  <ShoppingCart className="mx-auto h-12 w-12 mb-4" />
                  <h2 className="text-xl font-semibold">Your cart is empty</h2>
                  <Button asChild className="mt-4">
                    <Link to="/products">Continue Shopping</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-10">
                {cart.map((item) => (
                  <div key={item._id} className="border-b pb-10 ">
                    <div className="flex flex-col md:flex-row gap-6 ml-20 md:ml-0">
                      {/* IMAGE */}
                      <img
                        src={item.images?.[0]}
                        alt={item.name}
                        className="w-44 h-44 object-cover"
                      />

                      {/* DETAILS */}
                      <div className="flex-1">
                        <h2 className="text-3xl font-serif">{item.name}</h2>

                        <p className="uppercase tracking-[2px] text-xs text-muted-foreground mt-2">
                          EcoJute Collection
                        </p>

                        <div className="flex gap-2 mt-4">
                          <span className="border px-3 py-1 text-xs">
                            Natural Jute
                          </span>

                          <span className="border px-3 py-1 text-xs">
                            Sustainable
                          </span>
                        </div>

                        {/* QUANTITY */}
                        <div className="mt-8 flex items-center gap-6">
                          <div className="border flex">
                            <button
                              className="px-4 py-2"
                              onClick={() => updateQuantity(item._id, -1)}>
                              -
                            </button>

                            <span className="px-5 py-2">{item.quantity}</span>

                            <button
                              className="px-4 py-2"
                              onClick={() => updateQuantity(item._id, 1)}>
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="uppercase text-xs tracking-[2px] text-muted-foreground hover:text-red-500">
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* PRICE */}
                      <div>
                        <p className="text-3xl font-serif">₹{item.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT SIDE */}
            <Card className="h-fit sticky top-24">
              <CardContent className="p-8">
                <h3 className="uppercase tracking-[3px] text-sm font-semibold mb-8">
                  Order Summary
                </h3>

                {/* ADDRESS */}
                <div className="space-y-3 mb-8">
                  <Input
                    placeholder="Full Name"
                    disabled={loading}
                    onChange={(e) =>
                      setAddress({
                        ...address,
                        name: e.target.value,
                      })
                    }
                  />

                  <Input
                    placeholder="Phone Number"
                    disabled={loading}
                    onChange={(e) =>
                      setAddress({
                        ...address,
                        phone: e.target.value,
                      })
                    }
                  />

                  <Textarea
                    placeholder="Full Address"
                    disabled={loading}
                    onChange={(e) =>
                      setAddress({
                        ...address,
                        addressLine: e.target.value,
                      })
                    }
                  />

                  <Input
                    placeholder="City"
                    disabled={loading}
                    onChange={(e) =>
                      setAddress({
                        ...address,
                        city: e.target.value,
                      })
                    }
                  />

                  <Input
                    placeholder="Pincode"
                    disabled={loading}
                    onChange={(e) =>
                      setAddress({
                        ...address,
                        pincode: e.target.value,
                      })
                    }
                  />
                </div>

                <Separator />

                <div className="space-y-4 py-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{total}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-700">Free</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Taxes</span>
                    <span>₹0</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-2xl font-serif py-6">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={cart.length === 0 || loading}
                  className="w-full h-12 rounded-none bg-green-900 hover:bg-green-800 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      PROCESSING...
                    </>
                  ) : (
                    "CHECKOUT"
                  )}
                </Button>

                <div className="mt-6 text-xs text-muted-foreground space-y-3">
                  <p>🔒 Secure encrypted payment</p>
                  <p>♻ Eco-friendly packaging</p>
                  <p>🚚 Delivery across India</p>
                </div>
              </CardContent>
            </Card>
        </div>
      </div>
    </>
  );
};

export default Cart;
