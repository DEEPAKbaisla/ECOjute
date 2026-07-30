import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "motion/react";
import api from "@/api/axios";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import {
  ChevronDown,
  ChevronUp,
  Leaf,
  Droplet,
  ShieldCheck,
  Heart,
  ArrowRight,
  Truck,
  Loader2,
  Package,
  Recycle,
  Star,
} from "lucide-react";
import toast from "react-hot-toast";
import { Card, CardContent } from "@/components/ui/card";



const getArtisanByCategory = (category) => {
  switch (category?.toLowerCase()) {
    case "bags":
      return {
        name: "Amara Devi",
        experience: "Master Weaver, 12 Years",
        bio: "Every eco jute bag is woven by Amara in our studio in West Bengal. Using techniques passed down through four generations, she treats jute not as a utility fiber, but as a fine textile. The subtle variations in the weave are her unique signature.",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCo_k53vC8mDn8M6xeWni_xJxGcO7xvnUW38LQfVsRZLYO00WZtlDDHeDPGh2vvcoL_SQQHdIW_M9H1PK2kfnD20Oq2ZbXgQrj9sLnDxp5l3Q4_EomExYyywmMtjjLfzZnImhP_4xGDHoMMLVzhtooZjVd-1GjD1GiwATWuftoKNJCETxTp3aGtsq2EyUdhpZEvAKnhDAbaUuxtEm4XNtTx4abOnb0r5lZ5H-LynR7xSxN_I80Nt93VgurABeUY3UDKud5fvDrYiw4",
      };
    case "accessories":
      return {
        name: "Sunita Halder",
        experience: "Master Artisan, 10 Years",
        bio: "Sunita specializes in small scale, high-precision weaving. She works closely with our finishing tailors to merge high-strength stitching with traditional Bengal weave structures, ensuring every accessory is durable and beautiful.",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCMsBRL7TH0uReasmXg-GRiJK-d3bP3iVrOXKI9IhKTvwAReH9XU57ULPdWeKLSC0hmn8RUUcCSLxOB-ZSgjxzLV_OyTCBxl45J0vhflDgLOHDOS5eiR2wWdJhw8hnJUSjTulfDOw-0DYr0mBRbcb9C3UZhM-PjiKjYzmoF8-GxsdeSD781Upe91nnJlhrd8Y2KH317cKxdgxnI4Ktc5Iu4n-R6jJeGtm2DIF1MM9tyf977qUHzMfYXElzHNfGNnhd-wHYeF8jCNeI",
      };
    case "home":
    default:
      return {
        name: "Meera Sen",
        experience: "Loom Master, 8 Years",
        bio: "Meera operates the large-format wooden looms that weave our thick home rugs and runners. Her expertise ensures uniform thickness and tension across wide surfaces, giving our home collection its signature premium weight and longevity.",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAudiQardkHrILpWg8eBLN03sFMNhpLq3htX7k_uc-6mtl7D6u4H-JJHA4tRBhEb_KgSixvaCb_AAOGWNvDB0z62OJDkNQL6mIwAXluGsl8egSupvqXIaZ-9uhbUSrX0bBh01MrbPb6oj-JmIVERIGrhphdDiWmmV6mH-I1mwi0D_eYdvKONlbnrBGlQlgvvFsk3OFkiGP5rw4kFvKHnakHUgjrzpuLh9ou9S_D0ppTFD7TNROdvo0U0SiOEgs-Kk8AbBpUO8LWvPE",
      };
  }
};

