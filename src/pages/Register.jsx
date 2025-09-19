import { Link } from "react-router-dom";

export default function Register() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-200 px-4">
      <div className="relative max-w-md w-full bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-yellow-200 overflow-hidden">
        {/* Decorative glowing orbs */}
        <div className="absolute -top-12 -right-14 w-44 h-44 bg-yellow-300/40 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-12 -left-14 w-44 h-44 bg-orange-200/40 rounded-full blur-3xl"></div>

        {/* Title */}
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2 text-center drop-shadow-sm">
          Create Account
        </h2>
        <p className="text-center text-gray-600 mb-8 text-sm">
          Join us and start your food journey today 🍴
        </p>

        {/* Form */}
        <form className="space-y-5 relative z-10">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 border rounded-xl border-yellow-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none bg-white/60 transition"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 border rounded-xl border-yellow-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none bg-white/60 transition"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-xl border-yellow-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none bg-white/60 transition"
          />

          <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 py-3 rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg">
            Register
          </button>
        </form>

        {/* Footer link */}
        <p className="text-center text-sm text-gray-700 mt-6 relative z-10">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-yellow-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
