import { memo, useCallback, useState } from "react";
import { toast } from "sonner";
import api from "@/api/axios";
import Navbar from "../Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/context/CartContext";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Leaf, ShoppingBag, ArrowUpRight } from "lucide-react";

const fetchBags = async ({ signal }) => {
  const response = await api.get("/api/bags", { signal });
  if (!response.data.success) throw new Error("Failed to fetch bags");
  return response.data.data;
};

const categories = ["all", "bags", "accessories", "home"];

const BagCard = memo(({ bag, cartItem, onAddToCart, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.5, delay: index * 0.05 }}
  >
    <Card className="group overflow-hidden rounded-3xl border border-border/55 bg-card shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5">
      <div className="relative overflow-hidden">
        <Link to={`/products/${bag._id}`}>
          <img
            src={bag.images?.[0]}
            alt={bag.name}
            className="h-[320px] w-full object-cover bg-[#eef2ec] dark:bg-muted transition-all duration-700 group-hover:scale-105 cursor-pointer"
            loading="lazy"
            onError={(e) => {
              e.target.src = "/placeholder-bag.png";
            }}
          />
        </Link>

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <button
          onClick={() => onAddToCart(bag)}
          className="absolute bottom-4 right-4 h-12 w-12 rounded-full bg-white dark:bg-card border border-border/50 text-foreground shadow-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
        >
          <ShoppingBag size={18} />
        </button>

        <div className="absolute top-4 left-4 flex gap-2">
          {bag.isFeatured && (
            <span className="rounded-full bg-foreground text-background px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm">
              Featured
            </span>
          )}
          <span className="rounded-full bg-white/90 dark:bg-card/90 backdrop-blur-sm border border-border/50 px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
            Eco Friendly
          </span>
        </div>
      </div>

      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[11px] uppercase tracking-[2px] text-muted-foreground font-semibold">
            {bag.category}
          </p>
          <span className="rounded-md bg-emerald-100 dark:bg-emerald-950/50 px-2 py-0.5 text-[10px] font-medium text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
            Fair trade
          </span>
        </div>

        <Link to={`/products/${bag._id}`}>
          <h2 className="font-serif font-semibold text-foreground group-hover:text-primary transition-colors truncate text-lg sm:text-xl">
            {bag.name}
          </h2>
        </Link>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <p className="text-lg font-bold text-foreground">
              <span className="text-xs text-muted-foreground mr-0.5">₹</span>
              {bag.price}
            </p>
            {bag.mrp && bag.mrp > bag.price && (
              <>
                <span className="text-xs text-muted-foreground line-through">₹{bag.mrp}</span>
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded">
                  {Math.round((1 - bag.price / bag.mrp) * 100)}%
                </span>
              </>
            )}
          </div>

          <Link
            to={`/products/${bag._id}`}
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-0.5"
          >
            Details
            <ArrowUpRight size={12} />
          </Link>
        </div>
      </CardContent>
    </Card>
  </motion.div>
));

const SkeletonGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {[...Array(8)].map((_, i) => (
      <Card key={i}>
        <CardContent className="p-4 space-y-4">
          <Skeleton className="h-[320px] w-full rounded-2xl" />
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

  const {
    data: bags = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bags"],
    queryFn: fetchBags,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

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

      <div className="min-h-screen bg-background">
        {/* Premium Header */}
        <div className="relative pt-28 pb-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
            >
              <div>
                <div className="flex items-center gap-2 text-primary mb-3">
                  <Leaf size={16} />
                  <span className="text-[11px] uppercase tracking-[3px] font-bold">
                    Sustainable Collection
                  </span>
                </div>
                <h1 className="garamond text-foreground font-bold leading-tight truncate text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                  Handwoven Essentials
                </h1>
                <p className="text-muted-foreground text-sm mt-3 max-w-xl leading-relaxed">
                  Each piece is crafted by master weavers using time-honored
                  techniques. Biodegradable, durable, and built to last.
                </p>
              </div>

              <p className="text-xs text-muted-foreground shrink-0">
                {filteredBags.length}{" "}
                {filteredBags.length === 1 ? "piece" : "pieces"} available
              </p>
            </motion.div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="flex flex-wrap gap-2 pb-6 border-b border-border">
            {categories.map((cat) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: categories.indexOf(cat) * 0.05 }}
              >
                <button
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-foreground text-background shadow-md"
                      : "bg-card border border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                  }`}
                >
                  {cat === "all" ? "All" : cat}
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-16 py-10">
          {isError && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-destructive font-semibold text-lg">
                Unable to load products
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                Please check your connection and try again.
              </p>
            </div>
          )}

          {isLoading ? (
            <SkeletonGrid />
          ) : filteredBags.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-serif font-semibold text-foreground">
                No Products Found
              </h2>
              <p className="text-muted-foreground text-sm mt-2 max-w-sm">
                Nothing available in{" "}
                <span className="capitalize font-medium text-foreground">
                  {selectedCategory}
                </span>{" "}
                yet. Check back soon for new handwoven arrivals.
              </p>
              <button
                onClick={() => setSelectedCategory("all")}
                className="mt-6 text-sm font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors cursor-pointer"
              >
                View all products
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredBags.map((bag, idx) => (
                <BagCard
                  key={bag._id}
                  bag={bag}
                  index={idx}
                  cartItem={cart.find((item) => item._id === bag._id)}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BagList;
