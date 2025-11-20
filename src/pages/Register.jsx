import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/API";

export default function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await API.post("/auth/register", {
        name: fullName,
        email,
        password,
      });

      alert(`Welcome ${data.name}!`);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFE9E3]">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-lg">
        <h2 className="text-3xl text-center font-bold text-[#E94E1B] mb-4">
          Register
        </h2>

        {error && (
          <p className="bg-red-100 p-3 rounded-md text-red-700 mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border px-4 py-3 rounded-xl"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full border px-4 py-3 rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border px-4 py-3 rounded-xl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-bold"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?
          <Link to="/login" className="text-[#FF7A38]"> Login</Link>
        </p>
      </div>
    </div>
  );
}
