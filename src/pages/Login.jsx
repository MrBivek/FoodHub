import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, Loader2, LogIn, Mail, Lock } from "lucide-react";
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

      const token = data.token || data.data?.token;
      const userData = data.data || data;

      if (!token) throw new Error("No token received");

      localStorage.setItem("token", token);

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

      const from = location.state?.from?.pathname || "/";

      if (userToStore.isAdmin) {
        navigate("/admin");
      } else {
        navigate(from);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-orange-50 via-white to-red-50 font-sans">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-red-500 to-orange-500 p-4 rounded-full mb-4 shadow-lg">
            <LogIn className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-red-600 mb-2">
            Welcome Back!
          </h1>
          <p className="text-gray-700">Login to your Foodhub account</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl border-2 border-red-500 p-6 sm:p-8">
          {error && (
            <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-red-600 font-semibold mb-2 text-sm">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-xl px-12 py-3 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition"
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="block text-red-600 font-semibold mb-2 text-sm">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-xl px-12 py-3 pr-12 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500 transition"
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
                  : "bg-gradient-to-r from-red-500 to-orange-500 hover:shadow-2xl hover:scale-[1.02]"
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

          <p className="mt-6 text-center text-gray-600 text-sm">
            New to Foodhub?{" "}
            <Link
              to="/register"
              className="text-red-600 font-bold hover:underline"
            >
              Create Account
            </Link>
          </p>

          <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-sm text-gray-700 text-center font-semibold">
              🔑 Demo Accounts
            </p>
            <div className="text-xs text-gray-600 mt-2 space-y-1">
              <p className="text-center">Admin: admin@foodhub.com / admin123</p>
              <p className="text-center">User: Use any registered email</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
