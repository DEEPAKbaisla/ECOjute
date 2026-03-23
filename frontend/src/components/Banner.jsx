import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const CLOUDINARY_BASE = "https://res.cloudinary.com/dxmmbkhq8/image/upload";
const IMAGE_ID = "v1773333956/bag_lgm3ft.png";

function Banner() {
  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">    
      <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36">
        <div className="space-y-8">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Sustainable Style with{" "}
            <span className="text-green-700">Natural Jute</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover our collection of eco-friendly jute bags and products.
            Beautiful, durable, and kind to our planet.
          </p>
        </div>
        <Button
          asChild
          className="mt-6 bg-green-700 hover:bg-green-800 text-white">
          <Link to="/products">Buy Now</Link>
        </Button>
      </div>

      <div className="order-1 w-full mt-20 md:w-1/2">
       <img
  src="https://res.cloudinary.com/dxmmbkhq8/image/upload/f_webp,q_auto,w_550,h_460,c_limit/v1773333956/bag_lgm3ft.png"
  srcSet={`
    https://res.cloudinary.com/dxmmbkhq8/image/upload/f_webp,q_auto,w_550,h_460,c_limit/v1773333956/bag_lgm3ft.png 550w,
    https://res.cloudinary.com/dxmmbkhq8/image/upload/f_webp,q_auto,w_1100,h_920,c_limit/v1773333956/bag_lgm3ft.png 1100w
  `}
  sizes="(max-width: 768px) 100vw, 550px"
  className="md:w-[550px] md:h-[460px] md:ml-12 rounded-lg shadow-md"
  alt="Eco-friendly jute bag"
  fetchPriority="high"
  width={550}
  height={460}
/>
      </div>
    </div>
  );
}

export default Banner;
