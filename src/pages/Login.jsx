import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Facebook, Mail } from "lucide-react";

export default function Login() {
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
    <div className="min-h-screen flex items-center justify-center bg-[#FFE9E3] px-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg border border-[#FF7A38] p-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-[#E94E1B] drop-shadow-sm">
            Welcome Back 👋
          </h2>
          <p className="text-sm text-[#666666] mt-1">
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
            <label className="block text-sm font-semibold text-[#E94E1B] mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 rounded-xl border border-[#FF7A38] focus:outline-none focus:ring-2 focus:ring-[#FF7A38] focus:border-[#E94E1B] transition bg-white"
            />
          </div>

          {/* Password */}
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
                className="w-full px-4 py-3 rounded-xl border border-[#FF7A38] focus:outline-none focus:ring-2 focus:ring-[#FF7A38] focus:border-[#E94E1B] pr-10 transition bg-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-[#E94E1B] hover:text-[#FF7A38] transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Remember Me + Forgot Password */}
          <div className="flex items-center justify-between text-sm text-[#666666]">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="rounded text-[#FF7A38] focus:ring-[#E94E1B]"
              />
              Remember Me
            </label>
            <Link
              to="/forgot-password"
              className="text-[#E94E1B] font-semibold hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] text-white py-3 rounded-xl font-semibold hover:shadow-lg active:scale-[0.98] transition-shadow shadow-md flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-2 my-6 text-[#666666] text-sm">
          <hr className="flex-grow border-[#FF7A38]" />
          <span>or continue with</span>
          <hr className="flex-grow border-[#FF7A38]" />
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 py-2 border border-[#FF7A38] rounded-xl bg-white text-[#FF7A38] hover:bg-[#FFE6DA] transition font-semibold">
            <Mail size={18} />
            Google
          </button>
          <button className="flex items-center justify-center gap-2 py-2 border border-[#FF7A38] rounded-xl bg-white text-[#FF7A38] hover:bg-[#FFE6DA] transition font-semibold">
            <Facebook size={18} />
            Facebook
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="mt-6 text-center text-sm text-[#666666]">
          <p>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#E94E1B] font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
