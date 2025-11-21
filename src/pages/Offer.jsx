// frontend/src/pages/Offer.jsx
import { Link } from "react-router-dom";
import { Tag, Truck, Gift } from "lucide-react";
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
    icon: Tag,
  },
  {
    id: 2,
    title: "Free Delivery on Sekuwa",
    desc: "Order our delicious Sekuwa combo and get free delivery.",
    img: sekuwaImg,
    discount: "Free Delivery",
    icon: Truck,
  },
  {
    id: 3,
    title: "Buy 1 Get 1 Free - Chowmein",
    desc: "Order any chowmein and get another one absolutely free!",
    img: chowmeinImg,
    discount: "BOGO",
    icon: Gift,
  },
];

export default function Offers() {
  return (
    <section className="bg-gradient-to-br from-[#FFF1EB] via-[#FFE9E3] to-[#FFD6C2] min-h-screen pb-20 font-sans">
      {/* Hero Banner */}
      <div className="text-center py-24 bg-gradient-to-r from-[#E94E1B] to-[#FF7A38] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-2xl">
            🎉 Special Offers
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto font-semibold drop-shadow-lg px-6">
            Don't miss out on these delicious deals — grab them while they last!
          </p>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map(({ id, title, desc, img, discount, icon: Icon }) => (
            <div
              key={id}
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer flex flex-col border-2 border-[#FF7A38]"
            >
              <div className="relative flex-shrink-0">
                <img
                  src={img}
                  alt={title}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-gradient-to-r from-[#E94E1B] to-[#FF7A38] text-white font-bold px-5 py-3 rounded-full text-sm shadow-2xl flex items-center gap-2">
                  <Icon className="w-5 h-5" />
                  {discount}
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-[#E94E1B]">{title}</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">{desc}</p>
                </div>
                <Link
                  to="/menu"
                  className="block bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition w-full text-center"
                >
                  Order Now →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-white rounded-3xl shadow-xl border-2 border-[#FF7A38] p-12 text-center">
          <h2 className="text-3xl font-bold text-[#E94E1B] mb-4">
            Want More Deals?
          </h2>
          <p className="text-gray-700 mb-8 text-lg max-w-2xl mx-auto">
            Sign up for our newsletter and be the first to know about exclusive offers, new menu items, and special promotions!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full border-2 border-[#FF7A38] focus:outline-none focus:ring-2 focus:ring-[#FF7A38]"
            />
            <button className="bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}