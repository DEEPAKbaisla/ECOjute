import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const featuredBags = [
  {
    id: 1,
    name: "Urban Jute Backpack",
    category: "Accessories",
    images: [
      "https://res.cloudinary.com/dxmmbkhq8/image/upload/v1782202957/urban_dqoxuv.png",
    ],
    savedKg: 2500,
  },
  {
    id: 2,
    name: "Luna Circle Pouch",
    category: "Accessories",
    images: [
      "https://res.cloudinary.com/dxmmbkhq8/image/upload/v1782203125/luna_circle_oicptw.png",
    ],
    savedKg: 1800,
  },
  {
    id: 3,
    name: "Golden-Weave Tote",
    category: "Bags",
    images: [
      "https://res.cloudinary.com/dxmmbkhq8/image/upload/v1782204443/tote_dixmfp.webp",
    ],
    savedKg: 3200,
  },
  {
    id: 4,
    name: "Organic Rug Runner",
    category: "Home",
    images: [
      "https://res.cloudinary.com/dxmmbkhq8/image/upload/v1782203146/hema_jute_ixz2gj.png",
    ],
    savedKg: 4500,
  },
];

const FeaturedBagCard = () => {
  return (
    <section className="py-20 bg-[#f7f5f2]">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end gap-4 mb-3">
          <div className="min-w-0">
            <h2 className="text-lg md:text-2xl font-serif font-bold whitespace-nowrap">
              Featured Handlooms
            </h2>

            <p className="mt-1 text-[12px] sm:text-[14px] uppercase text-gray-500">
              Curated Minimal Drops
            </p>
          </div>

          <Link
            to="/products"
            className="shrink-0 text-sm sm:text-base font-medium underline">
            View Boutique Grid
          </Link>
        </div>
        <hr className="border-gray-300 mb-8 mt-2" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBags.map((bag) => (
            <Link key={bag.id} to="/products">
              <Card className="group overflow-hidden rounded-3xl">
                <div className="relative p-4 pb-0">
                  <img
                    src={bag.images[0]}
                    alt={bag.name}
                    loading="lazy"
                    decoding="async"
                    className="h-[320px] w-full object-cover rounded-2xl"
                  />

                  <div className="absolute bottom-6 left-6 bg-[#163b2f] text-white px-3 py-1 rounded-md text-xs font-semibold">
                    {bag.savedKg}L SAVED
                  </div>
                </div>

                <CardContent className="p-5">
                  <p className="text-xs uppercase tracking-[2px] text-gray-500">
                    {bag.category}
                  </p>

                  <h3 className="mt-2 text-xl font-serif font-semibold">
                    {bag.name}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBagCard;
