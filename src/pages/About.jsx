import { Star, Award, TrendingUp, Users } from "lucide-react";
import momoImg from "../assets/momo.jpeg";
import sekuwaImg from "../assets/sekwa.jpg";
import chowmeinImg from "../assets/veg chowmine.jpg";

const stats = [
  { number: "500+", label: "Happy Customers", icon: Users },
  { number: "25+", label: "Dishes Available", icon: Award },
  { number: "2+", label: "Years Experience", icon: TrendingUp },
  { number: "20 min", label: "Avg Delivery", icon: Star },
];

const testimonials = [
  {
    name: "Aarav Shrestha",
    feedback:
      "Best momo in town! Delivery is super fast, and the food tastes homemade.",
    rating: 5,
  },
  {
    name: "Sita Khadka",
    feedback:
      "Loved the chowmein — reminded me of street food in Kathmandu, but cleaner!",
    rating: 5,
  },
  {
    name: "Ravi Gurung",
    feedback:
      "Quick delivery, fresh food, and amazing taste. Highly recommend FoodHub Nepal!",
    rating: 5,
  },
];

const team = [
  { name: "Chef Bivek Dahal", role: "Founder & Head Chef" },
  { name: "Aashika Sharma", role: "Marketing Manager" },
  { name: "Rajesh Thapa", role: "Delivery Head" },
];

const features = [
  {
    title: "Fast Delivery",
    desc: "Hot and fresh food at your doorstep in 20 minutes.",
  },
  {
    title: "Authentic Taste",
    desc: "Traditional recipes prepared with love and care.",
  },
  {
    title: "Easy Payment",
    desc: "Multiple secure payment options available.",
  },
  {
    title: "Fresh Ingredients",
    desc: "We use only farm-fresh and organic ingredients.",
  },
];

export default function About() {
  return (
    <section className="bg-gradient-to-br from-orange-50 via-white to-red-50 min-h-screen font-sans">
      {/* Hero */}
      <header className="text-center py-16 sm:py-24 bg-gradient-to-r from-red-500 to-orange-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-48 sm:w-64 h-48 sm:h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-3 sm:mb-4 drop-shadow-2xl">
            About <span className="text-yellow-300">FoodHub Nepal</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto font-semibold drop-shadow-lg">
            Bringing authentic Nepali flavors to your doorstep since 2023 🏔️
          </p>
        </div>
      </header>

      {/* Journey + Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16 sm:space-y-20">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <article className="space-y-4 sm:space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-red-500 border-l-8 border-orange-500 pl-4">
              Our Journey
            </h2>
            <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
              From a humble kitchen in Kathmandu to a thriving food delivery
              brand, FoodHub Nepal has grown by focusing on authentic flavors,
              quality ingredients, and rapid delivery.
            </p>
            <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
              Our mission is simple —{" "}
              <strong className="text-red-500">
                to bring the taste of Nepal right to your table.
              </strong>
            </p>
          </article>

          <div className="relative grid grid-cols-2 gap-4 sm:gap-6">
            <img
              src={momoImg}
              alt="Delicious Momo"
              className="rounded-2xl sm:rounded-3xl shadow-xl object-cover w-full h-48 sm:h-64 transform hover:scale-105 transition duration-500"
            />
            <img
              src={chowmeinImg}
              alt="Veg Chowmein"
              className="rounded-2xl sm:rounded-3xl shadow-xl object-cover w-full h-48 sm:h-64 transform hover:scale-105 transition duration-500"
            />
            <img
              src={sekuwaImg}
              alt="Sekuwa"
              className="rounded-full border-4 sm:border-8 border-white shadow-2xl absolute -bottom-8 right-4 sm:-bottom-10 sm:right-0 w-32 h-32 sm:w-40 sm:h-40 object-cover hover:scale-110 transition duration-500"
            />
          </div>
        </section>

        {/* Features */}
        <section className="text-center max-w-5xl mx-auto space-y-6 sm:space-y-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Why Choose Us?
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto">
            The FoodHub promise —{" "}
            <span className="text-red-500 font-semibold">
              Delicious food, delivered fast.
            </span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 mt-10">
            {features.map(({ title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-red-500 transition transform hover:-translate-y-1"
              >
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">
                  {title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="bg-gradient-to-br from-orange-50 via-white to-red-50 rounded-2xl sm:rounded-3xl shadow-lg py-12 sm:py-16 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 text-center">
          {stats.map(({ number, label, icon: Icon }) => (
            <div key={label} className="space-y-2 sm:space-y-3">
              <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-red-500 mx-auto" />
              <p className="text-3xl sm:text-4xl font-extrabold text-red-500">
                {number}
              </p>
              <p className="text-xs sm:text-sm uppercase tracking-wide font-semibold text-gray-600 px-2">
                {label}
              </p>
            </div>
          ))}
        </section>

        {/* Testimonials */}
        <section className="max-w-6xl mx-auto space-y-10 sm:space-y-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900">
            What Our Customers Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map(({ name, feedback, rating }) => (
              <blockquote
                key={name}
                className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-md relative"
              >
                <div className="flex gap-1 mb-4" aria-label={`${rating} star rating`}>
                  {[...Array(rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-gray-700 italic mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  {feedback}
                </p>

                <footer className="font-bold text-red-500 text-right text-sm sm:text-base">
                  {name}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="max-w-6xl mx-auto space-y-10 sm:space-y-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900">
            Meet Our Team
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {team.map(({ name, role }) => (
              <div
                key={name}
                className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-10 shadow-md border-2 border-red-500 hover:shadow-orange-500 transition text-center"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-red-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold">
                  {name.charAt(0)}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {name}
                </h3>
                <p className="text-red-500 font-semibold text-sm sm:text-base">
                  {role}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
