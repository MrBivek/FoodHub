import { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Menu, X, Search, Moon, Sun } from "lucide-react";

export default function Navbar() {
  const { totals } = useCart();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const linkBase =
    "px-4 py-2 rounded-xl font-medium transition-all duration-300";
  const linkActive =
    "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 shadow-md";
  const linkIdle =
    "text-gray-800 dark:text-gray-200 hover:text-yellow-600 hover:scale-105";

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const categories = ["Momo", "Pizza", "Drinks", "Biryani", "Dessert"];

  return (
    <header className="sticky top-0 z-50 bg-yellow-400/60 dark:bg-gray-900/70 backdrop-blur-xl border-b border-yellow-500/40 shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-wide flex items-center gap-2 
          bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent"
        >
          🍕 FoodHub
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkIdle}`
            }
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/menu"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkIdle}`
            }
          >
            Menu
          </NavLink>

          {/* Dropdown */}
          <div className="relative group">
            <button
              className={`${linkBase} ${linkIdle} flex items-center gap-1`}
            >
              Categories ⌄
            </button>
            <div className="absolute hidden group-hover:block bg-white dark:bg-gray-800 shadow-xl rounded-2xl mt-3 w-48 overflow-hidden animate-fade-in">
              {categories.map((c) => (
                <Link
                  key={c}
                  to={`/menu?category=${c.toLowerCase()}`}
                  className="block px-5 py-3 text-gray-800 dark:text-gray-200 hover:bg-yellow-100 dark:hover:bg-gray-700 transition"
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkIdle}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkIdle}`
            }
          >
            Login
          </NavLink>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 rounded-xl border border-yellow-400 dark:border-gray-600 bg-white/70 dark:bg-gray-800/70 
              focus:ring-2 focus:ring-yellow-400 focus:outline-none transition"
            />
            <Search className="absolute right-3 top-2.5 text-gray-500 w-5 h-5" />
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="ml-2 p-2 rounded-xl bg-white/80 dark:bg-gray-800/80 hover:scale-110 transition"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>

          {/* Cart */}
          <Link
            to="/cart"
            className={`ml-2 flex items-center gap-2 px-5 py-2 rounded-xl font-semibold 
              border border-yellow-500 bg-white/80 dark:bg-gray-800/80 
              hover:scale-105 transition shadow-md ${
                location.pathname === "/cart" ? "ring-2 ring-yellow-500" : ""
              }`}
            title="Go to Cart"
          >
            <span>Cart</span>
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500 text-gray-900 text-sm font-bold animate-pulse">
              {totals.count}
            </span>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-xl bg-white/90 dark:bg-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      {menuOpen && (
        <div className="md:hidden bg-yellow-50 dark:bg-gray-800 px-6 py-4 space-y-3 shadow-lg rounded-b-2xl animate-fade-in">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkBase} block ${isActive ? linkActive : linkIdle}`
            }
            end
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/menu"
            className={({ isActive }) =>
              `${linkBase} block ${isActive ? linkActive : linkIdle}`
            }
            onClick={() => setMenuOpen(false)}
          >
            Menu
          </NavLink>
          {categories.map((c) => (
            <Link
              key={c}
              to={`/menu?category=${c.toLowerCase()}`}
              className="block px-4 py-2 rounded-lg text-gray-900 dark:text-gray-200 hover:bg-yellow-100 dark:hover:bg-gray-700 transition"
              onClick={() => setMenuOpen(false)}
            >
              {c}
            </Link>
          ))}
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${linkBase} block ${isActive ? linkActive : linkIdle}`
            }
            onClick={() => setMenuOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `${linkBase} block ${isActive ? linkActive : linkIdle}`
            }
            onClick={() => setMenuOpen(false)}
          >
            Login
          </NavLink>
          <Link
            to="/cart"
            className="flex items-center gap-2 px-5 py-2 rounded-lg font-semibold border border-yellow-500 bg-white dark:bg-gray-700 hover:scale-105 transition"
            onClick={() => setMenuOpen(false)}
          >
            Cart
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500 text-gray-900 text-sm font-bold">
              {totals.count}
            </span>
          </Link>
          <button
            onClick={toggleDarkMode}
            className="mt-3 flex items-center gap-2 px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-700 hover:scale-105 transition"
          >
            {darkMode ? (
              <>
                <Sun className="w-5 h-5 text-yellow-500" /> Light Mode
              </>
            ) : (
              <>
                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />{" "}
                Dark Mode
              </>
            )}
          </button>
        </div>
      )}
    </header>
  );
}
