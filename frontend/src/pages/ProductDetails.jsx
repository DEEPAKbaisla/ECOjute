import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";
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
  Loader2 
} from "lucide-react";
import toast from "react-hot-toast";

// Helper to get specs based on product category
const getSpecsByCategory = (category) => {
  switch (category?.toLowerCase()) {
    case "bags":
      return {
        width: "18.5 in / 47 cm",
        height: "14.2 in / 36 cm",
        depth: "6.7 in / 17 cm",
        handleDrop: "9.5 in / 24 cm",
        features: "Reinforced base with solid brass feet, water-resistant interior lining."
      };
    case "accessories":
      return {
        width: "8.5 in / 21 cm",
        height: "5.2 in / 13 cm",
        depth: "2.0 in / 5 cm",
        handleDrop: "N/A",
        features: "Premium metal zipper closure, handcrafted matching wrist strap."
      };
    case "home":
      return {
        width: "24 in / 60 cm",
        height: "36 in / 90 cm",
        depth: "0.5 in / 1.2 cm",
        handleDrop: "N/A",
        features: "Natural non-slip rubber backing, hand-woven thick braid layout."
      };
    default:
      return {
        width: "12 in / 30 cm",
        height: "12 in / 30 cm",
        depth: "4 in / 10 cm",
        handleDrop: "8 in / 20 cm",
        features: "100% biodegradable eco-materials, handcrafted in India."
      };
  }
};

// Helper to get artisan details based on product category
const getArtisanByCategory = (category) => {
  switch (category?.toLowerCase()) {
    case "bags":
      return {
        name: "Amara Devi",
        experience: "Master Weaver, 12 Years",
        bio: "Every eco jute bag is woven by Amara in our studio in West Bengal. Using techniques passed down through four generations, she treats jute not as a utility fiber, but as a fine textile. The subtle variations in the weave are her unique signature.",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCo_k53vC8mDn8M6xeWni_xJxGcO7xvnUW38LQfVsRZLYO00WZtlDDHeDPGh2vvcoL_SQQHdIW_M9H1PK2kfnD20Oq2ZbXgQrj9sLnDxp5l3Q4_EomExYyywmMtjjLfzZnImhP_4xGDHoMMLVzhtooZjVd-1GjD1GiwATWuftoKNJCETxTp3aGtsq2EyUdhpZEvAKnhDAbaUuxtEm4XNtTx4abOnb0r5lZ5H-LynR7xSxN_I80Nt93VgurABeUY3UDKud5fvDrYiw4"
      };
    case "accessories":
      return {
        name: "Sunita Halder",
        experience: "Master Artisan, 10 Years",
        bio: "Sunita specializes in small scale, high-precision weaving. She works closely with our finishing tailors to merge high-strength stitching with traditional Bengal weave structures, ensuring every accessory is durable and beautiful.",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMsBRL7TH0uReasmXg-GRiJK-d3bP3iVrOXKI9IhKTvwAReH9XU57ULPdWeKLSC0hmn8RUUcCSLxOB-ZSgjxzLV_OyTCBxl45J0vhflDgLOHDOS5eiR2wWdJhw8hnJUSjTulfDOw-0DYr0mBRbcb9C3UZhM-PjiKjYzmoF8-GxsdeSD781Upe91nnJlhrd8Y2KH317cKxdgxnI4Ktc5Iu4n-R6jJeGtm2DIF1MM9tyf977qUHzMfYXElzHNfGNnhd-wHYeF8jCNeI"
      };
    case "home":
    default:
      return {
        name: "Meera Sen",
        experience: "Loom Master, 8 Years",
        bio: "Meera operates the large-format wooden looms that weave our thick home rugs and runners. Her expertise ensures uniform thickness and tension across wide surfaces, giving our home collection its signature premium weight and longevity.",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAudiQardkHrILpWg8eBLN03sFMNhpLq3htX7k_uc-6mtl7D6u4H-JJHA4tRBhEb_KgSixvaCb_AAOGWNvDB0z62OJDkNQL6mIwAXluGsl8egSupvqXIaZ-9uhbUSrX0bBh01MrbPb6oj-JmIVERIGrhphdDiWmmV6mH-I1mwi0D_eYdvKONlbnrBGlQlgvvFsk3OFkiGP5rw4kFvKHnakHUgjrzpuLh9ou9S_D0ppTFD7TNROdvo0U0SiOEgs-Kk8AbBpUO8LWvPE"
      };
  }
};

