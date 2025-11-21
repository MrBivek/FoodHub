// pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import API from "../utils/API";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await API.post("/auth/login", { email, password });

      console.log("Login response:", data); // Debug log

      // Extract token and user data
      const token = data.token || data.data?.token;
      const userData = data.data || data;

      if (!token) {
        throw new Error("No token received from server");
      }

      // Store token
      localStorage.setItem("token", token);

      // Store user data (including isAdmin flag)
      const userToStore = {
        _id: userData._id,
        name: userData.name,
        email: userData.email,
        phone: userData.phone || "",
        address: userData.address || "",
        imageUrl: userData.imageUrl || "",
        isAdmin: userData.isAdmin || false,
      };

      localStorage.setItem("user", JSON.stringify(userToStore));

      console.log("Stored user:", userToStore); // Debug log

      // Redirect to intended page or home
      const from = location.state?.from?.pathname || "/";
      
      // If user is admin, redirect to admin dashboard
      if (userToStore.isAdmin) {
        navigate("/admin");
      } else {
        navigate(from);
      }

      // Success message
      console.log(`✅ Welcome ${userToStore.name}!`);
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message || 
        err.message || 
        "❌ Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#FFE9E3] via-[#FFF1EB] to-[#FFD6C2] font-sans">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-2xl border border-[#FF7A38]">
        <h1 className="text-4xl text-center font-extrabold text-[#E94E1B] mb-2">
          Welcome Back!
        </h1>
        <p className="text-center text-gray-600 mb-8">Login to your account</p>

        {error && (
          <div className="bg-red-100 border border-red-400 p-4 rounded-lg mb-6 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[#E94E1B] font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF7A38] focus:ring-2 focus:ring-[#FF7A38]/20 transition"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-[#E94E1B] font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:border-[#FF7A38] focus:ring-2 focus:ring-[#FF7A38]/20 transition"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#FF7A38] transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] hover:shadow-2xl hover:scale-105"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin" size={20} />
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          New to Foodhub?{" "}
          <Link to="/register" className="text-[#E94E1B] font-bold hover:underline">
            Create Account
          </Link>
        </p>

        <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
          <p className="text-sm text-gray-700 text-center font-semibold">
            🔑 Admin Login
          </p>
          <p className="text-xs text-gray-600 text-center mt-1">
            Email: admin@foodhub.com
            <br />
            Password: admin123
          </p>
        </div>
      </div>
    </div>
  );
}