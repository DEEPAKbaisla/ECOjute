import React from "react";
import { Link } from "react-router-dom";
import { Leaf, Recycle, Heart } from "lucide-react";
function Details() {
  return (
    <div className="min-h-screen bg-background">
      {/* <Navbar />
      <Hero /> */}

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
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
                Made from sustainable jute fibers, completely biodegradable and
                eco-friendly
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
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Go Green?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of eco-conscious customers making a difference, one
            bag at a time
          </p>
          <Link to="/products">
            <button
              size="lg"
              className="text-white text-lg p-4 bg-green-700 rounded-2xl">
              Shop Collection
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Details;
