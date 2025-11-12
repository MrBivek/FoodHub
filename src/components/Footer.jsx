import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("Newsletter subscription");
  };

  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">
            🍕 FoodHub
          </h2>
          <p className="text-sm leading-relaxed text-gray-400">
            Delivering authentic Nepali flavors and global cuisines straight to your door. Fresh, fast, and delightful.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-blue-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/menu" className="hover:text-blue-400 transition">
                Menu
              </a>
            </li>
            <li>
              <a href="/cart" className="hover:text-blue-400 transition">
                Cart
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-blue-400 transition">
                About Us
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-400" /> 
              Kathmandu, Nepal
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-400" /> 
              +977 9812345678
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400" /> 
              support@foodhub.com
            </p>
          </div>

          {/* Socials */}
          <div className="flex gap-3 mt-5">
            <button
              className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition"
              title="Facebook"
              onClick={(e) => e.preventDefault()}
            >
              <Facebook className="w-5 h-5" />
            </button>
            <button
              className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition"
              title="Twitter"
              onClick={(e) => e.preventDefault()}
            >
              <Twitter className="w-5 h-5" />
            </button>
            <button
              className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition"
              title="Instagram"
              onClick={(e) => e.preventDefault()}
            >
              <Instagram className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
          <p className="text-sm text-gray-400 mb-4">
            Subscribe to get special offers and updates.
          </p>
          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 text-white placeholder-gray-500"
            />
            <button
              onClick={handleSubscribe}
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 text-center py-4 text-gray-400 text-sm border-t border-gray-800">
        © {new Date().getFullYear()} FoodHub. All rights reserved.
      </div>
    </footer>
  );
}