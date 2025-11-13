import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

const routeMap = {
  Home: "/",
  Offer: "/offer",
  Menu: "/menu",
  "About Us": "/about",
  Profile: "/profile", // Added Profile here
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totals } = useCart();

  return (
    <header className="bg-[#FFE9E3] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-2xl font-extrabold text-[#E94E1B]">
          Foodhub
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 font-semibold text-[#333333]">
          {Object.keys(routeMap).map((item) => (
            <NavLink
              key={item}
              to={routeMap[item]}
              className={({ isActive }) =>
                isActive
                  ? "text-[#FF7A38] border-b-2 border-[#FF7A38] pb-1"
                  : "hover:text-[#FF7A38] transition"
              }
              end={item === "Home"}
            >
              {item}
            </NavLink>
          ))}
        </nav>

        {/* Right Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 border border-[#FF7A38] text-[#FF7A38] rounded-full font-semibold hover:bg-[#FF7A38] hover:text-white transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-[#FF7A38] text-white rounded-full font-semibold hover:bg-[#E94A1B] transition"
          >
            Sign Up
          </Link>
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-[#E94E1B]" />
            {totals.count > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#E94E1B] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {totals.count}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#E94E1B]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-[#FFE9E3] px-6 pb-6 space-y-3 font-semibold text-[#333333]">
          {Object.keys(routeMap).map((item) => (
            <NavLink
              key={item}
              to={routeMap[item]}
              className={({ isActive }) =>
                isActive
                  ? "block border-b-2 border-[#FF7A38] pb-1 text-[#FF7A38]"
                  : "block hover:text-[#FF7A38] transition"
              }
              onClick={() => setMenuOpen(false)}
              end={item === "Home"}
            >
              {item}
            </NavLink>
          ))}

          <div className="flex space-x-4 mt-4">
            <Link
              to="/login"
              className="flex-1 px-4 py-2 border border-[#FF7A38] text-center text-[#FF7A38] rounded-full font-semibold hover:bg-[#FF7A38] hover:text-white transition"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="flex-1 px-4 py-2 bg-[#FF7A38] text-white text-center rounded-full font-semibold hover:bg-[#E94A1B] transition"
              onClick={() => setMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
