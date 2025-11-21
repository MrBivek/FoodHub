// frontend/src/pages/Menu.jsx
import { useState, useEffect } from "react";
import { Star, Search, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import API from "../utils/API";

export default function Menu() {
  const { addItem } = useCart();
  const [query, setQuery] = useState("");
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMenu() {
      try {
        setLoading(true);
        setError("");
        const res = await API.get("/foods");

        const formatted = res.data.map((item) => ({
          id: item._id,
          name: item.name,
          description: item.description,
          price: item.price,
          category: item.category,
          rating: item.rating ?? 4.5,
          badge: item.badge ?? null,
          img: item.image || "https://via.placeholder.com/300x200.png?text=Food+Item",
          isAvailable: item.isAvailable ?? true,
        }));

        setDishes(formatted);
      } catch (err) {
        console.error("Menu load error:", err);
        setError(err?.response?.data?.message || "Failed to load menu");
      } finally {
        setLoading(false);
      }
    }

    loadMenu();
  }, []);

  const filtered = dishes.filter((d) =>
    d.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#FFF7F3] via-[#FFE9E3] to-[#FFD6C2]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-center text-5xl font-extrabold text-[#E94E1B] mb-4">
          Our <span className="text-[#FF7A38]">Menu</span>
        </h1>
        <p className="text-center text-gray-700 mb-8 text-lg">
          Explore our delicious selection of dishes
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative mb-12">
          <Search className="absolute left-5 top-3 text-gray-400" />
          <input
            type="search"
            placeholder="Search dishes..."
            className="w-full border border-[#FF7A38] rounded-full py-3 pl-14 pr-10 shadow-md focus:outline-none focus:ring-2 focus:ring-[#FF7A38]"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <X
              className="absolute right-4 top-3 cursor-pointer text-gray-500 hover:text-[#E94E1B]"
              onClick={() => setQuery("")}
            />
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#FF7A38] border-t-transparent"></div>
            <p className="mt-4 text-gray-700">Loading menu...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-md mx-auto bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-700 text-lg">
              {query ? `No dishes found for "${query}"` : "No dishes available"}
            </p>
          </div>
        )}

        {/* Menu Grid */}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filtered.map((dish) => (
              <div
                key={dish.id}
                className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-2 p-5 border border-[#FF7A38]"
              >
                {/* Badge */}
                {dish.badge && (
                  <div className="mb-2">
                    <span className="inline-block bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] text-white text-xs font-bold px-3 py-1 rounded-full">
                      {dish.badge}
                    </span>
                  </div>
                )}

                {/* Image */}
                <div className="relative">
                  <img
                    src={dish.img}
                    alt={dish.name}
                    className="w-full h-48 object-cover rounded-2xl"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x200.png?text=Food+Item";
                    }}
                  />
                  {!dish.isAvailable && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">Unavailable</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <h3 className="font-bold mt-4 text-xl text-[#E94E1B]">{dish.name}</h3>

                {/* Category */}
                {dish.category && (
                  <p className="text-sm text-gray-600 mt-1">{dish.category}</p>
                )}

                {/* Rating */}
                <div className="flex items-center text-yellow-500 text-sm mt-2">
                  <Star size={16} fill="currentColor" />
                  <span className="ml-1 font-semibold">{dish.rating}</span>
                </div>

                {/* Price */}
                <p className="text-[#FF7A38] font-bold text-xl mt-2">
                  Rs {dish.price.toFixed(2)}
                </p>

                {/* Add to Cart Button */}
                <button
                  className={`w-full mt-4 py-3 rounded-full font-bold shadow-md transition ${
                    dish.isAvailable
                      ? "bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] text-white hover:shadow-lg hover:scale-105"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
                  onClick={() => {
                    if (dish.isAvailable) {
                      addItem({
                        id: dish.id,
                        name: dish.name,
                        price: dish.price,
                        img: dish.img,
                      });
                    }
                  }}
                  disabled={!dish.isAvailable}
                >
                  {dish.isAvailable ? "Add to Cart" : "Unavailable"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}