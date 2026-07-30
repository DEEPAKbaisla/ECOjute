import React, { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { useInView } from "react-intersection-observer";
import { Loader2, Leaf, Recycle, Heart, Trees, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

import Navbar from "../Navbar";
import Banner from "../Banner";

const Details = lazy(() => import("../Details"));
const Footer = lazy(() => import("../Footer"));
const FeaturedBagCard = lazy(() => import("../Featureitems"));

const Loader = () => (
  <div className="flex items-center justify-center py-20">
    <Loader2 className="h-10 w-10 animate-spin text-primary" />
  </div>
);

const values = [
  {
    icon: Leaf,
    title: "100% Natural",
    desc: "Made from sustainable jute fibers, completely biodegradable and eco-friendly.",
  },
  {
    icon: Recycle,
    title: "Reusable & Durable",
    desc: "Strong and long-lasting, perfect for daily use and years of service.",
  },
  {
    icon: Heart,
    title: "Ethically Made",
    desc: "Fair trade certified. Every purchase supports artisan weavers in Bengal.",
  },
  {
    icon: Trees,
    title: "Carbon Positive",
    desc: "Jute absorbs CO2 5x faster than trees. Each bag helps heal the planet.",
  },
];

const testimonials = [
  {
    quote: "The quality of these jute bags is exceptional. I've been using mine daily for 6 months and it still looks brand new.",
    author: "Priya S.",
    role: "Verified Buyer",
  },
  {
    quote: "Knowing my purchase supports fair trade weaving communities makes every bag feel meaningful. Beautiful craftsmanship.",
    author: "Arjun M.",
    role: "Verified Buyer",
  },
  {
    quote: "Finally a brand that truly cares about sustainability. The carbon ledger transparency is exactly what we need.",
    author: "Neha K.",
    role: "Verified Buyer",
  },
];

function Home() {
  const { ref: detailsRef, inView: detailsVisible } = useInView({
    triggerOnce: true,
    rootMargin: "300px",
  });

  const { ref: footerRef, inView: footerVisible } = useInView({
    triggerOnce: true,
    rootMargin: "300px",
  });

  return (
    <div className="min-h-[100dvh] bg-transparent safe-bottom">
      <Helmet>
        <title>EcoJute - Eco Friendly Jute Bags in India</title>
        <meta
          name="description"
          content="EcoJute offers eco-friendly jute bags and sustainable products in India. Replace plastic with reusable jute bags."
        />
      </Helmet>

      <Navbar />
      <Banner />

      {/* Why EcoJute - Brand Values */}
      <section id="values" className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="font-mono text-[12px] uppercase text-muted-foreground tracking-widest font-bold">
              Why EcoJute
            </span>
            <h2 className="garamond text-3xl md:text-4xl font-bold text-foreground mt-3">
              Crafted for the Planet
            </h2>
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
              Every weave represents a step toward a sustainable future. From raw
              fiber to finished product, we prioritize the planet.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                  <val.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-5 text-lg font-serif font-bold text-foreground">
                  {val.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <Suspense fallback={<Loader />}>
        <FeaturedBagCard />
      </Suspense>

      {/* Testimonials */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <span className="font-mono text-[12px] uppercase text-muted-foreground tracking-widest font-bold">
              Trusted by Customers
            </span>
            <h2 className="garamond text-3xl md:text-4xl font-bold text-foreground mt-3">
              What Our Community Says
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-shadow"
              >
                <ShieldCheck className="h-6 w-6 text-primary mb-4" />
                <p className="text-sm text-foreground/80 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-5 pt-4 border-t border-border">
                  <p className="text-sm font-semibold text-foreground">
                    {t.author}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Details loads when user scrolls near it */}
      <div ref={detailsRef}>
        {detailsVisible && (
          <Suspense fallback={<Loader />}>
            <Details />
          </Suspense>
        )}
      </div>

      {/* Footer loads when user scrolls near it */}
      <div ref={footerRef}>
        {footerVisible && (
          <Suspense fallback={<Loader />}>
            <Footer />
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default Home;
