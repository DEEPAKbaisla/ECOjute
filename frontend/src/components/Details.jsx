import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Leaf,
  Recycle,
  Heart,
  LeafIcon,
  ShieldCheck,
  Sparkles,
  Droplets,
  Mail,
  CheckCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
function Details() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: false }}>
      <div className="min-h-screen bg-background">
        {/* <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose Jute?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Leaf className="h-8 w-8 text-green-700" />
                </div>
                <h3 className="text-xl font-semibold ">100% Natural</h3>
                <p className="text-muted-foreground">
                  Made from sustainable jute fibers, completely biodegradable
                  and eco-friendly
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Recycle className="h-8 w-8 text-green-700" />
                </div>
                <h3 className="text-xl font-semibold">Reusable & Durable</h3>
                <p className="text-muted-foreground">
                  Strong and long-lasting, perfect for daily use and years of
                  service
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="h-8 w-8 text-green-700" />
                </div>
                <h3 className="text-xl font-semibold">Stylish & Unique</h3>
                <p className="text-muted-foreground">
                  Natural texture and elegant design that complements any style
                </p>
              </div>
            </div>
          </div>
        </section> */}

        {/* CTA Section */}
        <section className="bg-[#1b3022] text-white rounded-3xl p-8 md:p-12 border border-[#b4cdb8]/15 shadow-xl relative overflow-hidden md:mx-25 mx-4">
          <div className="relative z-10 text-center max-w-2xl mx-auto space-y-4 mb-10">
            <span className="font-mono text-[12px] uppercase text-[#b4cdb8] tracking-widest font-bold">
              our collective trace milestones
            </span>
            <h3 className="font-serif text-2xl md:text-4xl font-extrabold md:tracking-tight text-[#fbf9f8] mt-2">
              A Sincere Ecological Signature
            </h3>
            <p className="font-sans  text-sm md:text-[17px] text-[#fbf9f8]/80 leading-relaxed">
              EcoJute operates with deep climate respect. Unlike water-intensive
              crops, monsoon-fed Jute crops capture carbon at levels exceeding
              primary forestry arrays, requiring no chemical fertilizers.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center backdrop-blur-sm shadow-inner hover:border-white/25 transition-all">
              <Droplets className="w-8 h-8 text-[#ffdea5] mx-auto mb-2 animate-pulse" />
              <span className="font-mono text-3xl font-extrabold text-[#ffdea5] block">
                2.5M+
              </span>
              <span className="font-sans text-[9px] uppercase tracking-wider text-white/70 mt-1 block font-bold">
                Groundwater Liters Saved
              </span>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center backdrop-blur-sm shadow-inner hover:border-white/25 transition-all">
              <LeafIcon className="w-8 h-8 text-[#b4cdb8] mx-auto mb-2 animate-bounce" />
              <span className="font-mono text-3xl font-extrabold text-[#b4cdb8] block">
                100%
              </span>
              <span className="font-sans text-[9px] uppercase tracking-wider text-white/70 mt-1 block font-bold">
                Completely Biodegradable
              </span>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center backdrop-blur-sm shadow-inner hover:border-white/25 transition-all">
              <ShieldCheck className="w-8 h-8 text-[#ffdea5] mx-auto mb-2" />
              <span className="font-mono text-3xl font-extrabold text-[#ffdea5] block">
                450+
              </span>
              <span className="font-sans text-[9px] uppercase tracking-wider text-white/70 mt-1 block font-bold">
                Weavers Covered Under Fair Trade
              </span>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center backdrop-blur-sm shadow-inner hover:border-white/25 transition-all">
              <Sparkles className="w-8 h-8 text-[#b4cdb8] mx-auto mb-2" />
              <span className="font-mono text-3xl font-extrabold text-[#b4cdb8] block">
                12k+
              </span>
              <span className="font-sans text-[9px] uppercase tracking-wider text-white/70 mt-1 block font-bold">
                Reforestation Trees Sponsored
              </span>
            </div>
          </div>
        </section>

        {/* ARTISAN MINI TEASER SECTION */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white p-6 md:p-8 border border-[#eae8e7] rounded-3xl shadow-sm mx-4 md:mx-25 mt-20">
          <div>
            <span className="font-mono text-[12px] uppercase text-[#737973] tracking-wider font-extrabold block mb-2">
              the human foundation
            </span>
            <h3 className="garamond text-2xl md:text-4xl font-bold text-[#061b0e]">
              Preserving Bengal's Heritage Loom
            </h3>
            <p className="font-sans text-sm text-[#434843] leading-relaxed mt-4">
              "Every weave we throw represents a heartbeat of history." Through
              direct fair trade integration, we bypass layers of intermediaries.
              Weavers like Meera Sen earn certified living margins to support
              local households and underwrite digital primary schools.
            </p>
            {/* <button
              onClick={() => setActiveSection("artisans")}
              disabled={true}
              className="font-sans text-xs uppercase font-extrabold tracking-wider bg-[#061b0e] text-white hover:bg-[#1b3022] mt-6 px-6 py-2.5 rounded transition-transform active:scale-95 cursor-pointer shadow flex items-center gap-2 h-fit w-fit">
              <span>Read Weaving Story</span>
            </button> */}
            <div className="relative inline-block mt-6">
              <button
                disabled
                className="font-sans text-xs uppercase font-extrabold tracking-wider
               bg-gray-400 text-white px-6 py-2.5 rounded
               cursor-not-allowed opacity-70 shadow
               flex items-center gap-2 h-fit w-fit ">
                Read Weaving Story
              </button>

              <span
                className="absolute -top-2 -right-2 bg-amber-500 text-white
               text-[10px] px-2 py-0.5 rounded-full
               font-bold uppercase">
                Coming Soon
              </span>
            </div>
          </div>

          <div className="aspect-[16/10] rounded-2xl overflow-hidden shadow-inner relative border border-[#eae8e7]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMsBRL7TH0uReasmXg-GRiJK-d3bP3iVrOXKI9IhKTvwAReH9XU57ULPdWeKLSC0hmn8RUUcCSLxOB-ZSgjxzLV_OyTCBxl45J0vhflDgLOHDOS5eiR2wWdJhw8hnJUSjTulfDOw-0DYr0mBRbcb9C3UZhM-PjiKjYzmoF8-GxsdeSD781Upe91nnJlhrd8Y2KH317cKxdgxnI4Ktc5Iu4n-R6jJeGtm2DIF1MM9tyf977qUHzMfYXElzHNfGNnhd-wHYeF8jCNeI"
              alt="Artisan Weavers"
              className="w-full h-full object-cover select-none"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 right-3 bg-white glass px-3 py-1 rounded-full text-[9px] uppercase font-bold text-[#1b3022] border border-[#c3c8c1]">
              Meera Sen's Loom
            </div>
          </div>
        </section>

        {/* NEWSLETTER FORM */}
        <section className="py-12 px-6 bg-[#f5f2ed] border border-[#eae8e7] rounded-3xl text-center max-w-2xl md:mx-auto shadow-inner mt-20 mx-4 mb-20">
          <Mail className="w-8 h-8 text-[#1b3022] mx-auto mb-3" />
          <h4 className="font-serif text-xl font-bold text-[#061b0e]">
            Join the Regenerative Movement
          </h4>
          <p className="font-sans text-sm text-[#737973] max-w-md mx-auto mt-2 leading-close">
            Subscribe to receive boutique seasonal releases, carbon ledger
            metrics, and stories directly from the Hooghly collective tea rooms.
          </p>

          <form
            // onSubmit={handleSubscribeNewsletter}
            className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter email coordinate"
              className="flex-1 px-4 py-2.5 bg-white border border-[#c3c8c1] rounded text-xs focus:outline-none focus:border-[#1b3022]"
            />
            <button
              type="submit"
              className="bg-[#1b3022] text-[#fbf9f8] hover:bg-[#0b2013] text-xs uppercase font-extrabold tracking-wider px-6 py-2.5 rounded transition-transform active:scale-95 duration-100 cursor-pointer h-10 shadow-md whitespace-nowrap">
              Subscribe
            </button>
          </form>

          {/* <AnimatePresence>
                  {newsletterSubscribed && (
                    <motion.p
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="text-xs text-green-700 font-bold block mt-3 flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle className="w-4 h-4" />
                      We've added your coordinate! Thank you.
                    </motion.p>
                  )}
                </AnimatePresence> */}
        </section>

        {/* FOOTER */}
        {/* <footer className="border-t border-[#eae8e7] pt-12 mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-[#737973] mx-4 md:mx-25 pb-10">
          <div className="space-y-3">
            <h4 className="font-serif text-xm font-bold text-[#061b0e]">
              EcoJute
            </h4>
            <p className="font-sans text-xm leading-relaxed max-w-xs">
              Curators of climate-positive sustainable handwoven accessories.
              Supporting small-owner Fly wooden looms in Bengal collectives.
            </p>
          </div>
          <div>
            <h5 className="font-sans text-xm uppercase tracking-wider text-[#061b0e] font-bold mb-3">
              Shop Curations
            </h5>
            <ul className="space-y-1.5 font-sans text-xm">
              <li>
                <button
                  onClick={() => setActiveSection("store")}
                  className="hover:text-[#061b0e] transition-colors cursor-pointer text-left">
                  Urban Backpacks
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection("store")}
                  className="hover:text-[#061b0e] transition-colors cursor-pointer text-left">
                  Luna Round Pouches
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection("store")}
                  className="hover:text-[#061b0e] transition-colors cursor-pointer text-left">
                  Herringbone Shopper Totes
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection("store")}
                  className="hover:text-[#061b0e] transition-colors cursor-pointer text-left">
                  Entry Rug Runners
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-sans text-xm uppercase tracking-wider text-[#061b0e] font-bold mb-3">
              Global Registry Coordinates
            </h5>
            <p className="font-sans text-[14px] leading-relaxed mb-3">
              Every weave carries an ID traceable to our community ledgers. We
              guarantee direct support with no third-party markups.
            </p>
            <p className="font-mono text-[12px] text-[#737973]">
              Registry Ref: Bengal-Coop88A // Certified Neutral CO2
            </p>
          </div>
        </footer> */}
      </div>
    </motion.div>
  );
}

export default Details;
