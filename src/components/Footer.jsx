// components/Footer.jsx
import { useState } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowUp,
} from "lucide-react";
import { Link } from "react-router-dom";

const routes = {
  Home: "/",
  Offer: "/offer",
  Menu: "/menu",
  "About Us": "/about",
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSubscribed(true);

    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 2500);
  };

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-gradient-to-br from-[#FFE9E3] via-[#FFD7C0] to-[#FFE9E3] text-[#333] mt-16">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h2 className="text-3xl font-bold text-[#E94E1B] mb-3 flex items-center gap-2">
              <span className="text-4xl">🍔</span>
              Foodhub
            </h2>

            <p className="text-sm sm:text-base text-[#666] leading-relaxed mb-4">
              Bringing the best fast food right to your doorstep with love and care.
            </p>

            <div className="flex gap-3">
              {[
                { Icon: Facebook, url: "https://facebook.com" },
                { Icon: Twitter, url: "https://twitter.com" },
                { Icon: Instagram, url: "https://instagram.com" },
              ].map(({ Icon, url }, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={url}
                  className="p-3 bg-white rounded-xl shadow-md transition-all hover:bg-gradient-to-r hover:from-[#FF7A38] hover:to-[#E94E1B] hover:text-white hover:shadow-lg hover:scale-110"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="section-title">Quick Links</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              {Object.entries(routes).map(([label, link]) => (
                <li key={label}>
                  <Link
                    to={link}
                    className="hover:text-[#FF7A38] transition-colors inline-block hover:translate-x-1"
                  >
                    → {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="section-title">Contact Us</h3>

            <div className="space-y-3 text-sm text-[#666] sm:text-base">
              <a
                href="https://maps.google.com/?q=Kathmandu,Nepal"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <MapPin className="contact-icon" />
                Kathmandu, Nepal
              </a>

              <a href="tel:+9779812345678" className="contact-link">
                <Phone className="contact-icon" />
                +977 9812345678
              </a>

              <a href="mailto:support@foodhub.com" className="contact-link">
                <Mail className="contact-icon" />
                support@foodhub.com
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="section-title">Stay Updated</h3>
            <p className="text-sm sm:text-base text-[#666] mb-4">
              Subscribe for exclusive offers and latest updates.
            </p>

            {subscribed ? (
              <div className="bg-green-100 border-2 border-green-400 text-green-700 px-4 py-3 rounded-lg text-center font-semibold animate-bounce">
                ✓ Subscribed!
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-2"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 px-4 py-2.5 rounded-lg border-2 border-[#FF7A38] focus:ring-2 focus:ring-[#FF7A38] text-[#333] text-sm outline-none"
                />

                <button
                  type="submit"
                  className="subscribe-btn flex items-center gap-1 bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition"
                >
                  <Send size={16} />
                  <span className="hidden sm:inline">Subscribe</span>
                  <span className="sm:hidden">Subscribe</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#FFD7C0] border-t-2 border-[#FF7A38]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
          
          <p className="text-[#E94E1B] font-semibold text-xs sm:text-sm">
            © {new Date().getFullYear()} Foodhub. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-xs sm:text-sm text-[#E94E1B]">
            <Link to="/about" className="hover:text-[#FF7A38]">Privacy Policy</Link>
            <span>•</span>
            <Link to="/about" className="hover:text-[#FF7A38]">Terms</Link>
          </div>

          <button onClick={scrollToTop} className="back-top-btn flex items-center gap-1 text-[#E94E1B] hover:text-[#FF7A38] transition">
            <span className="hidden sm:inline">Back to Top</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
