import { useState, useEffect } from "react";
import { Star, Search, X, ShoppingBag, Filter, TrendingUp, Award, Clock } from "lucide-react";
import { useCart } from "../context/CartContext";
import API from "../utils/API";

export default function Menu() {
  const { addItem, totals } = useCart();
  const [query, setQuery] = useState("");
  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [addingToCart, setAddingToCart] = useState(null);

  const categories = [
    { name: "All", icon: "🍽️", color: "from-red-500 to-orange-500" },
    { name: "Breakfast", icon: "🍳", color: "from-red-500 to-orange-500" },
    { name: "Lunch", icon: "🍱", color: "from-red-500 to-orange-500" },
    { name: "Dinner", icon: "🍖", color: "from-red-500 to-orange-500" },
    { name: "Drinks", icon: "🥤", color: "from-red-500 to-orange-500" },
    { name: "Snacks", icon: "🍿", color: "from-red-500 to-orange-500" },
    { name: "Other", icon: "🎁", color: "from-red-500 to-orange-500" },
  ];

  useEffect(() => { loadMenu(); }, []);
  useEffect(() => { filterDishes(); }, [query, selectedCategory, dishes]);

  const loadMenu = async () => {
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
        img: item.image || "https://via.placeholder.com/300x200.png?text=Food",
        isAvailable: item.isAvailable ?? true,
        prepTime: item.prepTime || "15-20 min",
      }));

      setDishes(formatted);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load menu");
    } finally { setLoading(false); }
  };

  const filterDishes = () => {
    let filtered = dishes;
    if (selectedCategory !== "All") filtered = filtered.filter(d => d.category === selectedCategory);
    if (query.trim()) filtered = filtered.filter(d => d.name.toLowerCase().includes(query.trim().toLowerCase()));
    setFilteredDishes(filtered);
  };

  const handleAddToCart = (dish) => {
    setAddingToCart(dish.id);
    addItem({ id: dish.id, name: dish.name, price: dish.price, img: dish.img });
    setTimeout(() => setAddingToCart(null), 800);
  };

  const getCategoryData = (catName) => categories.find(c => c.name === catName) || categories[0];

  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* HERO */}
      <div className="relative overflow-hidden bg-gradient-to-r from-red-500 via-orange-500 to-red-500 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl font-black mb-6">Discover Our Menu</h1>
          <p className="text-lg text-white/90 mb-8">
            Handcrafted dishes made with passion and the finest ingredients
          </p>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="search"
              placeholder="Search for your favorite dishes..."
              className="w-full bg-white/95 rounded-2xl py-4 pl-14 pr-14 shadow-xl focus:ring-4 focus:ring-white/50 text-gray-800"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && <button onClick={() => setQuery("")} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"><X /></button>}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* CATEGORY PILLS */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Filter className="text-red-500" /> Categories
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
          {categories.map(cat => {
            const isActive = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-8 py-4 rounded-2xl font-bold transition-all shadow-md min-w-[140px] ${
                  isActive ? `bg-gradient-to-r ${cat.color} text-white scale-105 shadow-lg` : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="flex flex-col items-center">
                  <span className="text-3xl">{cat.icon}</span>
                  {cat.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* FLOATING CART */}
        {totals.count > 0 && (
          <a href="/cart" className="fixed bottom-6 right-6 z-50 group">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-4 rounded-full shadow-xl flex items-center gap-3 hover:scale-110 transition">
              <ShoppingBag />
              <span className="font-bold">Rs {totals.amount.toFixed(2)}</span>
            </div>
          </a>
        )}

        {/* MENU GRID */}
        {!loading && !error && filteredDishes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {filteredDishes.map(dish => {
              const catData = getCategoryData(dish.category);
              return (
                <div key={dish.id} className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition border border-gray-100 hover:border-red-500 hover:-translate-y-2">
                  <div className="relative">
                    <img src={dish.img} alt={dish.name} className="w-full h-48 object-cover rounded-t-3xl group-hover:scale-110 transition-transform duration-500"/>
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {dish.badge && <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1"><Award className="w-3 h-3" />{dish.badge}</span>}
                      <span className={`bg-gradient-to-r ${catData.color} text-white px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1`}>{catData.icon} {dish.category}</span>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-white px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400"/>
                      <span className="font-bold text-gray-800 text-sm">{dish.rating}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-xl text-gray-800 mb-2">{dish.name}</h3>
                    {dish.description && <p className="text-gray-600 text-sm line-clamp-2 mb-3">{dish.description}</p>}
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-4"><Clock className="w-4 h-4"/> {dish.prepTime}</div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-xs text-gray-500">Price</div>
                        <div className="text-2xl font-black text-red-500">Rs {dish.price.toFixed(2)}</div>
                      </div>
                      <button
                        onClick={() => handleAddToCart(dish)}
                        disabled={!dish.isAvailable || addingToCart === dish.id}
                        className={`px-6 py-3 rounded-xl font-bold transition-all ${
                          addingToCart === dish.id ? "bg-green-500 text-white" : "bg-gradient-to-r from-red-500 to-orange-500 text-white hover:scale-105"
                        }`}
                      >
                        {addingToCart === dish.id ? "✓ Added" : "Add"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* INFO */}
        {!loading && !error && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg border">
              <TrendingUp className="text-red-500"/>
              <span className="text-gray-700 font-semibold">Showing {filteredDishes.length} of {dishes.length} dishes</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
