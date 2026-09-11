import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import Logout from "./Logout";
import { Handbag, Leaf, Moon, ShieldUser, ShoppingCart, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

function Navbar() {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const { authUser } = useAuth();

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a
          href="/"
          className="garamond text-2xl font-bold text-foreground hover:text-primary inline-flex items-center gap-2"
        >
          <Leaf size={22} className="text-primary" />
          EcoJute
        </a>

        {/* Links */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* <a
            href="/"
            className="hidden text-sm font-medium text-foreground/80 transition-colors hover:text-primary md:block"
          >
            <Handbag />
          </a> */}
          <a
            href="/products"
            className="hidden text-sm font-medium text-foreground/80 transition-colors hover:text-primary md:block"
          >
            <Handbag />
          </a>

          <Link
            to="/cart"
            className="relative h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/80 transition hover:-translate-y-0.5 hover:border-primary hover:text-primary flex"
          >
            <ShoppingCart className="h-5 w-5" />

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 rounded-full bg-destructive px-2 py-0.5 text-xs font-semibold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Link>

          {authUser?.role === "ADMIN" && (
            <a
              className="text-foreground/80 transition-colors hover:text-primary "
              href="/admin"
            >
              <ShieldUser />
            </a>
          )}

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/80 transition hover:-translate-y-0.5 hover:border-primary hover:text-primary flex cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </button>

          {authUser ? (
            <Logout />
          ) : (
            <Link
              to="/login"
              className="bg-foreground text-background hover:opacity-90 px-4 py-2 rounded-md text-sm font-semibold transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
