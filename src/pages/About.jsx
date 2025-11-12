import React from "react";
import momoImg from "../assets/momo.jpeg";
import sekuwaImg from "../assets/sekwa.jpg";
import chowmeinImg from "../assets/veg chowmine.jpg";

const stats = [
  { number: "500+", label: "Happy Customers" },
  { number: "25+", label: "Dishes Available" },
  { number: "2+", label: "Years Experience" },
  { number: "20 min", label: "Avg Delivery" },
];

const testimonials = [
  {
    name: "Aarav Shrestha",
    feedback: "Best momo in town! Delivery is super fast, and the food tastes homemade.",
  },
  {
    name: "Sita Khadka",
    feedback: "Loved the chowmein — reminded me of street food in Kathmandu, but cleaner!",
  },
  {
    name: "Ravi Gurung",
    feedback: "Quick delivery, fresh food, and amazing taste. Highly recommend FoodHub Nepal!",
  },
];

const team = [
  { name: "Chef Bivek Dahal", role: "Founder & Head Chef" },
  { name: "Aashika Sharma", role: "Marketing Manager" },
  { name: "Rajesh Thapa", role: "Delivery Head" },
];

const features = [
  {
    icon: (
      <svg
        className="w-10 h-10 text-red-500 mb-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M9.5 13.5L2 21l2.5-7.5L16 3l-6.5 10.5z" />
        <path d="M9.5 13.5L7 21l4-1 1-7" />
      </svg>
    ),
    title: "Fast Delivery",
    desc: "Hot and fresh food at your doorstep in 20 minutes.",
  },
  {
    icon: (
      <svg
        className="w-10 h-10 text-red-500 mb-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M4 16v-1a4 4 0 018 0v1" />
        <path d="M12 16v-1a4 4 0 018 0v1" />
        <path d="M4 16h16v3H4z" />
        <path d="M9 19h6" />
      </svg>
    ),
    title: "Authentic Taste",
    desc: "Traditional recipes prepared with love and care.",
  },
  {
    icon: (
      <svg
        className="w-10 h-10 text-red-500 mb-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect x="2" y="7" width="20" height="10" rx="2" ry="2" />
        <path d="M2 11h20" />
        <path d="M6 15h.01" />
      </svg>
    ),
    title: "Easy Payment",
    desc: "Multiple secure payment options available.",
  },
  {
    icon: (
      <svg
        className="w-10 h-10 text-red-500 mb-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M12 2a7 7 0 017 7c0 3.866-7 13-7 13S5 12.866 5 9a7 7 0 017-7z" />
        <path d="M12 9v4" />
      </svg>
    ),
    title: "Fresh Ingredients",
    desc: "We use only farm-fresh and organic ingredients.",
  },
];

export default function About() {
  return (
    <section className="bg-gradient-to-br from-orange-50 via-white to-red-50 min-h-screen font-sans">
      {/* Hero */}
      <div className="text-center py-24 bg-gradient-to-r from-red-500 to-orange-500 text-white">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg">
          About <span className="text-yellow-300">FoodHub Nepal</span>
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto font-semibold drop-shadow-md">
          Bringing authentic Nepali flavors to your doorstep since 2023 🏔️
        </p>
      </div>

      {/* Journey + Gallery */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <article className="space-y-6">
            <h2 className="text-4xl font-extrabold text-red-600 border-l-8 border-yellow-400 pl-4">
              Our Journey
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              From a humble kitchen in Kathmandu to a thriving food delivery brand, FoodHub Nepal
              has grown by focusing on authentic flavors, quality ingredients, and rapid delivery.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Our mission is simple —{" "}
              <span className="font-semibold text-red-600">
                to bring the taste of Nepal right to your table.
              </span>
            </p>
          </article>

          <div className="relative grid grid-cols-2 gap-6">
            <img
              src={momoImg}
              alt="Delicious Momo"
              className="rounded-3xl shadow-xl object-cover w-full h-64 transform hover:scale-105 transition duration-500 cursor-pointer"
              loading="lazy"
            />
            <img
              src={chowmeinImg}
              alt="Veg Chowmein"
              className="rounded-3xl shadow-xl object-cover w-full h-64 transform hover:scale-105 transition duration-500 cursor-pointer"
              loading="lazy"
            />
            <img
              src={sekuwaImg}
              alt="Sekuwa"
              className="rounded-full border-8 border-white shadow-2xl absolute -bottom-10 right-0 w-40 h-40 object-cover hover:scale-110 transition duration-500 cursor-pointer"
              loading="lazy"
            />
          </div>
        </div>

        {/* Features */}
        <div className="text-center max-w-5xl mx-auto space-y-8">
          <h2 className="text-4xl font-extrabold text-gray-900">Why Choose Us?</h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            The FoodHub promise —{" "}
            <span className="text-red-600 font-semibold">Delicious food, delivered fast.</span>
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 mt-10">
            {features.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-3xl p-8 shadow-md hover:shadow-red-400 transition transform hover:-translate-y-1"
              >
                {icon}
                <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <section className="bg-red-50 rounded-3xl shadow-lg py-16 max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {stats.map(({ number, label }) => (
            <div key={label} className="space-y-2">
              <p className="text-4xl font-extrabold text-red-600">{number}</p>
              <p className="uppercase tracking-wide font-semibold text-gray-600">{label}</p>
            </div>
          ))}
        </section>

        {/* Testimonials */}
        <section className="max-w-6xl mx-auto space-y-14">
          <h2 className="text-4xl font-extrabold text-center text-gray-900">What Our Customers Say</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map(({ name, feedback }) => (
              <blockquote
                key={name}
                className="bg-white rounded-3xl p-8 shadow-md relative before:content-['“'] before:absolute before:-top-8 before:left-8 before:text-6xl before:text-red-300 before:opacity-20"
              >
                <p className="text-gray-700 italic mb-6 leading-relaxed">{feedback}</p>
                <footer className="font-bold text-red-600 text-right">{name}</footer>
              </blockquote>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="max-w-6xl mx-auto space-y-12">
          <h2 className="text-4xl font-extrabold text-center text-gray-900">Meet Our Team</h2>

          <div className="grid md:grid-cols-3 gap-10">
            {team.map(({ name, role }) => (
              <div
                key={name}
                className="bg-white rounded-3xl p-10 shadow-md border-2 border-red-300 hover:shadow-red-400 transition"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
                <p className="text-red-600 font-semibold">{role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
