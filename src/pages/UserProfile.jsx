import { useState, useEffect } from "react";
import { Camera } from "lucide-react";

const LOCAL_STORAGE_KEY = "foodhubUserProfile";

export default function UserProfile() {
  const defaultUser = {
    name: "Bivek Dahal",
    email: "bivek@example.com",
    phone: "+977 9800000000",
    address: "Kathmandu, Nepal",
    // For now, no actual image URL
    imageUrl: "",
  };

  const [user, setUser] = useState(defaultUser);
  const [editUser, setEditUser] = useState(defaultUser);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setEditUser(parsedUser);
      } catch {
        // ignore errors
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };

  // For frontend only: simulate image upload by selecting a local file and preview it
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditUser((prev) => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setUser(editUser);
    setIsEditing(false);
    alert("Profile updated! (Saved in localStorage)");
  };

  const handleCancel = () => {
    setEditUser(user);
    setIsEditing(false);
  };

  const handleLogout = () => {
    alert("Logout clicked (frontend demo).");
  };

  return (
    <div className="min-h-screen bg-[#FFE9E3] py-12 px-6 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-[#FF7A38] p-12">
        <h1 className="text-4xl font-extrabold text-[#E94E1B] mb-12 text-center tracking-wide">
          User Profile
        </h1>

        {/* Profile Picture */}
        <div className="flex justify-center mb-10 relative">
          {editUser.imageUrl ? (
            <img
              src={editUser.imageUrl}
              alt="User Avatar"
              className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-[#FF7A38]"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-[#FF7A38] to-[#E94E1B] flex items-center justify-center text-white text-7xl font-extrabold shadow-lg select-none border-4 border-[#FF7A38]">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}

          {isEditing && (
            <>
              <label
                htmlFor="imageUpload"
                className="absolute bottom-0 right-0 bg-[#FF7A38] rounded-full p-3 cursor-pointer shadow-lg hover:bg-[#E94A1B] transition"
                title="Upload Profile Picture"
              >
                <Camera className="w-6 h-6 text-white" />
              </label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </>
          )}
        </div>

        {/* User Info Form */}
        <form className="space-y-8">
          {[
            { label: "Name", name: "name", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone", name: "phone", type: "tel" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label
                htmlFor={name}
                className="block text-[#E94E1B] font-semibold mb-2 text-lg"
              >
                {label}
              </label>
              {isEditing ? (
                <input
                  id={name}
                  name={name}
                  type={type}
                  value={editUser[name]}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-5 py-3 text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-[#FF7A38] transition"
                  required
                />
              ) : (
                <p className="text-gray-800 text-xl px-4 py-3 bg-gray-50 rounded-lg shadow-inner select-text">
                  {user[name]}
                </p>
              )}
            </div>
          ))}

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-[#E94E1B] font-semibold mb-2 text-lg"
            >
              Address
            </label>
            {isEditing ? (
              <textarea
                id="address"
                name="address"
                rows="4"
                value={editUser.address}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-5 py-3 text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-[#FF7A38] transition resize-none"
                required
              />
            ) : (
              <p className="text-gray-800 text-xl px-4 py-3 bg-gray-50 rounded-lg shadow-inner select-text">
                {user.address}
              </p>
            )}
          </div>
        </form>

        {/* Buttons */}
        <div className="mt-12 flex justify-center space-x-6">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                type="button"
                className="px-8 py-3 bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] text-white font-extrabold rounded-full shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                type="button"
                className="px-8 py-3 border-2 border-[#FF7A38] text-[#FF7A38] font-extrabold rounded-full hover:bg-[#FF7A38] hover:text-white transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              type="button"
              className="px-10 py-3 bg-[#FF7A38] text-white font-extrabold rounded-full shadow-md hover:bg-[#E94E1B] transition transform hover:-translate-y-1"
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
          <p className="text-gray-600 italic text-lg">No past orders yet.</p>
          {/* Replace with mapped orders later */}
        </section>

        {/* Logout */}
        <div className="mt-16 flex justify-center">
          <button
            onClick={handleLogout}
            className="px-10 py-3 border-2 border-[#E94E1B] text-[#E94E1B] font-extrabold rounded-full hover:bg-[#E94E1B] hover:text-white transition transform hover:-translate-y-1"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
