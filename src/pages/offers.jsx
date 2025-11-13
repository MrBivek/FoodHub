import React from "react";
import { Link } from "react-router-dom";
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
  },
  {
    id: 2,
    title: "Free Delivery on Sekuwa Combo",
    desc: "Order our delicious Sekuwa combo and get free delivery.",
    img: sekuwaImg,
    discount: "Free Delivery",
  },
  {
    id: 3,
    title: "Buy 1 Get 1 Free - Chowmein",
    desc: "Order any chowmein and get another one absolutely free!",
    img: chowmeinImg,
    discount: "BOGO",
  },
];

export default function Offers() {
  return (
    <section className="bg-gradient-to-br from-orange-50 via-white to-red-50 min-h-screen pb-20 font-sans">
      {/* Hero Banner */}
      <div className="text-center py-24 bg-gradient-to-r from-red-500 to-orange-500 text-white">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Special Offers
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto font-semibold drop-shadow-md">
          Don’t miss out on these delicious deals — grab them while they last!
        </p>
      </div>

      {/* Offers Grid */}
      <div className="max-w-7xl mx-auto px-6 mt-16 grid sm:grid-cols-1 md:grid-cols-3 gap-12">
        {offers.map(({ id, title, desc, img, discount }) => (
          <div
            key={id}
            className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-red-400 transition transform hover:-translate-y-1 cursor-pointer"
          >
            <div className="relative">
              <img
                src={img}
                alt={title}
                className="w-full h-56 object-cover"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-red-500 text-white font-bold px-4 py-2 rounded-full text-sm shadow-lg">
                {discount}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 text-red-600">{title}</h3>
              <p className="text-gray-700 mb-6">{desc}</p>
              <Link
                to="/menu"
                className="block bg-red-600 text-white px-8 py-3 rounded-full font-semibold shadow hover:bg-red-700 transition w-full text-center"
              >
                Order Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
