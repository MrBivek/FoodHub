import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-gray-900 mt-12 relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

      <div className="relative container mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-12 z-10">
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-extrabold mb-3 bg-gradient-to-r from-yellow-900 to-yellow-700 bg-clip-text text-transparent">
            🍕 FoodHub
          </h2>
          <p className="text-sm leading-relaxed text-gray-800/90 max-w-xs">
            Delivering authentic Nepali flavors and global cuisines straight to
            your door. Fresh, fast, and delightful.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-800/90">
            {[
              { label: "Home", path: "/" },
              { label: "Menu", path: "/menu" },
              { label: "Cart", path: "/cart" },
              { label: "About Us", path: "/about" },
            ].map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="hover:text-gray-900 hover:underline transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <div className="space-y-3 text-sm text-gray-800/90">
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Kathmandu, Nepal
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> +977 9812345678
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> support@foodhub.com
            </p>
          </div>

          {/* Socials */}
          <div className="flex gap-4 mt-5">
            {[
              { icon: Facebook, title: "Facebook" },
              { icon: Twitter, title: "Twitter" },
              { icon: Instagram, title: "Instagram" },
            ].map(({ icon: Icon, title }) => (
              <a
                key={title}
                href="#"
                className="p-2 bg-white/90 rounded-full shadow-md hover:scale-110 hover:shadow-yellow-300/50 transition"
                title={title}
              >
                <Icon className="w-5 h-5 text-yellow-700" />
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
          <p className="text-sm text-gray-800/90 mb-4">
            Subscribe to get special offers and new updates.
          </p>
          <form className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full border border-yellow-700 bg-white/90 
              focus:outline-none focus:ring-2 focus:ring-yellow-700 placeholder-gray-500"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-yellow-700 text-white font-semibold rounded-full shadow hover:bg-yellow-800 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative bg-yellow-700/90 text-center py-4 text-gray-100 text-sm border-t border-yellow-800 z-10">
        &copy; {new Date().getFullYear()} FoodHub. All rights reserved.
      </div>
    </footer>
  );
}
