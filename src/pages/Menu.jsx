import { useState, useEffect } from "react";
import { Star, Search, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import API from "../utils/API";

// Local fallbacks (only used if backend gives filename instead of URL)
import pizzaImg from "../assets/pizza.jpg";
import burgerImg from "../assets/burger.jpg";

const filenameFallbacks = {
  "pizza.jpg": pizzaImg,
  "burger.jpg": burgerImg,
};

export default function Menu() {
  const { addItem } = useCart();
  const [query, setQuery] = useState("");
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  const getImgUrl = (dish) => {
    const img = dish?.img;

    if (!img) return "/fallback.png";

    if (img.startsWith("http")) return img;

    if (filenameFallbacks[img]) return filenameFallbacks[img];

    return "/fallback.png";
  };

  useEffect(() => {
    async function loadMenu() {
      try {
        const res = await API.get("/foods");

        const formatted = res.data.map((item) => ({
          id: item._id,
          name: item.name,
          price: item.price,
          rating: item.rating ?? 4.5,
          badge: item.badge ?? null,
          img: item.image,
        }));

        setDishes(formatted);
      } catch (err) {
        console.error("Menu load error:", err);
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
    <section className="min-h-screen bg-[#FFF7F3]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-center text-4xl font-bold mb-8">Menu</h1>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative mb-12">
          <Search className="absolute left-5 top-3 text-gray-400" />
          <input
            type="search"
            placeholder="Search dishes..."
            className="w-full border rounded-full py-3 pl-14 pr-10 shadow-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <X
              className="absolute right-4 top-3 cursor-pointer"
              onClick={() => setQuery("")}
            />
          )}
        </div>

        {loading && <p className="text-center">Loading...</p>}

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filtered.map((dish) => (
            <div
              key={dish.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4"
            >
              <img
                src={getImgUrl(dish)}
                alt={dish.name}
                className="w-full h-48 object-cover rounded-xl"
              />

              <h3 className="font-semibold mt-4 text-lg">{dish.name}</h3>

              <div className="flex items-center text-yellow-500 text-sm mt-1">
                <Star size={16} />
                <span className="ml-1">{dish.rating}</span>
              </div>

              <p className="text-orange-600 font-bold text-lg mt-1">
                Rs {dish.price}
              </p>

              <button
                className="w-full mt-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full"
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
