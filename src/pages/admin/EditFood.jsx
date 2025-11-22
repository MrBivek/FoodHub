import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../utils/API";
import AdminSidebar from "../../components/admin/AdminSidebar";

export default function EditFood() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "Other",
    rating: 4.5,
    badge: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function loadFood() {
      try {
        setLoading(true);
        const res = await API.get(`/foods/${id}`);
        setForm({
          name: res.data.name || "",
          description: res.data.description || "",
          price: res.data.price || "",
          category: res.data.category || "Other",
          rating: res.data.rating || 4.5,
          badge: res.data.badge || "",
        });
        setPreview(res.data.image || null);
      } catch (error) {
        console.error("Failed to load food:", error);
        setMsg("Failed to load food data.");
      } finally {
        setLoading(false);
      }
    }
    loadFood();
  }, [id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const update = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([key, val]) => fd.append(key, val));
      if (image) fd.append("image", image);

      await API.put(`/foods/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMsg("Food updated successfully!");
      // Optionally redirect after update:
      // navigate("/admin/foods");
    } catch (error) {
      console.error("Update failed:", error);
      setMsg("Failed to update food.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FFF7F3]">
      <AdminSidebar />

      <main className="flex-1 p-10 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-[#E94E1B]">Edit Food</h1>

        {msg && (
          <p
            className={`mb-6 text-center font-semibold ${
              msg.includes("failed") ? "text-red-600" : "text-green-600"
            }`}
            role="alert"
          >
            {msg}
          </p>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#FF7A38] border-t-transparent" />
          </div>
        ) : (
          <form onSubmit={update} className="space-y-6">
            <label className="block">
              <span className="font-semibold mb-1 block">Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={onChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF7A38]"
              />
            </label>

            <label className="block">
              <span className="font-semibold mb-1 block">Description</span>
              <textarea
                name="description"
                value={form.description}
                onChange={onChange}
                required
                rows={4}
                className="w-full border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#FF7A38]"
              />
            </label>

            <label className="block">
              <span className="font-semibold mb-1 block">Price (Rs)</span>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={onChange}
                min="0"
                step="0.01"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF7A38]"
              />
            </label>

            <label className="block">
              <span className="font-semibold mb-1 block">Category</span>
              <select
                name="category"
                value={form.category}
                onChange={onChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF7A38]"
              >
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Drinks</option>
                <option>Snacks</option>
                <option>Other</option>
              </select>
            </label>

            <label className="block">
              <span className="font-semibold mb-1 block">Rating</span>
              <input
                type="number"
                name="rating"
                value={form.rating}
                min="0"
                max="5"
                step="0.1"
                onChange={onChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF7A38]"
              />
            </label>

            <label className="block">
              <span className="font-semibold mb-1 block">Badge (optional)</span>
              <input
                type="text"
                name="badge"
                value={form.badge}
                onChange={onChange}
                placeholder="Hot, New, Popular..."
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF7A38]"
              />
            </label>

            <div className="block">
              <span className="font-semibold mb-2 block">Food Image</span>
              <input type="file" accept="image/*" onChange={onImageChange} />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-3 w-48 h-32 object-cover rounded border border-gray-300"
                />
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-[#FF7A38] text-white rounded font-semibold hover:bg-[#e26a2d] transition disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Food"}
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
