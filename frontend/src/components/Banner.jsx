import React from "react";

function Banner() {
  return (
    <>
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
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
          <a href="/products" className="btn mt-6 text-white bg-green-700">
            Buy Now
          </a>
        </div>
        <div className=" order-1 w-full mt-20 md:w-1/2 ">
          <img
            src="/bag.png"
            className="md:w-[550px] md:h-[460px] md:ml-12 rounded-lg shadow-md"
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default Banner;