const ProductDetails = () => {
  const { id } = useParams();
  const { cart, addToCart } = useCart();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);

  // Fetch single product data using React Query
  const { data: bag, isLoading, isError } = useQuery({
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

  const toggleSpecs = () => setIsSpecsOpen(!isSpecsOpen);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="font-serif text-foreground tracking-widest text-lg uppercase animate-pulse">Loading Details...</p>
      </div>
    );
  }

  if (isError || !bag) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 text-center">
        <h2 className="font-serif text-3xl text-destructive mb-4">Bag Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md">We couldn't retrieve the details for this item. It may have been deleted or does not exist.</p>
        <Link to="/products" className="bg-foreground text-background px-6 py-3 rounded-full hover:opacity-80 transition">
          Return to Collections
        </Link>
      </div>
    );
  }

  const isAdded = cart.some((item) => item._id === bag._id);
  const specs = getSpecsByCategory(bag.category);
  const artisan = getArtisanByCategory(bag.category);

  return (
    <>
      <Helmet>
        <title>{`${bag.name} | EcoJute Premium`}</title>
        <meta name="description" content={bag.description || `Shop ${bag.name} at EcoJute. Sustainable premium organic collection.`} />
      </Helmet>
      
      <Navbar />

      <main className="min-h-screen bg-background text-foreground pt-24 pb-20 selection:bg-secondary/30">
        {/* Breadcrumb & Navigation */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
          <nav className="flex gap-2 text-xs uppercase tracking-widest text-muted-foreground font-medium mb-8">
            <Link to="/products" className="hover:text-primary transition">Collections</Link>
            <span>/</span>
            <span className="text-primary font-semibold">{bag.category}</span>
          </nav>
        </div>

        {/* Product Grid */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Gallery: Responsive Carousel & Thumbs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="overflow-hidden rounded-3xl bg-muted/30 aspect-[4/5] shadow-sm">
              <motion.img 
                key={activeImageIndex}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                src={bag.images?.[activeImageIndex] || "/placeholder-bag.png"} 
                alt={bag.name} 
                className="w-full h-full object-cover select-none transition-transform duration-700 ease-out hover:scale-105"
              />
            </div>
            
            {/* Thumbnails row */}
            {bag.images && bag.images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
                {bag.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`aspect-square rounded-2xl overflow-hidden border-2 bg-card transition-all shadow-sm ${
                      activeImageIndex === idx 
                        ? "border-primary scale-105" 
                        : "border-transparent hover:border-border"
                    }`}
                  >
                    <img src={img} alt={`Detail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Product Narrative & Details */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/15 border border-primary/25 text-xs font-semibold text-primary">
                🌿 100% Eco-Friendly
              </span>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight font-bold">
                {bag.name}
              </h1>
              <p className="font-serif text-2xl text-secondary font-semibold font-sans">₹ {bag.price}</p>
            </div>

            <p className="text-foreground/85 text-base md:text-lg leading-relaxed font-light">
              {bag.description || "Designed for the intentional wanderer. This exclusive piece merges the raw structural integrity of hand-woven organic jute with the premium durability of ethical finishes. Perfect for daily lifestyle use, carrying heritage and dedication."}
            </p>

            {/* Config & Info */}
            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground w-24">Material</span>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-card border border-border rounded-md text-xs font-medium text-foreground shadow-sm">Organic Jute</span>
                  <span className="px-3 py-1 bg-card border border-border rounded-md text-xs font-medium text-foreground shadow-sm">Eco Fibers</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground w-24">Availability</span>
                <span className={`text-sm font-medium ${bag.stock ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"}`}>
                  {bag.stock ? "In Stock (Limited Release)" : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={!bag.stock}
                className={`w-full py-4 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 flex justify-center items-center gap-2 group cursor-pointer shadow-sm ${
                  !bag.stock
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : isAdded
                    ? "bg-emerald-800 dark:bg-emerald-700 text-white hover:bg-emerald-900"
                    : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md"
                }`}
              >
                {isAdded ? "✓ Added to Cart" : "Add to Bag"}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="flex justify-between items-center py-4 border-y border-border">
                <span className="text-xs text-muted-foreground flex items-center gap-2">
                  <Truck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  Complimentary carbon-neutral shipping in India
                </span>
                <button className="text-muted-foreground hover:text-destructive transition-colors p-1">
                  <Heart className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Specifications Accordion */}
            <div className="pt-2 border-b border-border pb-2">
              <div className="cursor-pointer py-3" onClick={toggleSpecs}>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-widest text-foreground">Dimensions & Details</span>
                  {isSpecsOpen ? <ChevronUp className="h-4 w-4 text-foreground" /> : <ChevronDown className="h-4 w-4 text-foreground" />}
                </div>
                
                {isSpecsOpen && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="overflow-hidden pt-4 pb-2"
                  >
                    <ul className="text-sm text-muted-foreground space-y-2 font-mono">
                      <li className="flex justify-between border-b border-dashed border-border pb-1">
                        <span>Width</span>
                        <span className="text-foreground">{specs.width}</span>
                      </li>
                      <li className="flex justify-between border-b border-dashed border-border pb-1">
                        <span>Height</span>
                        <span className="text-foreground">{specs.height}</span>
                      </li>
                      <li className="flex justify-between border-b border-dashed border-border pb-1">
                        <span>Depth</span>
                        <span className="text-foreground">{specs.depth}</span>
                      </li>
                      <li className="flex justify-between border-b border-dashed border-border pb-1">
                        <span>Handle Drop</span>
                        <span className="text-foreground">{specs.handleDrop}</span>
                      </li>
                      <li className="pt-2 text-xs italic text-muted-foreground font-sans">
                        {specs.features}
                      </li>
                    </ul>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Weaver Teaser Story Section */}
        <section className="mt-28 bg-accent/40 dark:bg-muted/40 py-20 px-6 border-y border-border">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center px-6 md:px-12">
            
            {/* Image side */}
            <div className="relative order-2 md:order-1">
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full -z-10 animate-pulse"></div>
              <img 
                alt="Artisan at Work" 
                className="w-full h-80 object-cover rounded-3xl shadow-md border-0 grayscale hover:grayscale-0 transition-all duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAudiQardkHrILpWg8eBLN03sFMNhpLq3htX7k_uc-6mtl7D6u4H-JJHA4tRBhEb_KgSixvaCb_AAOGWNvDB0z62OJDkNQL6mIwAXluGsl8egSupvqXIaZ-9uhbUSrX0bBh01MrbPb6oj-JmIVERIGrhphdDiWmmV6mH-I1mwi0D_eYdvKONlbnrBGlQlgvvFsk3OFkiGP5rw4kFvKHnakHUgjrzpuLh9ou9S_D0ppTFD7TNROdvo0U0SiOEgs-Kk8AbBpUO8LWvPE" 
              />
            </div>

            {/* Text side */}
            <div className="space-y-6 order-1 md:order-2">
              <span className="inline-block px-3 py-1 bg-card border border-border text-foreground text-xs font-bold uppercase tracking-widest rounded-full shadow-sm">
                The Maker's Story
              </span>
              <h3 className="font-serif text-3xl text-foreground font-bold">A Weaver's Signature</h3>
              <p className="text-muted-foreground text-base leading-relaxed font-light">
                {artisan.bio}
              </p>
              
              <div className="flex items-center gap-4 pt-4">
                <img 
                  alt={artisan.name} 
                  className="w-16 h-16 rounded-full border-2 border-background shadow-sm object-cover" 
                  src={artisan.avatar} 
                />
                <div>
                  <h4 className="font-serif text-lg text-foreground italic font-semibold">{artisan.name}</h4>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{artisan.experience}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Excellence Cards */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
          <div className="text-center mb-16 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-secondary">The Integrity of Materials</h4>
            <div className="h-0.5 w-16 bg-primary mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4 p-6 bg-card rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                <Leaf className="h-6 w-6" />
              </div>
              <h5 className="font-serif text-xl font-bold text-foreground">100% Biodegradable</h5>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                Untreated jute fibers that return to the earth naturally without leaving a synthetic trace.
              </p>
            </div>
            
            <div className="space-y-4 p-6 bg-card rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                <Droplet className="h-6 w-6" />
              </div>
              <h5 className="font-serif text-xl font-bold text-foreground">Plant-Based Dyes</h5>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                Natural indigo and organic dyes that gather premium character and patina with every year of use.
              </p>
            </div>
            
            <div className="space-y-4 p-6 bg-card rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h5 className="font-serif text-xl font-bold text-foreground">Lifetime Restore</h5>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                We support a lifetime weaving restoration service to ensure your carrier lasts for generations.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProductDetails;
