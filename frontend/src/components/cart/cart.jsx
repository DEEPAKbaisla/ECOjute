import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import Navbar from "../Navbar";
import api from "../../api/axios";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Loader2, Leaf, Trash2, Minus, Plus, ShieldCheck, Truck, Recycle } from "lucide-react";
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
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
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
        <div className="flex items-center gap-2 mb-1">
          <Leaf className="h-5 w-5 text-primary" />
          <h1 className="text-3xl font-serif font-bold text-foreground">Your Shopping Bag</h1>
        </div>
        <p className="text-muted-foreground text-sm mb-12">
          {cart.length} {cart.length === 1 ? "item" : "items"} — Review your eco-friendly selection.
        </p>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-12">
          {/* LEFT */}
          <div>
            {cart.length === 0 ? (
              <Card className="text-center py-16">
                <CardContent>
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="h-7 w-7 text-muted-foreground" />
                  </div>
                  <h2 className="text-xl font-serif font-semibold text-foreground mb-2">Your cart is empty</h2>
                  <p className="text-sm text-muted-foreground mb-6">Looks like you haven&apos;t added anything yet.</p>
                  <Button asChild>
                    <Link to="/products">Continue Shopping</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <Card key={item._id} className="overflow-hidden hover:-translate-y-0.5 transition-all duration-300">
                    <CardContent className="p-5">
                      <div className="flex flex-col sm:flex-row gap-5">
                        <img
                          src={item.images?.[0]}
                          alt={item.name}
                          className="w-full sm:w-36 h-36 object-cover rounded-xl bg-muted"
                        />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h2 className="text-xl font-serif font-semibold text-foreground">{item.name}</h2>
                              <p className="text-xs uppercase tracking-[2px] text-muted-foreground mt-1">
                                EcoJute Collection
                              </p>
                              <div className="flex gap-2 mt-3">
                                <span className="border border-border rounded-md px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                                  Natural Jute
                                </span>
                                <span className="border border-border rounded-md px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                                  Sustainable
                                </span>
                              </div>
                            </div>
                            <p className="text-xl font-bold text-foreground whitespace-nowrap shrink-0">
                              ₹{item.price * item.quantity}
                            </p>
                          </div>

                          <div className="flex items-center justify-between mt-5 pt-4 border-t border-border">
                            <div className="flex items-center border border-border rounded-lg overflow-hidden">
                              <button
                                className="px-3 py-2 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                                onClick={() => updateQuantity(item._id, -1)}
                              >
                                <Minus size={14} />
                              </button>
                              <span className="px-4 py-2 text-sm font-medium text-foreground border-x border-border min-w-[40px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                className="px-3 py-2 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                                onClick={() => updateQuantity(item._id, 1)}
                              >
                                <Plus size={14} />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item._id)}
                              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <Trash2 size={14} />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xs font-bold uppercase tracking-[3px] text-foreground mb-6">
                  Order Summary
                </h3>

                <div className="space-y-3 mb-6">
                  <Input
                    placeholder="Full Name"
                    disabled={loading}
                    onChange={(e) => setAddress({ ...address, name: e.target.value })}
                  />
                  <Input
                    placeholder="Phone Number"
                    disabled={loading}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  />
                  <Textarea
                    placeholder="Full Address"
                    disabled={loading}
                    onChange={(e) => setAddress({ ...address, addressLine: e.target.value })}
                  />
                  <Input
                    placeholder="City"
                    disabled={loading}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  />
                  <Input
                    placeholder="Pincode"
                    disabled={loading}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                  />
                </div>

                <div className="space-y-3 py-4 border-y border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">₹{total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-emerald-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxes</span>
                    <span className="font-medium text-foreground">₹0</span>
                  </div>
                </div>

                <div className="flex justify-between text-xl font-serif font-bold py-4">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">₹{total}</span>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={cart.length === 0 || loading}
                  className="w-full h-12 rounded-xl flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      PROCESSING...
                    </>
                  ) : (
                    "CHECKOUT"
                  )}
                </Button>

                <div className="mt-5 space-y-2.5">
                  {[
                    { icon: ShieldCheck, text: "Secure encrypted payment" },
                    { icon: Recycle, text: "Eco-friendly packaging" },
                    { icon: Truck, text: "Free delivery across India" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <item.icon size={14} className="text-primary shrink-0" />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
