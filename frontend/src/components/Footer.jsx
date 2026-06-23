import React from "react";

const Footer = () => {
  return (
    <div>
      {/* FOOTER */}
      <footer className="px-6 md:px-14 mt-20 mb-2">
        <hr className='mb-3'/>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left */}
          <div className="text-center md:text-left">
            <h3 className="garamond font-serif text-2xl font-semibold">EcoJute</h3>
            <p className="mt-2 text-sm text-gray-600">
              © 2025 EcoJute. Handcrafted with intention.
            </p>
          </div>

          {/* Center Links */}
          <nav className="flex flex-wrap justify-center gap-8 text-sm text-gray-700">
            <a href="#">Sustainability</a>
            <a href="#">Shipping</a>
            <a href="#">Returns</a>
            <a href="#">Privacy</a>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-6">
            <button>🌐</button>
            <button>✉️</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
