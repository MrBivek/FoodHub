import { Link } from "react-router-dom";
import { Clock, Shield, Truck, ChevronRight } from "lucide-react";

import momoImg from "../assets/momo.jpeg";
import chowmeinImg from "../assets/veg chowmine.jpg";
import sekuwaImg from "../assets/sekwa.jpg";
import burgerImg from "../assets/burger.jpg";
import pizzaImg from "../assets/pizza.jpg";
import friesImg from "../assets/fries.jpg";

export default function Home() {
  const featuredDishes = [
    { name: "Steamed Momo", img: momoImg, price: "Rs. 299", category: "Nepali" },
    { name: "Chicken Pizza", img: pizzaImg, price: "Rs. 499", category: "Italian" },
    { name: "Sekuwa Set", img: sekuwaImg, price: "Rs. 399", category: "Nepali" },
    { name: "Classic Burger", img: burgerImg, price: "Rs. 349", category: "American" },
    { name: "Veg Chowmein", img: chowmeinImg, price: "Rs. 249", category: "Asian" },
    { name: "French Fries", img: friesImg, price: "Rs. 149", category: "Sides" },
  ];

  const categories = [
    { name: "Nepali Cuisine", img: momoImg, color: "from-orange-400 to-red-500" },
    { name: "Fast Food", img: burgerImg, color: "from-yellow-400 to-orange-500" },
    { name: "Pizza & Pasta", img: pizzaImg, color: "from-red-400 to-pink-500" },
  ];

  const features = [
    { icon: <Clock className="w-6 h-6" />, title: "Fast Delivery", desc: "We Deliver Order Within 30 Minutes" },
    { icon: <Shield className="w-6 h-6" />, title: "Fresh Food", desc: "Your Food Is Delivered Hot & Fresh" },
    { icon: <Truck className="w-6 h-6" />, title: "Free Delivery", desc: "Your Order Delivery Is Completely Free" },
  ];

  return (
    <section className="font-sans bg-gradient-to-br from-orange-50 via-white to-red-50 min-h-screen">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              All <span className="text-red-500">Fast Food</span> is Available at{" "}
              <span className="text-red-500">Foodie</span>
            </h1>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <span role="img" aria-label="chef" className="text-2xl">👨‍🍳</span>
              </div>
              <p className="text-gray-600 text-lg">
                We Are Just A Click Away When You Crave For Delicious Fast Food
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/menu"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-6 py-3 rounded-full font-bold hover:shadow-xl transition flex items-center gap-2"
                aria-label="Go to full menu"
              >
                Buy Now
                <ChevronRight className="w-5 h-5" />
              </Link>
              <button
                className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-50 transition"
                onClick={() => alert("To order, browse the menu and add your favorite items to the cart!")}
                aria-label="How to order"
              >
                How To Order
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative z-10 mx-auto max-w-xs md:max-w-md">
              <img
                src={burgerImg}
                alt="Featured Food"
                className="w-full drop-shadow-2xl rounded-full transform hover:scale-105 transition duration-500"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full blur-3xl opacity-50"></div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-4 rounded-2xl flex-shrink-0">
                <div className="text-orange-600">{f.icon}</div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Best Delivered Categories */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Best <span className="text-red-500">Delivered</span> Categories
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Here Are Some Of Our Best Distributed Categories. If You Want You Can Order From Here
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <Link
              to="/menu"
              key={i}
              className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
              aria-label={`Order from ${cat.name}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-90`}></div>
              <div className="relative p-8 text-center">
                <div className="bg-white rounded-full w-36 h-36 mx-auto mb-6 p-4 shadow-xl overflow-hidden">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{cat.name}</h3>
                <button
                  className="text-white underline font-semibold hover:text-yellow-200 transition"
                  aria-label={`Order now from ${cat.name}`}
                  type="button"
                >
                  Order Now →
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Regular Menu */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
              Our <span className="text-red-500">Regular</span> Menu
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              These Are Our Regular Menus. You Can Order Anything You Like
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {featuredDishes.map((dish) => (
              <div
                key={dish.name}
                className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-2"
                tabIndex={0}
                aria-label={`${dish.name}, category: ${dish.category}, price ${dish.price}`}
              >
                <div className="relative">
                  <div className="w-28 h-28 mx-auto mt-4 rounded-full overflow-hidden ring-4 ring-orange-100 group-hover:ring-orange-300 transition">
                    <img
                      src={dish.img}
                      alt={dish.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                    />
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-gray-900 mb-1">{dish.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{dish.category}</p>
                  <p className="text-xl font-bold text-orange-600 mb-3">{dish.price}</p>
                  <Link
                    to="/menu"
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition inline-block w-full"
                    aria-label={`Order ${dish.name} from menu`}
                  >
                    Order
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/menu"
              className="inline-block border-2 border-red-500 text-red-500 px-8 py-3 rounded-full font-bold hover:bg-red-500 hover:text-white transition"
              aria-label="See full menu"
            >
              See All →
            </Link>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Hungry? We've Got You Covered! 🍔
          </h2>
          <p className="text-lg md:text-xl text-orange-100 mb-8">
            Order your favorite dishes now and enjoy fast, free delivery
          </p>
          <Link
            to="/menu"
            className="inline-block bg-white text-red-500 px-8 md:px-10 py-3 md:py-4 rounded-full font-bold text-lg hover:shadow-2xl transition transform hover:scale-105"
            aria-label="Browse full menu"
          >
            Browse Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
