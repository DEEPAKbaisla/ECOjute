import { ArrowRight, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

const floatingLeaf = (delay, x, y) => ({
  initial: { opacity: 0, y: 20, x: 0, rotate: 0 },
  animate: {
    opacity: [0, 0.6, 0.4, 0.7, 0],
    y: [20, -30, -60, -100, -140],
    x: [0, x, x * 0.5, x * 1.2, x * 0.8],
    rotate: [0, 15, -10, 20, 0],
    transition: { duration: 8, repeat: Infinity, delay, ease: "linear" },
  },
});

export default function Hero() {
  return (
    <section className="max-w-screen-2xl md:mx-25 px-4 mt-30">
      <div className="relative h-[500px] md:h-[650px] rounded-3xl overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[#061b0e]/40 via-[#1b3022]/30 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061b0e]/90 via-black/30 to-transparent z-10" />

        {/* Floating decorative leaves */}
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
          {[
            { delay: 0, x: 60, y: -80, left: "10%", top: "20%" },
            { delay: 2, x: -40, y: -100, left: "70%", top: "15%" },
            { delay: 4, x: 30, y: -60, left: "50%", top: "30%" },
            { delay: 1, x: -50, y: -90, left: "85%", top: "50%" },
          ].map((leaf, i) => (
            <motion.div
              key={i}
              {...floatingLeaf(leaf.delay, leaf.x, leaf.y)}
              style={{ left: leaf.left, top: leaf.top, position: "absolute" }}
            >
              <Leaf size={20} className="text-[#b4cdb8]/50" />
            </motion.div>
          ))}
        </div>

        {/* Background Image */}
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={
            "https://res.cloudinary.com/dxmmbkhq8/image/upload/v1781888582/home_ecojute_image_1_dxhqo1.png"
          }
          alt="EcoJute Premium Collection"
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Content */}
        <div className="relative z-30 flex h-full flex-col justify-end p-6 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-md text-white"
          >
            <span className="font-mono text-[13px] uppercase tracking-widest text-[#b4cdb8] font-bold mb-2.5 block">
              Premium Collection 2025
            </span>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight garamond">
              Handcrafted
              <br />
              Sustainability
            </h1>

            <p className="mt-5 text-sm md:text-base text-gray-200 leading-relaxed">
              Luxury jute bags crafted with care. Sustainable, durable, stylish
              and designed for conscious living.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <Link
                to="/products"
                className="group bg-white text-[#061b0e] hover:bg-gray-100 px-6 py-4 rounded-md font-semibold inline-flex items-center gap-2 transition">
                <span>EXPLORE CURATIONS</span>
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <a
                href="#values"
                className="text-sm text-white/80 hover:text-white underline underline-offset-4 transition"
              >
                Our Promise
              </a>
            </div>
          </motion.div>
        </div>

        {/* Eco badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute top-6 right-6 z-30 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 flex items-center gap-2"
        >
          <Leaf size={14} className="text-[#b4cdb8]" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-white">
            100% Biodegradable
          </span>
        </motion.div>
      </div>
    </section>
  );
}
