import axios from "axios";
import { useState, useEffect } from "react";
import { Star, Search, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import API from "../utils/API";

/* local images imports... (keep yours) */

const localImageMap = { /* keep your mapping */ };

export default function Menu() {
  const { addItem } = useCart();
  const [query, setQuery] = useState("");
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    async function loadMenu() {
      try {
        setLoading(true);

        const res = await API.get("/foods");
        const data = res.data.map(item => ({
          id: item._id,
          name: item.name,
          price: item.price,
          rating: item.rating ?? 4.5,
          badge: item.badge ?? null,
          img: item.image ?? null,
        }));

        setDishes(data);
      } catch (e) {
        console.error(e);
        setErr("Failed to load menu. Using defaults.");

        const fallback = Object.keys(localImageMap).map((name, i) => ({
          id: i + 1,
          name,
          price: 150 + i * 40,
          rating: 4.5,
          img: null,
        }));

        setDishes(fallback);
      } finally {
        setLoading(false);
      }
    }

    loadMenu();
  }, []);

  const filtered = dishes.filter((d) =>
    d.name.toLowerCase().includes(query.toLowerCase())
  );

  const getImgUrl = (dish) => {
    if (dish.img?.startsWith("http")) return dish.img;
    if (dish.img) return `/uploads/${dish.img}`;
    return localImageMap[dish.name];
  };

  return (
    <section className="min-h-screen bg-[#FFF7F3]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-center text-4xl font-bold mb-4">Menu</h1>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative mb-10">
          <Search className="absolute left-5 top-3 text-gray-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dishes..."
            className="w-full border rounded-full py-3 pl-14 pr-10"
          />
          {query && (
            <X
              onClick={() => setQuery("")}
              className="absolute right-4 top-3 cursor-pointer"
            />
          )}
        </div>

        {loading && <p className="text-center">Loading...</p>}
        {err && <p className="text-center text-red-500">{err}</p>}

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filtered.map((dish) => (
            <div key={dish.id} className="bg-white rounded-xl p-4 shadow">
              <img src={getImgUrl(dish)} className="w-full h-32 object-cover rounded-xl" />
              <h3 className="font-bold mt-3">{dish.name}</h3>

              <div className="flex items-center text-yellow-500 text-sm">
                <Star size={16} />
                <span className="ml-1">{dish.rating}</span>
              </div>

              <p className="text-orange-600 font-bold text-lg">Rs {dish.price}</p>

              <button
                className="w-full mt-3 py-2 bg-orange-500 text-white rounded-full"
                onClick={() =>
                  addItem({
                    id: dish.id,
                    name: dish.name,
                    price: dish.price,
                    img: getImgUrl(dish),
                  })
                }
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
