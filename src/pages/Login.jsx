import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import API from "../utils/API";

export default function Login() {
  const navigate = useNavigate();

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

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "❌ Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#FFE9E3] font-sans">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl">
        <h1 className="text-3xl text-center font-bold text-[#E94E1B] mb-6">Login</h1>

        {error && (
          <p className="bg-red-100 p-3 rounded-md mb-4 text-red-700">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
              required
            />
          </div>

          <div>
            <label>Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-bold flex justify-center"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center">
          New user? <Link to="/register" className="text-[#E94E1B]">Register</Link>
        </p>
      </div>
    </div>
  );
}
