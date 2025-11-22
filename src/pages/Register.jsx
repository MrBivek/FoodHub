// pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, UserPlus, Mail, Lock, User } from "lucide-react";
import API from "../utils/API";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const validateForm = () => {
    const errors = {};

    if (!formData.fullName || formData.fullName.trim().length < 2) {
      errors.fullName = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    const pwd = formData.password;
    const pwdStrongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!pwdStrongRegex.test(pwd)) {
      errors.password = "Password must be at least 6 chars, include uppercase, lowercase & number";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: "" }));
    }
    setError("");
    setSuccessMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      const { data } = await API.post("/auth/register", {
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      setSuccessMsg(`Welcome ${data.name}! Please login to continue.`);
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      console.error("Registration error:", err);
      const msg = err.response?.data?.message || "Registration failed. Please try again.";
      if (msg.toLowerCase().includes("email")) {
        setError("This email is already registered. Please login or use another email.");
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = Object.keys(validationErrors).length === 0 &&
                      formData.fullName &&
                      formData.email &&
                      formData.password &&
                      formData.confirmPassword &&
                      !loading;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-orange-50 via-white to-red-50 font-sans">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-red-500 to-orange-500 p-4 rounded-full mb-4 shadow-lg">
            <UserPlus className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-red-600 mb-2">
            Join Foodhub
          </h1>
          <p className="text-gray-700">Create your account to start ordering</p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-red-500 p-6 sm:p-8">
          {error && (
            <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <span className="flex-1 text-sm">{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="bg-green-100 border-2 border-green-400 text-green-700 px-4 py-3 rounded-xl mb-6 flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <span className="flex-1 text-sm">{successMsg}</span>
            </div>
          )}

          <div className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-red-600 font-semibold mb-2 text-sm">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full border-2 rounded-xl px-12 py-3 text-base focus:outline-none focus:ring-2 transition ${
                    validationErrors.fullName
                      ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:border-red-500 focus:ring-red-500/20"
                  }`}
                  required
                />
              </div>
              {validationErrors.fullName && (
                <p className="text-red-500 text-xs mt-1 ml-1">{validationErrors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-red-600 font-semibold mb-2 text-sm">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full border-2 rounded-xl px-12 py-3 text-base focus:outline-none focus:ring-2 transition ${
                    validationErrors.email
                      ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:border-red-500 focus:ring-red-500/20"
                  }`}
                  required
                />
              </div>
              {validationErrors.email && (
                <p className="text-red-500 text-xs mt-1 ml-1">{validationErrors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-red-600 font-semibold mb-2 text-sm">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full border-2 rounded-xl px-12 py-3 pr-12 text-base focus:outline-none focus:ring-2 transition ${
                    validationErrors.password
                      ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:border-red-500 focus:ring-red-500/20"
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500 transition"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {validationErrors.password && (
                <p className="text-red-500 text-xs mt-1 ml-1">{validationErrors.password}</p>
              )}
              {!validationErrors.password && formData.password && (
                <p className="text-green-600 text-xs mt-1 ml-1">✓ Password looks good</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-red-600 font-semibold mb-2 text-sm">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full border-2 rounded-xl px-12 py-3 pr-12 text-base focus:outline-none focus:ring-2 transition ${
                    validationErrors.confirmPassword
                      ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:border-red-500 focus:ring-red-500/20"
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500 transition"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {validationErrors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1 ml-1">{validationErrors.confirmPassword}</p>
              )}
              {!validationErrors.confirmPassword &&
                formData.confirmPassword &&
                formData.password === formData.confirmPassword && (
                  <p className="text-green-600 text-xs mt-1 ml-1">✓ Passwords match</p>
                )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all mt-6 ${
                !isFormValid
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-500 to-orange-500 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" size={20} />
                  Creating Account...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <UserPlus size={20} />
                  Create Account
                </span>
              )}
            </button>
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-red-600 font-bold hover:underline hover:text-red-500 transition"
              >
                Login here
              </Link>
            </p>
          </div>

          {/* Terms */}
          <p className="text-xs text-gray-500 text-center mt-6">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-red-500 hover:underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-red-500 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
