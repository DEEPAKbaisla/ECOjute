import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import Logout from "./Logout";
import { LayoutDashboard } from "lucide-react";


function Navbar() {
  const { authUser } = useAuth();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b bg-white dark:bg-slate-900 dark:text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-green-700">
          EcoJute
        </a>

        {/* Links */}
        <div className="flex items-center gap-6">
          <a href="/" className="hover:text-green-600 hidden lg:block">Home</a>
          <a href="/products" className="hover:text-green-600 hidden lg:block">Products</a>

          {authUser?.role === "USER" && (
            <a className="hidden lg:flex border rounded-full h-10 w-10 items-center justify-center hover:rotate-12" href="/cart">🛒</a>
          )}

          {authUser?.role === "ADMIN" && (
            <a className="hidden lg:block" href="/UploadProduct"><LayoutDashboard/></a>
          )}

          {/* Theme Toggle */}
          <button 
            onClick={() =>
              setTheme(theme === "light" ? "dark" : "light")
            }
            className="border px-3 py-1 rounded-md "
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {authUser ? (
            <Logout/>
          ) : (
            <button>
            
             <Link to="/login" className="bg-green-700 text-white px-3 py-2 rounded-md hover:bg-green-800 duration-300">
                Login
              </Link>
            
            
            </button>
          )}
        </div>
       
      </div>
    </div>
  );
}

export default Navbar;