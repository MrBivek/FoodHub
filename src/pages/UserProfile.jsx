// pages/UserProfile.jsx
import { useState, useEffect } from "react";
import { Camera } from "lucide-react";
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
  const [error, setError] = useState("");

  // Load from Backend
  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await API.get("/auth/me");
        const userData = res.data.data || res.data;
        setUser(userData);
        setEditUser(userData);
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
      alert("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
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

    try {
      const res = await API.put("/auth/me", editUser);
      const updatedData = res.data.data || res.data;

      setUser(updatedData);
      setEditUser(updatedData);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed", err);
      const errorMsg = err.response?.data?.message || "Failed to update profile!";
      setError(errorMsg);
      alert(errorMsg);
    }
  };

  const handleCancel = () => {
    setEditUser(user);
    setIsEditing(false);
    setError("");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logged out!");
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl bg-[#FFE9E3]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#E94E1B] mx-auto mb-4"></div>
          <p className="text-[#E94E1B]">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFE9E3] py-12 px-6 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-[#FF7A38] p-12">
        <h1 className="text-4xl font-extrabold text-[#E94E1B] mb-12 text-center tracking-wide">
          User Profile
        </h1>

        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Profile Picture */}
        <div className="flex justify-center mb-10 relative">
          {editUser.imageUrl ? (
            <img
              src={editUser.imageUrl}
              alt="avatar"
              className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-[#FF7A38]"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-[#FF7A38] to-[#E94E1B] flex items-center justify-center text-white text-7xl font-extrabold shadow-lg border-4 border-[#FF7A38]">
              {user.name?.charAt(0)?.toUpperCase() || "?"}
            </div>
          )}

          {isEditing && (
            <>
              <label
                htmlFor="imageUpload"
                className="absolute bottom-0 right-0 bg-[#FF7A38] rounded-full p-3 cursor-pointer shadow-lg hover:bg-[#E94A1B] transition"
              >
                <Camera className="w-6 h-6 text-white" />
              </label>

              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </>
          )}
        </div>

        {/* User Info */}
        <div className="space-y-8">
          {[
            { label: "Name", name: "name", type: "text", required: true },
            { label: "Email", name: "email", type: "email", required: true },
            { label: "Phone", name: "phone", type: "tel", required: false },
          ].map(({ label, name, type, required }) => (
            <div key={name}>
              <label className="block text-[#E94E1B] font-semibold mb-2 text-lg">
                {label} {required && <span className="text-red-500">*</span>}
              </label>

              {isEditing ? (
                <input
                  name={name}
                  type={type}
                  value={editUser[name] || ""}
                  onChange={handleChange}
                  required={required}
                  className="w-full rounded-lg border border-gray-300 px-5 py-3 text-lg focus:border-[#FF7A38] focus:outline-none focus:ring-2 focus:ring-[#FF7A38]/20"
                />
              ) : (
                <p className="text-gray-800 text-xl bg-gray-50 px-4 py-3 rounded-lg shadow-inner">
                  {user[name] || "Not provided"}
                </p>
              )}
            </div>
          ))}

          {/* Address */}
          <div>
            <label className="block text-[#E94E1B] font-semibold mb-2 text-lg">
              Address
            </label>

            {isEditing ? (
              <textarea
                name="address"
                rows="4"
                value={editUser.address || ""}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-5 py-3 text-lg focus:border-[#FF7A38] focus:outline-none focus:ring-2 focus:ring-[#FF7A38]/20"
              />
            ) : (
              <p className="text-gray-800 text-xl bg-gray-50 px-4 py-3 rounded-lg shadow-inner">
                {user.address || "Not provided"}
              </p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-12 flex justify-center space-x-6">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-8 py-3 bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] text-white rounded-full font-bold hover:shadow-lg transition"
              >
                Save Changes
              </button>

              <button
                onClick={handleCancel}
                className="px-8 py-3 border-2 border-[#FF7A38] text-[#FF7A38] rounded-full font-bold hover:bg-[#FF7A38] hover:text-white transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-10 py-3 bg-[#FF7A38] text-white rounded-full font-bold hover:bg-[#E94E1B] hover:shadow-lg transition"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Order History */}
        <section className="mt-16 border-t border-[#FF7A38] pt-10">
          <h2 className="text-3xl font-extrabold text-[#E94E1B] mb-6 tracking-wide">
            Order History
          </h2>

          {orders.length === 0 ? (
            <p className="text-gray-600 italic text-lg">No past orders yet.</p>
          ) : (
            <ul className="space-y-4">
              {orders.map((o) => (
                <li
                  key={o._id}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm border hover:shadow-md transition"
                >
                  <p className="font-bold text-lg">Order #{o._id}</p>
                  <p className="text-gray-700">
                    Status: <span className="font-semibold capitalize">{o.status}</span>
                  </p>
                  {(o.total || o.totalAmount) && (
                    <p className="text-gray-700">
                      Total: Rs {(o.total || o.totalAmount).toFixed(2)}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(o.createdAt).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Logout */}
        <div className="mt-16 flex justify-center">
          <button
            onClick={handleLogout}
            className="px-10 py-3 border-2 border-[#E94E1B] text-[#E94E1B] rounded-full font-bold hover:bg-[#E94E1B] hover:text-white transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}