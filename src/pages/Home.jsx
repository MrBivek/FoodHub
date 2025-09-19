import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Search } from "lucide-react";
import momoImg from "../assets/momo.jpeg";
import chowmeinImg from "../assets/veg chowmine.jpg";
import sekuwaImg from "../assets/sekwa.jpg";
import jimbuImg from "../assets/jimbu.jpg";

export default function Home() {
  const { addItem } = useCart();

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

  const testimonials = [
    {
      name: "Sita Sharma",
      text: "FoodHub is a lifesaver! Fresh momo delivered hot in 20 minutes!",
      rating: 5,
    },
    {
      name: "Rajesh Singh",
      text: "Best way to order Nepali food online. Reliable and fast!",
      rating: 4,
    },
    {
      name: "Anjali Thapa",
      text: "Amazing choices and smooth ordering experience. Highly recommend!",
      rating: 5,
    },
  ];

  const faqs = [
    {
      q: "How does FoodHub work?",
      a: "Simply browse restaurants, choose your meal, place an order, and enjoy fast delivery.",
    },
    {
      q: "What areas do you deliver to?",
      a: "Currently serving major cities in Nepal including Kathmandu, Pokhara, and more.",
    },
    {
      q: "Can I track my order?",
      a: "Yes, you can track your order in real time once it’s placed.",
    },
  ];

  return (
    <section className="font-sans">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 py-32 text-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
        <h1 className="relative text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight z-10">
          Order food from the best restaurants in Nepal
        </h1>
        <p className="relative text-lg text-gray-800 mb-10 max-w-2xl mx-auto z-10">
          Fresh, fast, and authentic Nepali food delivered to your doorstep.
        </p>
        <div className="relative flex justify-center max-w-2xl mx-auto shadow-xl rounded-full overflow-hidden z-10">
          <input
            type="text"
            placeholder="Search restaurants or cuisines..."
            className="w-full px-6 py-4 rounded-l-full focus:outline-none"
          />
          <button className="px-6 bg-yellow-700 text-white flex items-center gap-2 font-semibold rounded-r-full hover:bg-yellow-800 transition">
            <Search className="w-5 h-5" /> Search
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {categories.map((c) => (
              <div
                key={c.name}
                className="flex flex-col items-center justify-center bg-yellow-50 p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition"
              >
                <span className="text-5xl mb-2">{c.icon}</span>
                <p className="text-lg font-semibold">{c.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 py-16">
        <div className="container mx-auto px-6">
          <div className="rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 shadow-lg bg-white/70 backdrop-blur-md">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Wider Range, Bigger Choices
              </h2>
              <p className="text-gray-700">
                Explore a variety of Nepali and international cuisines at your fingertips.
              </p>
            </div>
            <Link
              to="/menu"
              className="px-8 py-3 bg-yellow-500 text-gray-900 font-bold rounded-full shadow-md hover:bg-yellow-600 transition"
            >
              Order Now
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Restaurants */}
      <div className="container mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          Featured Restaurants
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {featuredRestaurants.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition transform overflow-hidden"
            >
              <img src={r.img} alt={r.name} className="h-48 w-full object-cover" />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{r.name}</h3>
                <Link to="/menu" className="text-yellow-600 font-medium hover:underline">
                  View Menu →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-r from-yellow-100 via-yellow-50 to-yellow-100 py-20">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "10K+", label: "Orders Delivered" },
            { number: "500+", label: "Restaurants" },
            { number: "50K+", label: "Happy Customers" },
            { number: "24/7", label: "Support" },
          ].map((s, i) => (
            <div key={i} className="p-6 rounded-xl bg-white shadow hover:shadow-lg transition">
              <h3 className="text-4xl font-bold text-gray-900">{s.number}</h3>
              <p className="text-gray-600">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-white py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          What Our Customers Say
        </h2>
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-yellow-50 p-8 rounded-2xl shadow hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <p className="text-gray-700 mb-4 italic">“{t.text}”</p>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900">{t.name}</span>
                <span className="flex text-yellow-500">
                  {"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-yellow-50 py-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="container mx-auto px-6 max-w-2xl space-y-6">
          {faqs.map((f, i) => (
            <details
              key={i}
              className="bg-white p-6 rounded-xl shadow group open:shadow-lg transition"
            >
              <summary className="font-semibold text-gray-900 cursor-pointer group-open:text-yellow-600">
                {f.q}
              </summary>
              <p className="mt-3 text-gray-700">{f.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-gray-700 mb-6">
          Get updates on new restaurants, discounts, and special offers!
        </p>
        <div className="flex justify-center max-w-lg mx-auto shadow-md rounded-full overflow-hidden">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-6 py-4 focus:outline-none rounded-l-full"
          />
          <button className="px-8 py-4 bg-yellow-500 text-white font-semibold rounded-r-full hover:bg-yellow-600 transition">
            Subscribe
          </button>
        </div>
      </div>

      {/* Floating CTA */}
      <Link
        to="/menu"
        className="fixed bottom-6 right-6 bg-yellow-500 px-6 py-3 rounded-full shadow-xl font-bold text-white hover:bg-yellow-600 transition animate-bounce"
      >
        🍴 Order Now
      </Link>
    </section>
  );
}
