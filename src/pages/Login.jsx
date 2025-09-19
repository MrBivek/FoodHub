import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Facebook, Mail } from "lucide-react";
import sandwichImg from "../assets/Sandwitch.jpg"; // ✅ import sandwich image

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (email === "test@foodhub.com" && password === "123456") {
        alert("✅ Login successful!");
      } else {
        setError("Invalid email or password. Please try again.");
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-200 px-4">
      <div className="relative w-full max-w-md p-8 rounded-3xl shadow-2xl bg-white/70 backdrop-blur-xl border border-yellow-200 overflow-hidden">
        {/* Decorative glowing orbs */}
        <div className="absolute -top-10 -right-14 w-44 h-44 bg-yellow-300/40 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-14 w-44 h-44 bg-orange-200/40 rounded-full blur-3xl"></div>

        {/* Logo + Title */}
        <div className="relative text-center mb-8">
          <img
            src={sandwichImg} // ✅ updated to sandwich
            alt="Club Sandwich"
            className="w-16 h-16 rounded-lg object-cover mx-auto mb-4"
          />
          <h2 className="text-3xl font-extrabold text-gray-900 drop-shadow-sm">
            Welcome Back 👋
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Login to continue your food journey
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-5 p-3 bg-red-100 text-red-700 rounded-lg text-sm animate-shake">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition bg-white/60"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none pr-10 transition bg-white/60"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-800 transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Remember Me + Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="rounded text-yellow-500 focus:ring-yellow-400"
              />
              Remember Me
            </label>
            <Link
              to="/forgot-password"
              className="text-yellow-600 font-medium hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 py-3 rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} /> Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-2 my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="text-gray-500 text-sm">or continue with</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 py-2 border rounded-xl bg-white/70 hover:bg-white transition font-medium">
            <Mail className="text-red-500" size={18} />
            Google
          </button>
          <button className="flex items-center justify-center gap-2 py-2 border rounded-xl bg-white/70 hover:bg-white transition font-medium">
            <Facebook className="text-blue-600" size={18} />
            Facebook
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-yellow-600 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;