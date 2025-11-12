import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Star, Search, ShoppingBag } from "lucide-react";

// Existing imports
import momoImg from "../assets/momo.jpeg";
import chowmeinImg from "../assets/veg chowmine.jpg";
import sekuwaImg from "../assets/sekwa.jpg";
import jimbuImg from "../assets/jimbu.jpg";
import burgerImg from "../assets/burger.jpg";
import friesImg from "../assets/fries.jpg";
import pizzaImg from "../assets/pizza.jpg";
import wingsImg from "../assets/wings.jpg";

// New imports
import cornDogImg from "../assets/corn dog.jpg";
import grillChickenImg from "../assets/Grill Chicken.jpg";
import sandwichImg from "../assets/Sandwitch.jpg";
import pastaImg from "../assets/pasta.png";

export default function Menu() {
  const { addItem } = useCart();
  const [query, setQuery] = useState("");

  const dishes = [
    { id: "momo", name: "Momo", img: momoImg, price: 299, rating: 4.8, description: "Steamed dumplings with spiced filling & chutney", badge: "Best Seller" },
    { id: "sekuwa", name: "Chicken Sekuwa", img: sekuwaImg, price: 399, rating: 4.9, description: "Grilled chicken skewers with Nepali spices", badge: "Hot" },
    { id: "jimbu", name: "Thakali (Jimbu Rice)", img: jimbuImg, price: 349, rating: 4.6, description: "Aromatic rice with Himalayan herbs" },
    { id: "chowmein", name: "Veg Chowmein", img: chowmeinImg, price: 249, rating: 4.7, description: "Stir-fried noodles with fresh vegetables" },
    { id: "burger", name: "Classic Burger", img: burgerImg, price: 349, rating: 4.5, description: "Juicy patty with lettuce, tomato & cheese", badge: "New" },
    { id: "pizza", name: "Chicken Pizza", img: pizzaImg, price: 499, rating: 4.6, description: "Mozzarella, tomato sauce & basil" },
    { id: "fries", name: "French Fries", img: friesImg, price: 149, rating: 4.4, description: "Golden crispy fries with sea salt" },
    { id: "wings", name: "Buffalo Wings", img: wingsImg, price: 399, rating: 4.7, description: "Spicy wings with ranch dip" },
    { id: "corndog", name: "Corn Dog", img: cornDogImg, price: 199, rating: 4.3, description: "Crispy cornmeal-battered hotdog on a stick" },
    { id: "grillchicken", name: "Grill Chicken", img: grillChickenImg, price: 459, rating: 4.8, description: "Tender grilled chicken with smoky flavor", badge: "Chef's Special" },
    { id: "sandwich", name: "Club Sandwich", img: sandwichImg, price: 279, rating: 4.5, description: "Layered bread, veggies & chicken filling" },
    { id: "pasta", name: "Creamy Pasta", img: pastaImg, price: 329, rating: 4.6, description: "Pasta tossed in creamy white sauce" },
  ];

  const filtered = dishes.filter((d) =>
    d.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="bg-gradient-to-br from-yellow-50 via-white to-yellow-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Header Section */}
        <div className="text-center mb-14">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent drop-shadow-sm">
            Explore Our Delicious Menu 🍴
          </h1>
          <p className="text-gray-700 mt-4 text-lg">
            Freshly prepared dishes made with love — add your favorites to the cart!
          </p>

          {/* Search Bar */}
          <div className="mt-8 flex justify-center">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-4 top-3 text-gray-400" size={20} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for momo, pizza, fries..."
                className="w-full pl-11 pr-5 py-3.5 rounded-full border border-yellow-300 shadow-sm focus:ring-4 focus:ring-yellow-400/50 focus:border-yellow-500 outline-none transition-all text-gray-800"
              />
            </div>
          </div>
        </div>

        {/* Dish Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtered.map((dish) => (
            <div
              key={dish.id}
              className="group bg-white rounded-2xl shadow-lg border border-yellow-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={dish.img}
                  alt={dish.name}
                  className="w-full h-52 object-cover transform group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                {dish.badge && (
                  <span className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {dish.badge}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-yellow-600 transition">
                    {dish.name}
                  </h3>
                  <span className="text-lg font-bold text-yellow-600">
                    Rs {dish.price}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-3">{dish.description}</p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < Math.floor(dish.rating)
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }
                    />
                  ))}
                  <span className="text-sm text-gray-500 ml-1">{dish.rating.toFixed(1)}</span>
                </div>

                {/* Buttons */}
                <div className="mt-auto flex gap-3">
                  <button
                    onClick={() => alert(`Viewing details of ${dish.name}`)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-full hover:bg-gray-200 transition text-sm font-medium"
                  >
                    View
                  </button>
                  <button
                    onClick={() => addItem(dish)}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 py-2.5 rounded-full hover:from-yellow-500 hover:to-yellow-600 transition font-semibold shadow text-sm"
                  >
                    <ShoppingBag size={16} />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16">
              <p className="text-gray-500 text-lg">
                No dishes found matching your search. Try something else 🍽️
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
