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
    <section className="bg-[#FFE9E3] min-h-screen">
      {/* Hero */}
      <div className="relative text-center py-24 bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-50 text-gray-900 overflow-hidden">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
          About <span className="text-[#FF7A38]">FoodHub Nepal</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-800 max-w-3xl mx-auto px-4">
          Bringing authentic Nepali flavors to your doorstep since 2023 🏔️
        </p>
        <div className="inline-block bg-[#FF7A38] text-white font-bold rounded-full px-6 py-3 shadow-lg hover:scale-105 transition">
          Est. 2023 • Bivek Dahal
        </div>
        <div className="absolute -top-16 -left-16 w-40 h-40 bg-yellow-300 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-yellow-300 opacity-20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Story */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="bg-white rounded-2xl shadow-lg p-10 border border-[#FFB07C] hover:shadow-[#FF7A38] transition">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Journey</h3>
            <p className="text-gray-700 mb-5 leading-relaxed">
              Started as a small kitchen project in Kathmandu, FoodHub Nepal has grown into a trusted brand for authentic Nepali dishes delivered fast and fresh. We’re committed to quality ingredients and homestyle recipes.
            </p>
            <p className="text-gray-700 leading-relaxed">
              From a handful of orders to hundreds each week, our goal remains the same:{" "}
              <span className="font-semibold text-[#FF7A38]">make you feel at home with every bite.</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="group relative overflow-hidden rounded-2xl shadow-lg transform rotate-2 hover:rotate-0 hover:scale-105 transition">
              <img
                src={momoImg}
                alt="Momo"
                className="h-52 w-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>
            <div className="group relative overflow-hidden rounded-2xl shadow-lg transform -rotate-2 hover:rotate-0 hover:scale-105 transition mt-8">
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
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Us?</h2>
          <p className="text-gray-700 mb-12 max-w-3xl mx-auto">
            The FoodHub promise — <span className="text-[#FF7A38] font-semibold">Delicious food, delivered fast.</span>
          </p>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl shadow-md p-8 hover:shadow-[#FF7A38] hover:-translate-y-1 transition"
              >
                <div className="text-5xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Numbers</h2>
          <div className="w-32 h-1 bg-[#FF7A38] mx-auto mb-12 rounded-full"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-5xl mx-auto">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white rounded-2xl shadow-md p-8 border border-[#FFB07C] hover:shadow-[#FF7A38] hover:-translate-y-1 transition"
              >
                <div className="text-4xl font-extrabold text-[#FF7A38] mb-3">{s.number}</div>
                <div className="text-gray-700 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl shadow-md p-8 border border-[#FFB07C] hover:shadow-[#FF7A38] hover:-translate-y-1 transition"
              >
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-20 h-20 rounded-full mx-auto mb-5 border-4 border-[#FFB07C]"
                />
                <p className="text-gray-700 italic mb-6">“{t.feedback}”</p>
                <h4 className="text-lg font-bold text-[#FF7A38]">{t.name}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Meet the Team */}
        <div className="text-center mb-24">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl shadow-md p-8 border border-[#FFB07C] hover:shadow-[#FF7A38] hover:-translate-y-1 transition"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-5 object-cover shadow-md"
                />
                <h4 className="text-lg font-bold text-gray-900">{member.name}</h4>
                <p className="text-[#FF7A38]">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Card */}
        <div className="bg-white rounded-2xl shadow-md p-10 max-w-5xl mx-auto border border-[#FFB07C] hover:shadow-[#FF7A38] transition mb-20">
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
                  <span className="text-[#FF7A38] font-semibold">2025</span>
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
              className="rounded-2xl border border-[#FFB07C]"
            />
          </div>

          <div className="mt-8 pt-6 border-t border-[#FFB07C] text-center">
            <p className="text-gray-700">
              <span className="font-semibold text-[#FF7A38]">FoodHub Nepal</span> — Your trusted food delivery partner 🍽️
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Taste Happiness?</h2>
          <p className="text-gray-700 mb-8 max-w-3xl mx-auto">
            Order now and experience authentic Nepali flavors delivered to you.
          </p>
          <button className="bg-[#FF7A38] text-white px-12 py-4 rounded-full font-bold shadow-lg hover:bg-[#E94E1B] hover:scale-105 transition">
            Order Now 🚴
          </button>
        </div>
      </div>
    </section>
  );
}
