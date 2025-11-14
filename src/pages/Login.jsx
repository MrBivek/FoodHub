import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, Facebook, Mail } from "lucide-react";
import API from "../services/api";

export default function Login() {
  const navigate = useNavigate();

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

    try {
      const { data } = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      navigate("/");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "❌ Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 font-sans bg-gradient-to-br from-[#FFD7C4] via-[#FFE9E3] to-[#FFF4EF]">

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#FF7A38]/40 p-8">

        {/* BRAND HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-[#E94E1B] drop-shadow-sm">
            Welcome to <span className="text-[#FF7A38]">FoodHub</span>
          </h1>

          <p className="text-sm mt-2 text-[#666666]">
            Delicious food, delivered with love.  
            <span className="text-[#E94E1B] font-semibold">  
              Sign in to continue 🍽️
            </span>
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-semibold text-[#E94E1B] mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 rounded-xl border border-[#FF7A38]/60 bg-white focus:outline-none focus:ring-2 focus:ring-[#FF7A38] transition"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-semibold text-[#E94E1B] mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 pr-10 rounded-xl border border-[#FF7A38]/60 bg-white focus:outline-none focus:ring-2 focus:ring-[#FF7A38]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-[#E94E1B]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm text-[#666]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="rounded text-[#FF7A38]"
              />
              Remember me
            </label>

            <Link
              to="/forgot-password"
              className="text-[#E94E1B] font-semibold hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] text-white py-3 rounded-xl font-bold shadow-md hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 transition"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Logging in...
              </>
            ) : (
              "Login to FoodHub"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-2 my-6 text-[#666] text-sm">
          <hr className="flex-grow border-[#FF7A38]/40" />
          <span>or login with</span>
          <hr className="flex-grow border-[#FF7A38]/40" />
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button className="py-2 flex items-center justify-center gap-2 border border-[#FF7A38] text-[#FF7A38] rounded-xl hover:bg-[#FFF2EA] transition font-semibold">
            <Mail size={18} />
            Google
          </button>

          <button className="py-2 flex items-center justify-center gap-2 border border-[#FF7A38] text-[#FF7A38] rounded-xl hover:bg-[#FFF2EA] transition font-semibold">
            <Facebook size={18} />
            Facebook
          </button>
        </div>

        {/* Signup */}
        <p className="mt-6 text-center text-sm text-[#666]">
          New here?{" "}
          <Link
            to="/register"
            className="text-[#E94E1B] font-semibold hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