const ProductDetails = () => {
  const { id } = useParams();
  const { cart, addToCart } = useCart();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  const {
    data: bag,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bag", id],
    queryFn: async () => {
      const res = await api.get(`/api/bags/${id}`);
      if (!res.data.success) throw new Error("Failed to fetch bag details");
      return res.data.bag;
    },
    staleTime: 5 * 60 * 1000,
  });

  const handleAddToCart = () => {
    if (bag) {
      addToCart(bag);
      toast.success(`${bag.name} added to cart!`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="font-serif text-foreground tracking-widest text-lg uppercase animate-pulse">
          Loading Details...
        </p>
      </div>
    );
  }

  if (isError || !bag) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
          <Package className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="font-serif text-3xl text-foreground mb-3">
          Bag Not Found
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          We couldn't retrieve the details for this item. It may have been
          deleted or does not exist.
        </p>
        <Link
          to="/products"
          className="bg-foreground text-background px-6 py-3 rounded-full hover:opacity-90 transition text-sm font-semibold"
        >
          Return to Collections
        </Link>
      </div>
    );
  }

  const isAdded = cart.some((item) => item._id === bag._id);
  const artisan = getArtisanByCategory(bag.category);
  const discount = bag.mrp && bag.mrp > bag.price ? Math.round((1 - bag.price / bag.mrp) * 100) : 0;
  const showMrp = bag.mrp && bag.mrp > bag.price;

  const allImages = bag.images?.length
    ? bag.images
    : ["https://res.cloudinary.com/dxmmbkhq8/image/upload/v1782202957/urban_dqoxuv.png"];

  return (
    <>
      <Helmet>
        <title>{`${bag.name} | EcoJute Premium`}</title>
        <meta
          name="description"
          content={
            bag.description ||
            `Shop ${bag.name} at EcoJute. Sustainable premium organic collection.`
          }
        />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background text-foreground pt-24 pb-20">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground font-medium py-6"
          >
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-muted-foreground/40">/</span>
            <Link to="/products" className="hover:text-primary transition-colors">
              Products
            </Link>
            <span className="text-muted-foreground/40">/</span>
            <span className="text-primary font-semibold">{bag.category}</span>
          </motion.nav>
        </div>

        {/* Product */}
        <section className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-5"
          >
            <div className="overflow-hidden rounded-3xl bg-muted/20 aspect-[4/5] shadow-sm border border-border/30">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  src={allImages[activeImageIndex]}
                  alt={bag.name}
                  className="w-full h-full object-cover select-none"
                />
              </AnimatePresence>
            </div>

            {allImages.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`aspect-square rounded-2xl overflow-hidden border-2 bg-card transition-all shadow-sm ${
                      activeImageIndex === idx
                        ? "border-primary ring-1 ring-primary/30 scale-105"
                        : "border-transparent hover:border-border/60 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${bag.name} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Mobile sticky add to cart */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border p-4 flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={bag.stock < 1}
                className={`flex-1 py-3.5 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm ${
                  bag.stock < 1
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : isAdded
                      ? "bg-emerald-800 text-white"
                      : "bg-foreground text-background hover:opacity-90"
                }`}
              >
                {isAdded ? "Added to Cart" : "Add to Bag"}
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`h-11 w-11 rounded-xl border flex items-center justify-center transition-colors ${
                  isWishlisted
                    ? "border-destructive text-destructive"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? "fill-destructive" : ""}`} />
              </button>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start space-y-8 pb-20 lg:pb-0"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
                  100% Eco-Friendly
                </span>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" className="text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground ml-1">(42)</span>
                </div>
              </div>

              <h1 className="font-serif text-foreground leading-tight font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                {bag.name}
              </h1>

              <div className="flex items-baseline gap-3">
                <p className="text-3xl font-bold text-foreground">
                  <span className="text-sm text-muted-foreground mr-0.5">₹</span>
                  {bag.price}
                </p>
                {showMrp && (
                  <span className="text-xs text-muted-foreground line-through">
                    ₹{bag.mrp}
                  </span>
                )}
                {discount > 0 && (
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/50 px-2 py-0.5 rounded">
                    {discount}% OFF
                  </span>
                )}
              </div>
            </div>

            <div>
              <p
                className={`text-foreground/80 text-base leading-relaxed ${!showFullDesc ? 'line-clamp-2' : ''}`}
              >
                {bag.description ||
                  "Designed for the intentional wanderer. This exclusive piece merges the raw structural integrity of hand-woven organic jute with the premium durability of ethical finishes."}
              </p>
              {bag.description && bag.description.length > 100 && (
                <button
                  onClick={() => setShowFullDesc(!showFullDesc)}
                  className="mt-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors cursor-pointer"
                >
                  {showFullDesc ? "Read Less" : "Read More"}
                </button>
              )}
            </div>

            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex items-center gap-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground w-24 shrink-0">
                  Material
                </span>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-card border border-border rounded-lg text-xs font-medium text-foreground">
                    {bag.material || "Organic Jute"}
                  </span>
                  <span className="px-3 py-1.5 bg-card border border-border rounded-lg text-xs font-medium text-foreground">
                    Eco Fibers
                  </span>
                  <span className="px-3 py-1.5 bg-card border border-border rounded-lg text-xs font-medium text-foreground">
                    Natural Dyes
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground w-24 shrink-0">
                  Availability
                </span>
                <div className="flex items-center gap-2">
                  <span className={`inline-block w-2 h-2 rounded-full ${bag.stock > 0 ? "bg-emerald-500" : "bg-destructive"}`} />
                  <span className={`text-sm font-medium ${bag.stock > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"}`}>
                    {bag.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={bag.stock < 1}
                className={`w-full py-4 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-3 group cursor-pointer shadow-sm ${
                  bag.stock < 1
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : isAdded
                      ? "bg-emerald-800 dark:bg-emerald-700 text-white hover:bg-emerald-900"
                      : "bg-foreground text-background hover:opacity-90 hover:shadow-md active:scale-[0.98]"
                }`}
              >
                {isAdded ? (
                  <>
                    <span>Added to Cart</span>
                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </span>
                  </>
                ) : (
                  <>
                    <ShoppingBagIcon />
                    <span>Add to Bag</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-between py-4 px-4 bg-muted/30 rounded-xl border border-border/50">
                <span className="text-xs text-muted-foreground flex items-center gap-2">
                  <Truck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  Free carbon-neutral shipping
                </span>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`transition-colors p-1.5 rounded-full hover:bg-card ${
                    isWishlisted ? "text-destructive" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? "fill-destructive" : ""}`} />
                </button>
              </div>
            </div>

            {/* Specifications */}
            <div className="border border-border rounded-2xl overflow-hidden">
              <button
                onClick={() => setIsSpecsOpen(!isSpecsOpen)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/20 transition-colors cursor-pointer"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-foreground">
                  Dimensions & Details
                </span>
                {isSpecsOpen ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
              </button>

              <AnimatePresence>
                {isSpecsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 space-y-3 border-t border-border pt-4">
                      {[
                        { label: "Width", value: bag.dimensions?.width || "—" },
                        { label: "Height", value: bag.dimensions?.height || "—" },
                        { label: "Depth", value: bag.dimensions?.depth || "—" },
                        { label: "Weight", value: bag.weight || "—" },
                      ].map((spec) => (
                        <div
                          key={spec.label}
                          className="flex items-center justify-between text-sm py-1.5 border-b border-dashed border-border/50 last:border-0"
                        >
                          <span className="text-muted-foreground">{spec.label}</span>
                          <span className="text-foreground font-medium">{spec.value}</span>
                        </div>
                      ))}
                      <p className="text-xs italic text-muted-foreground pt-2 leading-relaxed">
                        100% biodegradable eco-materials, handcrafted in India.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Recycle, label: "Biodegradable" },
                { icon: ShieldCheck, label: "Fair Trade" },
                { icon: Leaf, label: "Carbon Neutral" },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex flex-col items-center gap-2 py-3 px-2 rounded-xl bg-muted/20 border border-border/40"
                >
                  <badge.icon className="h-4 w-4 text-primary" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-center">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Artisan Story */}
        <section className="mt-28 bg-gradient-to-br from-accent/50 to-muted/30 py-20 border-y border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="absolute -top-4 -left-4 w-36 h-36 bg-primary/5 rounded-full -z-10" />
                <img
                  alt="Artisan at Work"
                  className="w-full h-80 object-cover rounded-3xl shadow-lg border border-border/30 grayscale hover:grayscale-0 transition-all duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAudiQardkHrILpWg8eBLN03sFMNhpLq3htX7k_uc-6mtl7D6u4H-JJHA4tRBhEb_KgSixvaCb_AAOGWNvDB0z62OJDkNQL6mIwAXluGsl8egSupvqXIaZ-9uhbUSrX0bBh01MrbPb6oj-JmIVERIGrhphdDiWmmV6mH-I1mwi0D_eYdvKONlbnrBGlQlgvvFsk3OFkiGP5rw4kFvKHnakHUgjrzpuLh9ou9S_D0ppTFD7TNROdvo0U0SiOEgs-Kk8AbBpUO8LWvPE"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-5"
              >
                <span className="px-3 py-1 bg-card border border-border text-foreground text-xs font-bold uppercase tracking-widest rounded-full shadow-sm inline-block">
                  The Maker's Story
                </span>
                <h3 className="font-serif text-3xl md:text-4xl text-foreground font-bold">
                  A Weaver's Signature
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {artisan.bio}
                </p>

                <div className="flex items-center gap-4 pt-2">
                  <img
                    alt={artisan.name}
                    className="w-16 h-16 rounded-full border-2 border-background shadow-sm object-cover"
                    src={artisan.avatar}
                  />
                  <div>
                    <h4 className="font-serif text-lg text-foreground font-semibold">
                      {artisan.name}
                    </h4>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {artisan.experience}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Excellence Cards */}
        <section className="max-w-7xl mx-auto px-6 md:px-16 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16 space-y-3"
          >
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
              The Integrity of Materials
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              Built to Last, Built for Earth
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Leaf,
                title: "100% Biodegradable",
                desc: "Untreated jute fibers that return to the earth naturally without leaving a synthetic trace.",
                delay: 0,
              },
              {
                icon: Droplet,
                title: "Plant-Based Dyes",
                desc: "Natural indigo and organic dyes that gather premium character and patina with every year of use.",
                delay: 0.1,
              },
              {
                icon: ShieldCheck,
                title: "Lifetime Restore",
                desc: "We support a lifetime weaving restoration service to ensure your carrier lasts for generations.",
                delay: 0.2,
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: item.delay }}
                className="group p-8 bg-card rounded-3xl border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary group-hover:bg-primary/20 transition-colors">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 font-serif text-xl font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

const ShoppingBagIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
);

export default ProductDetails;
