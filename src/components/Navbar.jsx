// components/Navbar.jsx - CLEAN + FIXED + ROUTE-CONNECTED + ACCESSIBLE
import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, Shield, User, LogOut, ChevronDown } from "lucide-react";
import { useCart } from "../context/CartContext";

const routeMap = {
  Home: "/",
  Offer: "/offer",
  Menu: "/menu",
  "About Us": "/about",
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const { totals } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  // Navbar shadow scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load user data whenever token changes
  useEffect(() => {
    if (!token) return setUser(null);
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    } catch {
      setUser(null);
    }
  }, [token]);

  // Close menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setUserMenuOpen(false);
    navigate("/login");
  };

  return (
    <header
      className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-lg" : "shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl sm:text-3xl font-extrabold text-[#E94E1B] hover:scale-105 transition-transform flex items-center gap-2"
        >
          <span className="text-3xl sm:text-4xl" aria-label="Burger emoji">
            🍔
          </span>
          <span className="hidden sm:inline">Foodhub</span>
          <span className="sm:hidden">FH</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex space-x-6 xl:space-x-8 font-semibold text-[#333]">
          {Object.entries(routeMap).map(([label, path]) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `transition-all duration-200 pb-1 ${
                  isActive
                    ? "text-[#FF7A38] border-b-2 border-[#FF7A38]"
                    : "hover:text-[#FF7A38] hover:scale-105"
                }`
              }
              end={label === "Home"}
            >
              {label}
            </NavLink>
          ))}

          {isLoggedIn && user?.isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `flex items-center gap-1 transition-all duration-200 pb-1 ${
                  isActive
                    ? "text-[#FF7A38] border-b-2 border-[#FF7A38]"
                    : "hover:text-[#FF7A38] hover:scale-105"
                }`
              }
            >
              <Shield size={16} /> Admin
            </NavLink>
          )}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Cart */}
          {isLoggedIn && (
            <Link
              to="/cart"
              className="relative hover:scale-110 transition-transform"
              aria-label={`Shopping cart with ${totals.count} items`}
            >
              <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7 text-[#E94E1B]" />
              {totals.count > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#E94E1B] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse">
                  {totals.count}
                </span>
              )}
            </Link>
          )}

          {/* Desktop User Menu */}
          {isLoggedIn ? (
            <div className="hidden md:flex items-center gap-3">
              <div className="relative z-[999]">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  aria-haspopup="true"
                  aria-expanded={userMenuOpen}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] text-white rounded-full font-semibold hover:shadow-lg transition-all"
                >
                  <User size={18} />
                  <span className="hidden lg:inline">{user?.name || "User"}</span>
                  <ChevronDown
                    size={16}
                    className={`${userMenuOpen ? "rotate-180" : ""} transition-transform`}
                  />
                </button>

                {userMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border-2 border-[#FF7A38] overflow-hidden z-[9999]"
                    role="menu"
                    aria-label="User menu"
                  >
                    <Link
                      to="/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 hover:bg-orange-50 transition"
                      role="menuitem"
                    >
                      <User size={16} /> Profile
                    </Link>

                    {user?.isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 hover:bg-orange-50 transition"
                        role="menuitem"
                      >
                        <Shield size={16} /> Admin Panel
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 transition"
                      role="menuitem"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 border-2 border-[#FF7A38] text-[#FF7A38] rounded-full font-semibold hover:bg-[#FF7A38] hover:text-white transition-all"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] text-white rounded-full font-semibold hover:shadow-lg transition-all"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-[#E94E1B] p-2 hover:bg-orange-50 rounded-lg transition"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <>
          <nav
            id="mobile-menu"
            className="lg:hidden bg-white border-t-2 border-[#FF7A38] px-4 sm:px-6 pb-6 space-y-1 z-50 relative"
            role="menu"
          >
            {Object.entries(routeMap).map(([label, path]) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg font-semibold transition ${
                    isActive
                      ? "bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] text-white"
                      : "hover:bg-orange-50 text-[#333]"
                  }`
                }
                end={label === "Home"}
                role="menuitem"
              >
                {label}
              </NavLink>
            ))}

            {isLoggedIn && (
              <>
                <NavLink
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-orange-50 font-semibold"
                  role="menuitem"
                >
                  <User size={18} /> Profile
                </NavLink>

                {user?.isAdmin && (
                  <NavLink
                    to="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-orange-50 font-semibold"
                    role="menuitem"
                  >
                    <Shield size={18} /> Admin Panel
                  </NavLink>
                )}

                <NavLink
                  to="/cart"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-orange-50 font-semibold"
                  role="menuitem"
                >
                  <ShoppingCart size={18} /> Cart {totals.count > 0 && `(${totals.count})`}
                </NavLink>

                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 mt-2 font-semibold"
                  role="menuitem"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            )}

            {!isLoggedIn && (
              <div className="flex flex-col gap-3 mt-4">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-center px-4 py-3 border-2 border-[#FF7A38] text-[#FF7A38] rounded-full font-semibold hover:bg-[#FF7A38] hover:text-white transition"
                  role="menuitem"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="text-center px-4 py-3 bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] text-white rounded-full font-semibold hover:shadow-lg transition"
                  role="menuitem"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>

          {/* Overlay to close mobile menu on outside click */}
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
        </>
      )}

      {/* Overlay for user dropdown */}
      {userMenuOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} aria-hidden="true" />
      )}
    </header>
  );
}
