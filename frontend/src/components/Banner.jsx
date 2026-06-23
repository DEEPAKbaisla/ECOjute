import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="max-w-screen-2xl md:mx-25 px-4 mt-30">
      <div className="relative h-[500px] md:h-[650px] rounded-3xl overflow-hidden shadow-xl">
        {/* Background Image */}
        <img
          src={
            "https://res.cloudinary.com/dxmmbkhq8/image/upload/v1781888582/home_ecojute_image_1_dxhqo1.png"
          }
          alt="EcoJute Premium Collection"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#061b0e]/90 via-black/30 to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-12">
          <div className="max-w-md text-white">
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
          </div>

          {/* CTA */}

          <div className="mt-8">
            <Link
              to="/products"
              className="group bg-white text-[#061b0e] hover:bg-gray-100 px-6 py-4 rounded-md font-semibold inline-flex items-center gap-2 transition">
              <span>EXPLORE CURATIONS</span>
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
