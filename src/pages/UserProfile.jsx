import { useState, useEffect } from "react";
import {
  Camera,
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  Edit2,
  Save,
  X,
} from "lucide-react";
import API from "../utils/API";

export default function UserProfile() {
  const defaultUser = {
    name: "",
    email: "",
    phone: "",
    address: "",
    imageUrl: "",
  };

  const [user, setUser] = useState(defaultUser);
  const [editUser, setEditUser] = useState(defaultUser);
  const [orders, setOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await API.get("/auth/me");
        const userData = res.data.data || res.data;
        setUser(userData);
        setEditUser(userData);
        setImagePreview(userData.imageUrl);
      } catch (err) {
        console.error("Failed to load profile", err);
        setError("Failed to load profile. Please try again.");
      }
      setLoading(false);
    }

    async function loadOrders() {
      try {
        const res = await API.get("/orders/my-orders");
        const ordersData = res.data.data || res.data;
        setOrders(Array.isArray(ordersData) ? ordersData : []);
      } catch (err) {
        console.error("Failed to load orders", err);
      }
    }

    loadProfile();
    loadOrders();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setEditUser((prev) => ({ ...prev, imageUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setError("");

    if (!editUser.name || !editUser.email) {
      setError("Name and email are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editUser.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setSaving(true);
    try {
      const res = await API.put("/auth/me", editUser);
      const updatedData = res.data.data || res.data;

      setUser(updatedData);
      setEditUser(updatedData);
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed", err);
      const errorMsg = err.response?.data?.message || "Failed to update profile!";
      setError(errorMsg);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditUser(user);
    setImagePreview(user.imageUrl);
    setIsEditing(false);
    setError("");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logged out successfully!");
    window.location.href = "/login";
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-red-600" />;
      case "processing":
        return <Clock className="w-5 h-5 text-orange-600" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-gray-400" />;
      default:
        return <Package className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-red-100 text-red-800 border-red-200";
      case "processing":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-orange-50 via-white to-red-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-300 border-t-red-500 mx-auto mb-4"></div>
          <p className="text-red-500 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-600 mb-2">My Profile</h1>
          <p className="text-orange-800">Manage your account information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-red-400">
              {/* Profile Picture */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative group">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-red-400 transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-5xl font-bold shadow-lg border-4 border-red-400">
                      {user.name?.charAt(0)?.toUpperCase() || <User className="w-16 h-16" />}
                    </div>
                  )}

                  {isEditing && (
                    <label
                      htmlFor="imageUpload"
                      className="absolute bottom-0 right-0 bg-red-600 rounded-full p-2.5 cursor-pointer shadow-lg hover:bg-red-700 transition-all hover:scale-110"
                      title="Change profile picture"
                    >
                      <Camera className="w-5 h-5 text-white" />
                    </label>
                  )}
                </div>

                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

                <h2 className="mt-4 text-2xl font-bold text-red-600">{user.name || "User"}</h2>
                <p className="text-orange-800 text-sm">{user.email}</p>
              </div>

              {/* Quick Stats */}
              <div className="border-t-2 border-orange-100 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-orange-800 text-sm font-medium">Total Orders</span>
                  <span className="text-2xl font-bold text-red-600">{orders.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-orange-800 text-sm font-medium">Member Since</span>
                  <span className="text-sm font-semibold text-red-600">2024</span>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full mt-6 px-6 py-3 border-2 border-red-400 text-red-600 rounded-xl font-semibold hover:bg-red-400 hover:text-white transition-all"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Right Column - Details & Orders */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-red-400">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-red-600">Profile Information</h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-all"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                        saving
                          ? "bg-gray-400 cursor-not-allowed text-white"
                          : "bg-green-600 hover:bg-green-700 text-white"
                      }`}
                    >
                      <Save className="w-4 h-4" />
                      {saving ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={saving}
                      className="flex items-center gap-2 px-4 py-2 border-2 border-red-400 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-all"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-3">
                  <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="flex items-center gap-2 text-red-600 font-semibold mb-2">
                    <User className="w-4 h-4" />
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  {isEditing ? (
                    <input
                      name="name"
                      type="text"
                      value={editUser.name || ""}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-orange-300 px-4 py-3 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <p className="text-gray-800 bg-orange-50 px-4 py-3 rounded-lg border border-orange-100">
                      {user.name || "Not provided"}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 text-red-600 font-semibold mb-2">
                    <Mail className="w-4 h-4" />
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  {isEditing ? (
                    <input
                      name="email"
                      type="email"
                      value={editUser.email || ""}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-orange-300 px-4 py-3 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                      placeholder="your.email@example.com"
                    />
                  ) : (
                    <p className="text-gray-800 bg-orange-50 px-4 py-3 rounded-lg border border-orange-100">
                      {user.email || "Not provided"}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="flex items-center gap-2 text-red-600 font-semibold mb-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      name="phone"
                      type="tel"
                      value={editUser.phone || ""}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-orange-300 px-4 py-3 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                      placeholder="+1 (555) 000-0000"
                    />
                  ) : (
                    <p className="text-gray-800 bg-orange-50 px-4 py-3 rounded-lg border border-orange-100">
                      {user.phone || "Not provided"}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-red-600 font-semibold mb-2">
                    <MapPin className="w-4 h-4" />
                    Address
                  </label>
                  {isEditing ? (
                    <textarea
                      name="address"
                      rows="3"
                      value={editUser.address || ""}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-orange-300 px-4 py-3 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all resize-none"
                      placeholder="Enter your full address"
                    />
                  ) : (
                    <p className="text-gray-800 bg-orange-50 px-4 py-3 rounded-lg border border-orange-100 whitespace-pre-line">
                      {user.address || "Not provided"}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Order History */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-red-400">
              <div className="flex items-center gap-3 mb-6">
                <Package className="w-6 h-6 text-red-600" />
                <h3 className="text-2xl font-bold text-red-600">Order History</h3>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-orange-300 mx-auto mb-4" />
                  <p className="text-orange-800 text-lg">No orders yet</p>
                  <p className="text-orange-600 text-sm mt-1">Your order history will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order._id}
                      className="border-2 border-orange-100 rounded-xl p-5 hover:shadow-md hover:border-red-400 transition-all bg-orange-50"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(order.status)}
                          <div>
                            <p className="font-bold text-red-600 text-lg">#{order._id}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Calendar className="w-4 h-4 text-orange-500" />
                              <span className="text-sm text-orange-800">
                                {order.createdAt
                                  ? new Date(order.createdAt).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    })
                                  : "Date unavailable"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                        </span>
                      </div>

                      {(order.total || order.totalAmount) && (
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t-2 border-orange-100">
                          <DollarSign className="w-5 h-5 text-orange-700" />
                          <span className="text-orange-800 font-medium">Total:</span>
                          <span className="text-xl font-bold text-red-600">
                            Rs {(order.total || order.totalAmount).toFixed(2)}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
