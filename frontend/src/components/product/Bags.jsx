import { memo, useCallback } from "react";
import toast from "react-hot-toast";
import api from "@/api/axios";
import Navbar from "../Navbar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/context/CartContext";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

// ✅ Fetch function — defined outside component, no re-creation on render
const fetchBags = async ({ signal }) => {
  const startTime = performance.now();
  const response = await api.get("/api/bags", { signal });
  const endTime = performance.now();
  // console.log(`⚡ Fetch time for bags: ${endTime - startTime} ms`);
  if (!response.data.success) throw new Error("Failed to fetch bags");
  return response.data.data;
};

// ✅ Memoized card — only re-renders when bag/cartItem/handler changes
const BagCard = memo(({ bag, cartItem, onAddToCart }) => (
  <Card className="hover:shadow-lg transition-all duration-200">
    <CardContent className="p-4">
      <img
        src={bag.images?.[0]}
        alt={`Eco friendly jute bag ${bag.name} reusable shopping bag India`}
        className="w-full h-48 object-contain rounded-md bg-gray-100"
        loading="lazy"
        width={300}
        height={192}
        onError={(e) => {
          e.target.src = "/placeholder-bag.png";
        }}
      />
      <div className="mt-4 space-y-1">
        <h2 className="font-semibold text-lg">{bag.name}</h2>
        <p className="text-sm text-muted-foreground">{bag.category}</p>
        <p className="font-bold text-lg mt-2">₹{bag.price}</p>
      </div>
    </CardContent>
    <CardFooter>
      <Button
        className="w-full"
        variant={cartItem ? "secondary" : "default"}
        onClick={() => onAddToCart(bag)}
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
));

// ✅ Stable skeleton — no props, never re-renders unnecessarily
const SkeletonGrid = () => (
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
);

const BagList = () => {
  const { cart, addToCart } = useCart();

  // ✅ React Query: auto-caching, deduplication, abort, background refetch
  const {
    data: bags = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bags"],
    queryFn: fetchBags,
    staleTime: 5 * 60 * 1000,  // serve from cache for 5 mins
    retry: 2,                   // auto-retry twice on failure
  });
  

  // ✅ Stable reference — memo on BagCard won't break across re-renders
  const handleAddToCart = useCallback(
    (bag) => {
      addToCart(bag);
      toast.success(`${bag.name} added to cart!`);
    },
    [addToCart]
  );

  return (
    <>
     <Helmet>
    <title>Buy Jute Bags Online in India | EcoJute</title>
    <meta
      name="description"
      content="Shop eco-friendly jute bags online in India. Durable, reusable, and sustainable bags for daily use."
    />
  </Helmet>
      <Navbar />
      <div className="min-h-screen bg-background py-10 px-6">
         {/* ✅ SEO Heading */}
    <div className="mb-10 mt-10 text-center">
      <h1 className="text-3xl font-bold">
        Buy Eco Friendly Jute Bags Online in India
      </h1>

      <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
        Explore our collection of eco-friendly jute bags that are reusable,
        biodegradable, and perfect for daily use. EcoJute helps you switch
        from plastic to sustainable living.
      </p>
    </div>
        <div className="mb-10 mt-10">
           </div>

        {isError && (
          <p className="text-destructive text-center mt-10">
            Failed to load products. Please try again.
          </p>
        )}

        {isLoading ? (
          <SkeletonGrid />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bags.map((bag) => (
              <BagCard
                key={bag._id}
                bag={bag}
                cartItem={cart.find((item) => item._id === bag._id)}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default BagList;