import { Leaf, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-14 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <a href="/" className="garamond text-2xl font-bold text-foreground inline-flex items-center gap-2">
              <Leaf size={22} className="text-primary" />
              EcoJute
            </a>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Curators of climate-positive sustainable handwoven accessories. Supporting small-owner Fly wooden looms in Bengal collectives.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-foreground mb-4">
              Shop
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="/products" className="hover:text-foreground transition-colors">All Products</a></li>
              <li><a href="/products" className="hover:text-foreground transition-colors">Backpacks</a></li>
              <li><a href="/products" className="hover:text-foreground transition-colors">Totes</a></li>
              <li><a href="/products" className="hover:text-foreground transition-colors">Pouches</a></li>
              <li><a href="/products" className="hover:text-foreground transition-colors">Home Decor</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-foreground mb-4">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Our Impact</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-foreground mb-4">
              Connect
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
            </ul>

            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>&copy; 2025 EcoJute. Handcrafted with intention.</p>
          <p className="flex items-center gap-1">
            Made with care for the planet
            <Leaf size={12} className="text-primary" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
