import { Link } from "react-router-dom";
import { Search, Clock, Shield, Truck } from "lucide-react";
import momoImg from "../assets/momo.jpeg";
import chowmeinImg from "../assets/veg chowmine.jpg";
import sekuwaImg from "../assets/sekwa.jpg";
import jimbuImg from "../assets/jimbu.jpg";

export default function Home() {
  const featuredRestaurants = [
    { id: "momo", name: "Momo Delight", img: momoImg },
    { id: "chowmein", name: "Chowmein House", img: chowmeinImg },
    { id: "sekuwa", name: "Sekuwa Corner", img: sekuwaImg },
    { id: "jimbu", name: "Jimbu Kitchen", img: jimbuImg },
  ];

  const categories = [
    { name: "Momo", icon: "🥟" },
    { name: "Pizza", icon: "🍕" },
    { name: "Drinks", icon: "🥤" },
    { name: "Dessert", icon: "🍨" },
    { name: "Biryani", icon: "🍛" },
  ];

  const features = [
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: "Fast Delivery",
      desc: "Get your food delivered in 30 minutes or less"
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Safe & Secure",
      desc: "100% payment protection and hygiene standards"
    },
    {
      icon: <Truck className="w-8 h-8 text-blue-600" />,
      title: "Live Tracking",
      desc: "Track your order in real-time from kitchen to doorstep"
    },
  ];

  return (
    <section className="font-sans">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Delicious Food Delivered to Your Door
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Order from the best restaurants in Nepal. Fresh, fast, and hassle-free.
          </p>

          {/* Search Bar */}
          <div className="flex max-w-2xl mx-auto bg-white rounded-full shadow-lg overflow-hidden">
            <input
              type="text"
              placeholder="Search for restaurants or food..."
              className="flex-1 px-6 py-4 focus:outline-none text-gray-700"
            />
            <button className="bg-blue-600 text-white px-8 py-4 font-medium hover:bg-blue-700 transition flex items-center gap-2">
              <Search className="w-5 h-5" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="text-center">
              <div className="flex justify-center mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((c) => (
              <Link
                key={c.name}
                to={`/menu?category=${c.name.toLowerCase()}`}
                className="bg-white hover:bg-blue-50 transition rounded-xl shadow-sm hover:shadow-md p-6 flex flex-col items-center justify-center text-center"
              >
                <span className="text-4xl mb-2">{c.icon}</span>
                <p className="font-medium text-gray-900">{c.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Restaurants */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Popular Restaurants
          </h2>
          <Link
            to="/menu"
            className="text-blue-600 font-medium hover:underline"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredRestaurants.map((r) => (
            <Link
              key={r.id}
              to="/menu"
              className="rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition"
            >
              <img src={r.img} alt={r.name} className="h-40 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{r.name}</h3>
                <p className="text-sm text-gray-500 mt-1">View Menu</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Order?
          </h2>
          <p className="text-lg mb-8 text-blue-100">
            Explore hundreds of restaurants and thousands of dishes
          </p>
          <Link
            to="/menu"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Browse Menu
          </Link>
        </div>
      </div>

      {/* Floating Order Button */}
      <Link
        to="/menu"
        className="fixed bottom-6 right-6 bg-blue-600 px-6 py-3 rounded-full shadow-xl font-semibold text-white hover:bg-blue-700 transition flex items-center gap-2"
      >
        🍴 Order Now
      </Link>
    </section>
  );
}