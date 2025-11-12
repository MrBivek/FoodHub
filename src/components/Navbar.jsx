import { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Menu, X, ShoppingCart } from "lucide-react";

export default function Navbar() {
  const { totals } = useCart();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const categories = ["Momo", "Pizza", "Drinks", "Biryani", "Dessert"];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 flex items-center gap-2"
        >
          🍕 FoodHub
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
              }`
            }
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/menu"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
              }`
            }
          >
            Menu
          </NavLink>

          {/* Dropdown */}
          <div className="relative group">
            <button className="font-medium text-gray-700 hover:text-blue-600 transition flex items-center gap-1">
              Categories
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-lg mt-2 w-48 py-2">
              {categories.map((c) => (
                <Link
                  key={c}
                  to={`/menu?category=${c.toLowerCase()}`}
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
              }`
            }
          >
            Login
          </NavLink>

          {/* Cart */}
          <Link
            to="/cart"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            title="Go to Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="font-medium">Cart</span>
            {totals.count > 0 && (
              <span className="bg-white text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                {totals.count}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block py-2 font-medium ${
                isActive ? "text-blue-600" : "text-gray-700"
              }`
            }
            end
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/menu"
            className={({ isActive }) =>
              `block py-2 font-medium ${
                isActive ? "text-blue-600" : "text-gray-700"
              }`
            }
            onClick={() => setMenuOpen(false)}
          >
            Menu
          </NavLink>
          
          <div className="border-t border-gray-100 pt-2 mt-2">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Categories</p>
            {categories.map((c) => (
              <Link
                key={c}
                to={`/menu?category=${c.toLowerCase()}`}
                className="block py-2 pl-4 text-gray-600 hover:text-blue-600"
                onClick={() => setMenuOpen(false)}
              >
                {c}
              </Link>
            ))}
          </div>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `block py-2 font-medium ${
                isActive ? "text-blue-600" : "text-gray-700"
              }`
            }
            onClick={() => setMenuOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `block py-2 font-medium ${
                isActive ? "text-blue-600" : "text-gray-700"
              }`
            }
            onClick={() => setMenuOpen(false)}
          >
            Login
          </NavLink>
          
          <Link
            to="/cart"
            className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium mt-4"
            onClick={() => setMenuOpen(false)}
          >
            <ShoppingCart className="w-5 h-5" />
            Cart ({totals.count})
          </Link>
        </div>
      )}
    </header>
  );
}