import React, { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";

import Navbar from "../Navbar";
import Banner from "../Banner";

const Details = lazy(() => import("../Details"));
const Footer = lazy(() => import("../Footer"));
const FeaturedBagCard = lazy(() => import("../Featureitems"));

const Loader = () => (
  <div className="flex items-center justify-center py-20">
    <Loader2 className="h-10 w-10 animate-spin text-green-700" />
  </div>
);

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

      {/* Above-the-fold content */}
      <Navbar />
      <Banner />

      {/* Featured Section */}
      <Suspense fallback={<Loader />}>
        <FeaturedBagCard />
      </Suspense>

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
