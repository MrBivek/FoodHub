import { Link } from "react-router-dom";
import { Tag, Truck, Gift, Percent, Clock } from "lucide-react";
import momoImg from "../assets/momo.jpeg";
import sekuwaImg from "../assets/sekwa.jpg";
import chowmeinImg from "../assets/veg chowmine.jpg";

const offers = [
  {
    id: 1,
    title: "20% Off on All Momos",
    desc: "Enjoy 20% discount on all momo orders for a limited time!",
    img: momoImg,
    discount: "20% OFF",
    icon: Percent,
    code: "MOMO20",
    valid: "Valid until Dec 31, 2024",
  },
  {
    id: 2,
    title: "Free Delivery on Sekuwa",
    desc: "Order our delicious Sekuwa combo and get free delivery.",
    img: sekuwaImg,
    discount: "Free Delivery",
    icon: Truck,
    code: "FREESHIP",
    valid: "Valid until Dec 31, 2024",
  },
  {
    id: 3,
    title: "Buy 1 Get 1 Free - Chowmein",
    desc: "Order any chowmein and get another one absolutely free!",
    img: chowmeinImg,
    discount: "BOGO",
    icon: Gift,
    code: "BOGO2024",
    valid: "Valid until Dec 31, 2024",
  },
];

export default function Offers() {
  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Code "${code}" copied to clipboard!`);
  };

  const handleSubscribe = () => {
    alert("Thank you for subscribing! (Subscription functionality coming soon.)");
  };

  return (
    <section className="bg-gradient-to-br from-orange-50 via-white to-red-50 min-h-screen pb-12 sm:pb-20 font-sans">
      {/* Hero Banner */}
      <div className="text-center py-16 sm:py-24 bg-gradient-to-r from-red-500 to-orange-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-48 sm:w-64 h-48 sm:h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-3 sm:mb-4 drop-shadow-2xl">
            🎉 Special Offers
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto font-semibold drop-shadow-lg">
            Don't miss out on these delicious deals — grab them while they last!
          </p>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 sm:mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {offers.map(
            ({ id, title, desc, img, discount, icon: Icon, code, valid }) => (
              <div
                key={id}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2 flex flex-col border-2 border-red-500"
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={img}
                    alt={title}
                    className="w-full h-48 sm:h-64 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold px-4 sm:px-5 py-2 sm:py-3 rounded-full text-xs sm:text-sm shadow-2xl flex items-center gap-2">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    {discount}
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-red-500">
                      {title}
                    </h3>
                    <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                      {desc}
                    </p>

                    <div className="bg-white/80 rounded-lg p-3 sm:p-4 mb-4 border-2 border-dashed border-red-500">
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Use code:</p>
                      <div className="flex items-center justify-between">
                        <code className="text-base sm:text-lg font-bold text-red-500">{code}</code>
                        <button
                          type="button"
                          onClick={() => copyCode(code)}
                          className="text-xs sm:text-sm text-red-500 hover:text-orange-500 font-semibold"
                          aria-label={`Copy promo code ${code}`}
                        >
                          Copy
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-4">
                      <Clock className="w-4 h-4" />
                      <span>{valid}</span>
                    </div>
                  </div>

                  <Link
                    to="/menu"
                    className="block bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition w-full text-center text-sm sm:text-base"
                  >
                    Order Now →
                  </Link>
                </div>
              </div>
            )
          )}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-12 sm:mt-16 bg-white rounded-2xl sm:rounded-3xl shadow-xl border-2 border-red-500 p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-red-500 mb-3 sm:mb-4">
            Want More Deals?
          </h2>
          <p className="text-gray-700 mb-6 sm:mb-8 text-base sm:text-lg max-w-2xl mx-auto">
            Sign up for our newsletter and be the first to know about exclusive
            offers, new menu items, and special promotions!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              name="email"
              aria-label="Email for newsletter subscription"
              placeholder="Enter your email"
              className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-full border-2 border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
            />
            <button
              type="button"
              onClick={handleSubscribe}
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition text-sm sm:text-base"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
