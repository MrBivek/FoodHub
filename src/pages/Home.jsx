// ============================================
// COMPLETE ENHANCED PAGES COLLECTION
// Copy each section to its respective file
// ============================================

// ============================================
// 1. Home.jsx - ENHANCED & FULLY RESPONSIVE
// ============================================
import { Link } from "react-router-dom";
import { Clock, Shield, Truck, ChevronRight, Star } from "lucide-react";
import momoImg from "../assets/momo.jpeg";
import chowmeinImg from "../assets/veg chowmine.jpg";
import sekuwaImg from "../assets/sekwa.jpg";
import burgerImg from "../assets/burger.jpg";
import pizzaImg from "../assets/pizza.jpg";
import friesImg from "../assets/fries.jpg";

export default function Home() {
  const featuredDishes = [
    { name: "Steamed Momo", img: momoImg, price: "299", category: "Nepali", rating: 4.8 },
    { name: "Chicken Pizza", img: pizzaImg, price: "499", category: "Italian", rating: 4.9 },
    { name: "Sekuwa Set", img: sekuwaImg, price: "399", category: "Nepali", rating: 4.7 },
    { name: "Classic Burger", img: burgerImg, price: "349", category: "American", rating: 4.6 },
    { name: "Veg Chowmein", img: chowmeinImg, price: "249", category: "Asian", rating: 4.5 },
    { name: "French Fries", img: friesImg, price: "149", category: "Sides", rating: 4.3 },
  ];

  const categories = [
    { name: "Nepali Cuisine", img: momoImg, color: "from-orange-400 to-red-500", count: "15+ items" },
    { name: "Fast Food", img: burgerImg, color: "from-yellow-400 to-orange-500", count: "20+ items" },
    { name: "Pizza & Pasta", img: pizzaImg, color: "from-red-400 to-pink-500", count: "10+ items" },
  ];

  const features = [
    { icon: <Clock className="w-6 h-6" />, title: "Fast Delivery", desc: "Order delivered within 30 minutes" },
    { icon: <Shield className="w-6 h-6" />, title: "Fresh Food", desc: "Hot & fresh guaranteed" },
    { icon: <Truck className="w-6 h-6" />, title: "Free Delivery", desc: "No delivery charges" },
  ];

  return (
    <section className="font-sans bg-gradient-to-br from-orange-50 via-white to-red-50 min-h-screen">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4 sm:mb-6">
              All <span className="text-red-500">Fast Food</span> at{" "}
              <span className="text-red-500">Foodhub</span>
            </h1>
            <div className="flex items-center gap-3 mb-6 sm:mb-8 justify-center md:justify-start">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span role="img" aria-label="chef" className="text-xl sm:text-2xl">👨‍🍳</span>
              </div>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                Delicious food just a click away
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <Link
                to="/menu"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-6 py-3 rounded-full font-bold hover:shadow-xl transition flex items-center justify-center gap-2"
              >
                Order Now
                <ChevronRight className="w-5 h-5" />
              </Link>
              <button
                className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-50 transition"
                onClick={() => alert("Browse our menu and add items to cart!")}
              >
                How To Order
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative order-first md:order-last">
            <div className="relative z-10 mx-auto max-w-[280px] sm:max-w-xs md:max-w-md">
              <img
                src={burgerImg}
                alt="Featured Burger"
                className="w-full drop-shadow-2xl rounded-full transform hover:scale-105 transition duration-500"
                loading="eager"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full blur-3xl opacity-50"></div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {features.map((f, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-3 sm:p-4 rounded-2xl flex-shrink-0">
                <div className="text-orange-600">{f.icon}</div>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{f.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4">
            Best <span className="text-red-500">Delivered</span> Categories
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Explore our best categories and order your favorites
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat, i) => (
            <Link
              to="/menu"
              key={i}
              className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-90`}></div>
              <div className="relative p-6 sm:p-8 text-center">
                <div className="bg-white rounded-full w-28 h-28 sm:w-36 sm:h-36 mx-auto mb-4 sm:mb-6 p-3 sm:p-4 shadow-xl overflow-hidden">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-full"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{cat.name}</h3>
                <p className="text-white/90 text-sm mb-3">{cat.count}</p>
                <button className="text-white underline font-semibold hover:text-yellow-200 transition">
                  Order Now →
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Menu Preview */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
              Our <span className="text-red-500">Popular</span> Menu
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
              Choose from our most loved dishes
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {featuredDishes.map((dish) => (
              <div
                key={dish.name}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-2"
              >
                <div className="relative">
                  <div className="w-20 h-20 sm:w-28 sm:h-28 mx-auto mt-3 sm:mt-4 rounded-full overflow-hidden ring-2 sm:ring-4 ring-orange-100 group-hover:ring-orange-300 transition">
                    <img
                      src={dish.img}
                      alt={dish.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="p-3 sm:p-4 text-center">
                  <h3 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">{dish.name}</h3>
                  <div className="flex items-center justify-center gap-1 mb-1 sm:mb-2">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs sm:text-sm text-gray-600">{dish.rating}</span>
                  </div>
                  <p className="text-lg sm:text-xl font-bold text-orange-600 mb-2 sm:mb-3">Rs {dish.price}</p>
                  <Link
                    to="/menu"
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold hover:shadow-lg transition inline-block w-full"
                  >
                    Order
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-10">
            <Link
              to="/menu"
              className="inline-block border-2 border-red-500 text-red-500 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-bold hover:bg-red-500 hover:text-white transition text-sm sm:text-base"
            >
              See Full Menu →
            </Link>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4">
            Hungry? We've Got You Covered! 🍔
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-orange-100 mb-6 sm:mb-8">
            Order your favorite dishes now and enjoy fast, free delivery
          </p>
          <Link
            to="/menu"
            className="inline-block bg-white text-red-500 px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 rounded-full font-bold text-sm sm:text-base md:text-lg hover:shadow-2xl transition transform hover:scale-105"
          >
            Browse Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
}