import React from "react";
import momoImg from "../assets/momo.jpeg";
import sekuwaImg from "../assets/sekwa.jpg";
import chowmeinImg from "../assets/veg chowmine.jpg";

export default function About() {
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
      image: "https://i.pravatar.cc/100?img=12",
    },
    {
      name: "Sita Khadka",
      feedback: "Loved the chowmein — reminded me of street food in Kathmandu, but cleaner!",
      image: "https://i.pravatar.cc/100?img=31",
    },
    {
      name: "Ravi Gurung",
      feedback: "Quick delivery, fresh food, and amazing taste. Highly recommend FoodHub Nepal!",
      image: "https://i.pravatar.cc/100?img=18",
    },
  ];

  const team = [
    { name: "Chef Bivek Dahal", role: "Founder & Head Chef", img: "https://i.pravatar.cc/150?img=5" },
    { name: "Aashika Sharma", role: "Marketing Manager", img: "https://i.pravatar.cc/150?img=10" },
    { name: "Rajesh Thapa", role: "Delivery Head", img: "https://i.pravatar.cc/150?img=45" },
  ];

  const features = [
    { icon: "🚀", title: "Fast Delivery", desc: "Hot and fresh food at your doorstep in 20 minutes." },
    { icon: "🍲", title: "Authentic Taste", desc: "Traditional recipes prepared with love and care." },
    { icon: "💳", title: "Easy Payment", desc: "Multiple secure payment options available." },
    { icon: "🌱", title: "Fresh Ingredients", desc: "We use only farm-fresh and organic ingredients." },
  ];

  return (
    <section>
      {/* Hero */}
      <div className="relative text-center py-28 bg-gradient-to-r from-yellow-100 via-yellow-50 to-white text-gray-900 overflow-hidden">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
          About <span className="text-yellow-500">FoodHub Nepal</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-700 max-w-2xl mx-auto">
          Bringing authentic Nepali flavors to your doorstep since 2023 🏔️
        </p>
        <div className="px-6 py-2 bg-yellow-400 text-gray-900 font-bold rounded-full shadow-lg inline-block hover:scale-105 transition">
          Est. 2023 • Bivek Dahal
        </div>
        <div className="absolute -top-16 -left-16 w-40 h-40 bg-yellow-300 opacity-20 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-yellow-300 opacity-20 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-6 py-20 bg-gradient-to-b from-yellow-50 via-white to-yellow-50">
        {/* Story */}
        <div className="grid lg:grid-cols-2 gap-14 mb-24 items-center">
          <div className="backdrop-blur-md bg-white/70 rounded-3xl shadow-2xl p-10 border border-yellow-100 hover:shadow-yellow-200 transition">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Journey</h3>
            <p className="text-gray-700 leading-relaxed mb-5">
              Started as a small kitchen project in Kathmandu, FoodHub Nepal has grown into a trusted brand for authentic Nepali dishes delivered fast and fresh. 
              We’re committed to quality ingredients and homestyle recipes.
            </p>
            <p className="text-gray-700 leading-relaxed">
              From a handful of orders to hundreds each week, our goal remains the same:{" "}
              <span className="font-semibold text-yellow-600">make you feel at home with every bite.</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="group relative overflow-hidden rounded-3xl shadow-xl transform rotate-2 hover:rotate-0 hover:scale-105 transition">
              <img
                src={momoImg}
                alt="Momo"
                className="h-52 w-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>
            <div className="group relative overflow-hidden rounded-3xl shadow-xl transform -rotate-2 hover:rotate-0 hover:scale-105 transition mt-8">
              <img
                src={chowmeinImg}
                alt="Chowmein"
                className="h-52 w-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>
            <div className="group relative overflow-hidden rounded-full border-4 border-white shadow-2xl -mt-8 mx-auto hover:scale-110 transition">
              <img src={sekuwaImg} alt="Sekuwa" className="w-32 h-32 object-cover" />
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="text-center mb-24">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
          <p className="text-gray-600 mb-12">
            The FoodHub promise — <span className="text-yellow-600 font-semibold">Delicious food, delivered fast.</span>
          </p>
          <div className="grid md:grid-cols-4 gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-yellow-200 hover:-translate-y-2 transition"
              >
                <div className="text-5xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Numbers</h2>
          <div className="w-28 h-1 bg-yellow-400 mx-auto mb-10 rounded-full"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-gradient-to-tr from-yellow-50 to-white rounded-3xl shadow-xl p-8 text-center border border-yellow-100 hover:shadow-yellow-200 hover:-translate-y-2 transition"
            >
              <div className="text-4xl font-extrabold text-yellow-600 mb-3">{s.number}</div>
              <div className="text-gray-700 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-24">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-3xl shadow-xl p-8 border border-yellow-100 hover:shadow-yellow-200 hover:-translate-y-2 transition"
              >
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-yellow-100"
                />
                <p className="text-gray-700 italic mb-4">“{t.feedback}”</p>
                <h4 className="text-lg font-bold text-yellow-600">{t.name}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Meet the Team */}
        <div className="text-center mb-24">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-3xl shadow-lg p-8 border border-yellow-100 hover:shadow-yellow-200 hover:-translate-y-2 transition"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow-lg"
                />
                <h4 className="text-lg font-bold text-gray-900">{member.name}</h4>
                <p className="text-yellow-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact card */}
        <div className="bg-gradient-to-tr from-white to-yellow-50 rounded-3xl shadow-xl p-10 max-w-5xl mx-auto border border-yellow-100 hover:shadow-yellow-200 transition">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Info</h3>
              <div className="space-y-4 text-gray-700">
                <div>✉️ bivek123dahal@gmail.com</div>
                <div>📞 +977-9800000000</div>
                <div>📍 Kathmandu, Nepal</div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Business Hours</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Mon - Sun</span>
                  <span className="text-gray-900 font-medium">10 AM - 10 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Website Built</span>
                  <span className="text-yellow-600 font-semibold">2025</span>
                </div>
              </div>
            </div>
          </div>
          {/* Google Map Embed */}
          <div className="mt-8">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.056282525731!2d85.324!3d27.7172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1901c6c1a7f7%3A0x6e234a5c6f5e7e4a!2sKathmandu%2C%20Nepal!5e0!3m2!1sen!2snp!4v1693999999999!5m2!1sen!2snp"
              width="100%"
              height="260"
              allowFullScreen
              loading="lazy"
              className="rounded-2xl border border-yellow-100"
            />
          </div>
          <div className="mt-8 pt-6 border-t border-yellow-100 text-center">
            <p className="text-gray-700">
              <span className="font-semibold text-yellow-600">FoodHub Nepal</span> — Your trusted food delivery partner 🍽️
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-24">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Taste Happiness?</h2>
          <p className="text-gray-600 mb-6">Order now and experience authentic Nepali flavors delivered to you.</p>
          <button className="bg-yellow-400 px-10 py-4 rounded-full font-bold shadow-xl hover:bg-yellow-500 hover:scale-105 transition">
            Order Now 🚴
          </button>
        </div>
      </div>
    </section>
  );
}
