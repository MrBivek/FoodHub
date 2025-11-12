import { useState } from "react";
import { Star, Search, X } from "lucide-react";
import { useCart } from "../context/CartContext";

import momoImg from "../assets/momo.jpeg";
import chowmeinImg from "../assets/veg chowmine.jpg";
import sekuwaImg from "../assets/sekwa.jpg";
import jimbuImg from "../assets/jimbu.jpg";
import burgerImg from "../assets/burger.jpg";
import friesImg from "../assets/fries.jpg";
import pizzaImg from "../assets/pizza.jpg";
import wingsImg from "../assets/wings.jpg";
import cornDogImg from "../assets/corn dog.jpg";
import grillChickenImg from "../assets/Grill Chicken.jpg";
import sandwichImg from "../assets/Sandwitch.jpg";
import pastaImg from "../assets/pasta.png";

export default function Menu() {
  const [query, setQuery] = useState("");
  const { addItem } = useCart(); // use cart context's addItem

  const dishes = [
    { id: 1, name: "Momo", img: momoImg, price: 299, rating: 4.8, badge: "Best Seller", color: "from-red-400 to-red-600" },
    { id: 2, name: "Chicken Sekuwa", img: sekuwaImg, price: 399, rating: 4.9, badge: "Hot", color: "from-orange-400 to-orange-600" },
    { id: 3, name: "Thakali Set", img: jimbuImg, price: 349, rating: 4.6, color: "from-yellow-400 to-yellow-600" },
    { id: 4, name: "Veg Chowmein", img: chowmeinImg, price: 249, rating: 4.7, color: "from-green-400 to-green-600" },
    { id: 5, name: "Classic Burger", img: burgerImg, price: 349, rating: 4.5, badge: "New", color: "from-amber-400 to-amber-600" },
    { id: 6, name: "Chicken Pizza", img: pizzaImg, price: 499, rating: 4.6, color: "from-red-400 to-pink-600" },
    { id: 7, name: "French Fries", img: friesImg, price: 149, rating: 4.4, color: "from-yellow-500 to-orange-500" },
    { id: 8, name: "Buffalo Wings", img: wingsImg, price: 399, rating: 4.7, color: "from-red-500 to-orange-500" },
    { id: 9, name: "Corn Dog", img: cornDogImg, price: 199, rating: 4.3, color: "from-yellow-400 to-red-500" },
    { id: 10, name: "Grill Chicken", img: grillChickenImg, price: 459, rating: 4.8, badge: "Chef's Special", color: "from-orange-500 to-red-500" },
    { id: 11, name: "Club Sandwich", img: sandwichImg, price: 279, rating: 4.5, color: "from-green-400 to-teal-500" },
    { id: 12, name: "Creamy Pasta", img: pastaImg, price: 329, rating: 4.6, color: "from-yellow-300 to-orange-400" },
  ];

  const filtered = dishes.filter((d) =>
    d.name.toLowerCase().includes(query.toLowerCase())
  );

  const clearSearch = () => setQuery("");

  return (
    <section className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Our <span className="text-red-500">Regular</span> Menu
          </h1>
          <p className="text-gray-700 text-lg mb-8">
            These Are Our Regular Menus. You Can Order Anything You Like
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <label htmlFor="search" className="sr-only">Search Dishes</label>
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
              aria-hidden="true"
            />
            <input
              id="search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for momo, pizza, burger..."
              className="w-full pl-14 pr-10 py-4 rounded-full border-2 border-orange-200 shadow-md focus:ring-4 focus:ring-orange-300 focus:border-orange-400 outline-none transition-all text-gray-800 bg-white"
              aria-label="Search menu items"
            />
            {query && (
              <button
                onClick={clearSearch}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500 transition"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {filtered.length > 0 ? (
            filtered.map((dish) => (
              <div
                key={dish.id}
                className="group relative bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2"
                tabIndex={0}
                aria-label={`${dish.name}, price Rs ${dish.price}`}
              >
                {/* Badge */}
                {dish.badge && (
                  <div className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-bl-2xl rounded-tr-2xl shadow-lg z-10 select-none">
                    {dish.badge}
                  </div>
                )}

                {/* Image Circle */}
                <div className="pt-6 pb-2 flex justify-center">
                  <div
                    className={`w-28 h-28 rounded-full ring-4 ring-orange-100 group-hover:ring-orange-300 transition shadow-lg overflow-hidden flex items-center justify-center transform group-hover:scale-110 duration-300`}
                  >
                    <img
                      src={dish.img}
                      alt={dish.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Dish Info */}
                <div className="px-4 pb-4 text-center">
                  <h3 className="font-bold text-gray-900 mb-1 text-lg">{dish.name}</h3>

                  {/* Rating */}
                  <div className="flex justify-center items-center mb-2">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-600">{dish.rating.toFixed(1)}</span>
                  </div>

                  <p className="text-orange-600 font-semibold text-xl mb-4">Rs. {dish.price}</p>

                  <button
                    onClick={() => addItem({ ...dish, quantity: 1 })}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition w-full"
                    aria-label={`Add ${dish.name} to cart`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 text-lg">
              No dishes match your search.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
