import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "@/api/axios";
import Navbar from "../Navbar";

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { useCart } from "@/context/CartContext"; // ✅ Use context

const BagList = () => {
  const [bags, setBags] = useState([]);
  const [loading, setLoading] = useState(true);

  const { cart, addToCart } = useCart(); // ✅ from context

  useEffect(() => {
    const fetchBags = async () => {
      try {
        const response = await api.get("/api/bags");
        if (response.data.success) {
          setBags(response.data.data);
        }
      } catch (error) {
        console.log("Error fetching bags:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBags();
  }, []);

  const handleAddToCart = (bag) => {
    addToCart(bag);
    toast.success(`${bag.name} added to cart!`);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-background py-10 px-6">
        <div className="mb-10 mt-10 ">
          <h1 className="text-3xl font-bold">Our Products</h1>
          <p className="text-muted-foreground mt-2">
            Browse our collection of sustainable jute products
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4 space-y-4">
                  <Skeleton className="h-40 w-full rounded-md" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bags.map((bag) => {
              const cartItem = cart.find(
                (item) => item._id === bag._id
              );

              return (
                <Card
                  key={bag._id}
                  className="hover:shadow-lg transition-all duration-200"
                >
                  <CardContent className="p-4">
                    <img
                      src={bag.images?.[0]}
                      alt={bag.name}
                      className="w-full h-48 object-contain rounded-md"
                    />

                    <div className="mt-4 space-y-1">
                      <h2 className="font-semibold text-lg">
                        {bag.name}
                      </h2>

                      <p className="text-sm text-muted-foreground">
                        {bag.category}
                      </p>

                      <p className="font-bold text-lg mt-2">
                        ₹{bag.price}
                      </p>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button
                      className="w-full"
                      variant={cartItem ? "secondary" : "default"}
                      onClick={() => handleAddToCart(bag)}
                    >
                      {cartItem ? (
                        <span className="font-semibold text-white dark:text-emerald-300">
                          ✓ Added to Cart
                        </span>
                      ) : (
                        "Add to Cart"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default BagList;