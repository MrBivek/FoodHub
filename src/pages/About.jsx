import React from "react";
import momoImg from "../assets/momo.jpeg";
import sekuwaImg from "../assets/sekwa.jpg";
import chowmeinImg from "../assets/veg chowmine.jpg";

// Replace emoji icons with SVG icons inline for better style
const FeatureIcon = ({ icon }) => {
  switch (icon) {
    case "rocket":
      return (
        <svg
          className="w-12 h-12 text-[#FF7A38] mb-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.5 13.5L2 21l2.5-7.5L16 3l-6.5 10.5z" />
          <path d="M9.5 13.5L7 21l4-1 1-7" />
        </svg>
      );
    case "soup":
      return (
        <svg
          className="w-12 h-12 text-[#FF7A38] mb-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 16v-1a4 4 0 018 0v1" />
          <path d="M12 16v-1a4 4 0 018 0v1" />
          <path d="M4 16h16v3H4z" />
          <path d="M9 19h6" />
        </svg>
      );
    case "payment":
      return (
        <svg
          className="w-12 h-12 text-[#FF7A38] mb-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="2" y="7" width="20" height="10" rx="2" ry="2" />
          <path d="M2 11h20" />
          <path d="M6 15h.01" />
        </svg>
      );
    case "leaf":
      return (
        <svg
          className="w-12 h-12 text-[#FF7A38] mb-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2a7 7 0 017 7c0 3.866-7 13-7 13S5 12.866 5 9a7 7 0 017-7z" />
          <path d="M12 9v4" />
        </svg>
      );
    default:
      return null;
  }
};

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
      feedback:
        "Best momo in town! Delivery is super fast, and the food tastes homemade.",
    },
    {
      name: "Sita Khadka",
      feedback:
        "Loved the chowmein — reminded me of street food in Kathmandu, but cleaner!",
    },
    {
      name: "Ravi Gurung",
      feedback:
        "Quick delivery, fresh food, and amazing taste. Highly recommend FoodHub Nepal!",
    },
  ];

  const team = [
    { name: "Chef Bivek Dahal", role: "Founder & Head Chef" },
    { name: "Aashika Sharma", role: "Marketing Manager" },
    { name: "Rajesh Thapa", role: "Delivery Head" },
  ];

  const features = [
    {
      icon: "rocket",
      title: "Fast Delivery",
      desc: "Hot and fresh food at your doorstep in 20 minutes.",
    },
    {
      icon: "soup",
      title: "Authentic Taste",
      desc: "Traditional recipes prepared with love and care.",
    },
    {
      icon: "payment",
      title: "Easy Payment",
      desc: "Multiple secure payment options available.",
    },
    {
      icon: "leaf",
      title: "Fresh Ingredients",
      desc: "We use only farm-fresh and organic ingredients.",
    },
  ];

  return (
    <section className="bg-[#fffaf5] min-h-screen">
      {/* Hero */}
      <div className="relative text-center py-24 bg-gradient-to-r from-[#FF7A38] via-[#FF9B4B] to-[#FFC68B] text-white overflow-hidden">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight drop-shadow-lg">
          About <span className="text-yellow-300">FoodHub Nepal</span>
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto font-semibold drop-shadow-md">
          Bringing authentic Nepali flavors to your doorstep since 2023 🏔️
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        {/* Journey + Gallery */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <article className="space-y-6">
            <h2 className="text-4xl font-extrabold text-[#FF7A38] border-l-8 border-yellow-400 pl-4">
              Our Journey
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              From a humble kitchen in Kathmandu to a thriving food delivery
              brand, FoodHub Nepal has grown by focusing on authentic flavors,
              quality ingredients, and rapid delivery.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Our mission is simple —{" "}
              <span className="font-semibold text-[#FF7A38]">
                to bring the taste of Nepal right to your table.
              </span>
            </p>
          </article>

          <div className="relative grid grid-cols-2 gap-6">
            <div className="rounded-3xl overflow-hidden shadow-xl transform rotate-3 hover:rotate-0 transition duration-500 cursor-pointer">
              <img
                src={momoImg}
                alt="Delicious Momo"
                className="object-cover w-full h-64"
                loading="lazy"
              />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl transform -rotate-3 hover:rotate-0 transition duration-500 cursor-pointer">
              <img
                src={chowmeinImg}
                alt="Veg Chowmein"
                className="object-cover w-full h-64"
                loading="lazy"
              />
            </div>
            <div className="rounded-full border-8 border-white shadow-2xl absolute -bottom-10 right-0 w-40 h-40 overflow-hidden hover:scale-110 transition duration-500 cursor-pointer">
              <img
                src={sekuwaImg}
                alt="Sekuwa"
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="text-center max-w-5xl mx-auto space-y-8">
          <h2 className="text-4xl font-extrabold text-gray-900">Why Choose Us?</h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            The FoodHub promise —{" "}
            <span className="text-[#FF7A38] font-semibold">
              Delicious food, delivered fast.
            </span>
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 mt-10">
            {features.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-[#FF7A38] transition transform hover:-translate-y-1"
              >
                <FeatureIcon icon={icon} />
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <section className="bg-[#fff4e6] rounded-3xl shadow-xl py-16 max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {stats.map(({ number, label }) => (
            <div key={label} className="space-y-2">
              <p className="text-4xl font-extrabold text-[#FF7A38]">{number}</p>
              <p className="uppercase tracking-wide font-semibold text-gray-600">
                {label}
              </p>
            </div>
          ))}
        </section>

        {/* Testimonials */}
        <section className="max-w-6xl mx-auto space-y-14">
          <h2 className="text-4xl font-extrabold text-center text-gray-900">
            What Our Customers Say
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map(({ name, feedback }) => (
              <blockquote
                key={name}
                className="bg-white rounded-3xl p-8 shadow-lg relative before:content-['“'] before:absolute before:-top-8 before:left-8 before:text-6xl before:text-[#FF7A38] before:opacity-20"
              >
                <p className="text-gray-700 italic mb-6 leading-relaxed">{feedback}</p>
                <footer className="font-bold text-[#FF7A38] text-right">{name}</footer>
              </blockquote>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="max-w-6xl mx-auto space-y-12">
          <h2 className="text-4xl font-extrabold text-center text-gray-900">
            Meet Our Team
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {team.map(({ name, role }) => (
              <div
                key={name}
                className="bg-white rounded-3xl p-10 shadow-lg border-2 border-[#FFB07C] hover:shadow-[#FF7A38] transition"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
                <p className="text-[#FF7A38] font-semibold">{role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact + Map */}
        <section className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-10 mt-20">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-[#FF7A38]">Contact Info</h3>
              <ul className="space-y-4 text-gray-700 text-lg">
                <li>✉️ bivek123dahal@gmail.com</li>
                <li>📞 +977-9800000000</li>
                <li>📍 Kathmandu, Nepal</li>
              </ul>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-6 text-[#FF7A38]">Business Hours</h3>
              <ul className="space-y-4 text-gray-700 text-lg">
                <li className="flex justify-between">
                  <span>Mon - Sun</span>
                  <span className="font-semibold">10 AM - 10 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Website Built</span>
                  <span className="font-semibold">2025</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 rounded-3xl overflow-hidden shadow-lg">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.056282525731!2d85.324!3d27.7172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1901c6c1a7f7%3A0x6e234a5c6f5e7e4a!2sKathmandu%2C%20Nepal!5e0!3m2!1sen!2snp!4v1693999999999!5m2!1sen!2snp"
              width="100%"
              height="280"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mt-24 mb-24">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
            Ready to Taste Happiness?
          </h2>
          <p className="text-gray-700 mb-10 text-xl max-w-3xl mx-auto">
            Order now and experience authentic Nepali flavors delivered to you.
          </p>
          <button className="bg-[#FF7A38] hover:bg-[#E94E1B] text-white px-16 py-5 rounded-full text-lg font-extrabold shadow-lg transition-transform hover:scale-105">
            Order Now 🚴
          </button>
        </section>
      </div>
    </section>
  );
}
