import React, { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../Navbar";
import Banner from "../Banner";

// ✅ Details is below the fold — lazy load it
const Details = lazy(() => import("../Details"));

function Home() {
  return (
    <div className="min-h-[100dvh] bg-transparent safe-bottom">

        {/* ✅ SEO META TAGS */}
      <Helmet>
        <title>EcoJute - Eco Friendly Jute Bags in India</title>
        <meta
          name="description"
          content="EcoJute offers eco-friendly jute bags and sustainable products in India. Replace plastic with reusable jute bags."
        />
      </Helmet>
     <Navbar />
      <Banner />
      <Suspense fallback={<div className="min-h-[400px] bg-gray-50" />}>
        <Details />
      </Suspense>
    </div>
  );
}

export default Home;
