import { memo, useCallback, useState } from "react";
import toast from "react-hot-toast";
import api from "@/api/axios";
import Navbar from "../Navbar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/context/CartContext";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

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
  // <Card className="hover:shadow-lg hover:scale-103 transition-all duration-200">
  //   <CardContent className="p-4">
  //     <img
  //       src={bag.images?.[0]}
  //       alt={`Eco friendly jute bag ${bag.name} reusable shopping bag India`}
  //       className="w-full h-48 object-contain rounded-md bg-gray-100"
  //       loading="lazy"
  //       width={300}
  //       height={192}
  //       onError={(e) => {
  //         e.target.src = "/placeholder-bag.png";
  //       }}
  //     />
  //     <div className="mt-4 space-y-1">
  //       <h2 className="font-semibold text-lg">{bag.name}</h2>
  //       <p className="text-sm text-muted-foreground">{bag.category}</p>
  //       <p className="font-bold text-lg mt-2">₹{bag.price}</p>
  //     </div>
  //   </CardContent>
  //   <CardFooter>
  //     <Button
  //       className="w-full"
  //       variant={cartItem ? "secondary" : "default"}
  //       onClick={() => onAddToCart(bag)}>
  //       {cartItem ? (
  //         <span className="font-semibold text-white dark:text-emerald-300">
  //           ✓ Added to Cart
  //         </span>
  //       ) : (
  //         "Add to Cart"
  //       )}
  //     </Button>
  //   </CardFooter>
  // </Card>
  <Card className="group overflow-hidden rounded-3xl border border-border/55 bg-card shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    {/* Image Section */}
    <div className="relative">
      <Link to={`/products/${bag._id}`}>
        <img
          src={bag.images?.[0]}
          alt={bag.name}
          className="h-[310px] w-full object-cover bg-[#eef2ec] dark:bg-muted hover:scale-105 transition-transform duration-300 overflow-hidden cursor-pointer"
          loading="lazy"
          onError={(e) => {
            e.target.src = "/placeholder-bag.png";
          }}
        />
      </Link>

      {/* Floating Add Button */}
      <button
        onClick={() => onAddToCart(bag)}
        className="absolute bottom-4 right-4 h-12 w-12 rounded-full bg-card border border-border text-foreground shadow-lg flex items-center justify-center text-2xl hover:scale-110 transition">
        +
      </button>

      {/* Eco Badge */}
      <div className="absolute top-4 left-4 rounded-full bg-card/90 border border-border/50 px-3 py-1 text-xs font-semibold text-foreground">
        🌿 Eco Friendly
      </div>
    </div>

    {/* Content */}
    <CardContent className="p-6">
      <p className="text-xs uppercase tracking-[2px] text-muted-foreground font-semibold">
        {bag.category}
      </p>

      <Link to={`/products/${bag._id}`} className="hover:underline">
        <h2 className="mt-3 text-2xl font-serif font-semibold text-foreground hover:text-primary transition-colors">
          {bag.name}
        </h2>
      </Link>
      <hr className="my-2 border-border" />
      <div className="mt-6 flex items-center justify-between">
        <p className="text-xl font-semibold">₹ {bag.price}</p>

        <span className="rounded-md bg-emerald-100 dark:bg-emerald-950/50 px-3 py-1 text-xs font-medium text-emerald-800 dark:text-emerald-300">
          Fair trade
        </span>
      </div>
    </CardContent>
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
  const [selectedCategory, setSelectedCategory] = useState("all");

  // ✅ React Query: auto-caching, deduplication, abort, background refetch
  const {
    data: bags = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bags"],
    queryFn: fetchBags,
    staleTime: 5 * 60 * 1000, // serve from cache for 5 mins
    retry: 2, // auto-retry twice on failure
  });

  // ✅ Stable reference — memo on BagCard won't break across re-renders
  const handleAddToCart = useCallback(
    (bag) => {
      addToCart(bag);
      toast.success(`${bag.name} added to cart!`);
    },
    [addToCart],
  );

  const filteredBags =
    selectedCategory === "all"
      ? bags
      : bags.filter((item) => item.category === selectedCategory);

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
        <div className="flex flex-col md:flex-row items-center justify-between mt-15 md:mx-20 mx-4 ">
          <div className="text-start">
            <h1 className="garamond text-xl md:text-2xl font-bold">
              ECO-FRIENDLY MATERIALS
            </h1>

            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto uppercase ">
              biodegradable / plastic-free.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-8 mt-4 md:mt-0">
            <Button
              variant={selectedCategory === "all" ? "filter" : "nonfilter"}
              onClick={() => setSelectedCategory("all")}>
              VIEW ALL
            </Button>

            <Button
              variant={selectedCategory === "bags" ? "filter" : "nonfilter"}
              onClick={() => setSelectedCategory("bags")}>
              BAGS
            </Button>

            <Button
              variant={selectedCategory === "home" ? "filter" : "nonfilter"}
              onClick={() => setSelectedCategory("home")}>
              HOME
            </Button>

            <Button
              variant={
                selectedCategory === "accessories" ? "filter" : "nonfilter"
              }
              onClick={() => setSelectedCategory("accessories")}>
              ACCESSORIES
            </Button>
          </div>
        </div>

        <hr className="md:mx-20 mt-2 mx-4" />
        <div className="mb-10 mt-10"></div>

        {/* <div className="flex flex-wrap justify-center gap-3 mb-8">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}>
            All
          </Button>

          <Button
            variant={selectedCategory === "bags" ? "default" : "outline"}
            onClick={() => setSelectedCategory("bags")}>
            Bags
          </Button>

          <Button
            variant={selectedCategory === "accessories" ? "default" : "outline"}
            onClick={() => setSelectedCategory("accessories")}>
            Accessories
          </Button>

          <Button
            variant={selectedCategory === "home" ? "default" : "outline"}
            onClick={() => setSelectedCategory("home")}>
            Home
          </Button>
        </div> */}

        {isError && (
          <p className="text-destructive text-center mt-10">
            Failed to load products. Please try again.
          </p>
        )}

        {/* {isLoading ? (
          <SkeletonGrid />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBags.map((bag) => (
              <BagCard
                key={bag._id}
                bag={bag}
                cartItem={cart.find((item) => item._id === bag._id)}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )} */}

        {isLoading ? (
          <SkeletonGrid />
        ) : filteredBags.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 ">
            <h2 className="text-2xl font-semibold">No Products Found</h2>

            <p className="text-muted-foreground mt-2 text-center">
              No products are available in the{" "}
              <span className="capitalize font-medium">{selectedCategory}</span>{" "}
              category yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:mx-20 mx-2 mt-5">
            {filteredBags.map((bag) => (
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
