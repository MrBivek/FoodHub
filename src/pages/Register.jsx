import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate registration delay
    setTimeout(() => {
      if (fullName && email && password) {
        alert(`Welcome ${fullName}! Registration successful.`);
      } else {
        setError("Please fill in all fields correctly.");
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFE9E3] px-6 py-12 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg border border-[#FF7A38] p-8">
        <h2 className="text-3xl font-extrabold text-[#E94E1B] mb-2 text-center">
          Create Account
        </h2>
        <p className="text-center text-[#666666] mb-8 text-sm">
          Join us and start your food journey today 🍴
        </p>

        {error && (
          <div className="mb-5 p-3 bg-red-100 text-red-700 rounded-lg text-sm animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl border-[#FF7A38] focus:ring-2 focus:ring-[#FF7A38] focus:border-[#E94E1B] outline-none bg-white transition"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl border-[#FF7A38] focus:ring-2 focus:ring-[#FF7A38] focus:border-[#E94E1B] outline-none bg-white transition"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl border-[#FF7A38] focus:ring-2 focus:ring-[#FF7A38] focus:border-[#E94E1B] outline-none bg-white transition"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] shadow-md hover:shadow-lg hover:scale-[1.05] active:scale-[0.98] transition flex justify-center items-center ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#666666]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#FF7A38] font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
