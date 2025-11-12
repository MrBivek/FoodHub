import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const routeMap = {
  Home: "/",
  Offer: "/offer",  // <-- updated here
  Service: "/service",
  Menu: "/menu",
  "About Us": "/about",
};

export default function Footer() {
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Thanks for subscribing!");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#FFE9E3] text-[#333333] mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-[#E94E1B] mb-3">Foodhub</h2>
          <p className="text-sm text-[#666666] leading-relaxed">
            Bringing the best fast food right to your doorstep.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-[#E94E1B] mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {Object.keys(routeMap).map((item) => (
              <li key={item}>
                <Link to={routeMap[item]} className="hover:text-[#FF7A38] transition">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-[#E94E1B] mb-4">Contact</h3>
          <div className="space-y-3 text-sm text-[#666666]">
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#FF7A38]" /> Kathmandu, Nepal
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#FF7A38]" /> +977 9812345678
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#FF7A38]" /> support@foodhub.com
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-3 mt-5">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white rounded-lg hover:bg-[#FF7A38] transition"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5 text-[#E94A1B]" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white rounded-lg hover:bg-[#FF7A38] transition"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5 text-[#E94A1B]" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white rounded-lg hover:bg-[#FF7A38] transition"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-[#E94A1B]" />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-[#E94E1B] mb-4">Stay Updated</h3>
          <p className="text-sm text-[#666666] mb-4">
            Subscribe for offers and latest updates.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Your email"
              required
              className="px-4 py-2 rounded-lg border border-[#FF7A38] focus:outline-none focus:ring-2 focus:ring-[#FF7A38] text-[#333333]"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#FF7A38] text-white rounded-lg font-semibold hover:bg-[#E94E1B] transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#FFD7C0] text-center py-4 text-[#E94E1B] text-sm font-semibold border-t border-[#FF7A38] flex justify-between items-center max-w-7xl mx-auto px-6">
        <span>© {new Date().getFullYear()} Foodhub. All rights reserved.</span>
        <button
          onClick={scrollToTop}
          className="underline hover:text-[#FF7A38] cursor-pointer"
          aria-label="Back to top"
        >
          Back to Top ↑
        </button>
      </div>
    </footer>
  );
}
