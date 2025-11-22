import { useState } from "react";
import API from "../../utils/API";

export default function AddFood() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "Other",
    rating: 4.5,
    badge: "",
    isAvailable: true,
  });

  const [image, setImage] = useState(null); // File
  const [preview, setPreview] = useState(null); // Preview URL
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onImageChange = (e) => {
    if (preview) URL.revokeObjectURL(preview);

    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    // Validate rating
    if (form.rating < 0 || form.rating > 5) {
      setMsg("Rating must be between 0 and 5.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (key === "price" || key === "rating") {
          formData.append(key, Number(value));
        } else {
          formData.append(key, value);
        }
      });

      if (image) formData.append("image", image);

      await API.post("/foods", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMsg("Food item added successfully!");
      setForm({
        name: "",
        description: "",
        price: "",
        category: "Other",
        rating: 4.5,
        badge: "",
        isAvailable: true,
      });
      setImage(null);
      if (preview) URL.revokeObjectURL(preview);
      setPreview(null);
    } catch (err) {
      console.error(err);
      setMsg("Failed to add food item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#FFF7F3] px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow p-6 rounded-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Add New Food Item</h1>

        {msg && <p className="text-center mb-4">{msg}</p>}

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1">Food Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={onChange}
              required
              disabled={loading}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={onChange}
              required
              disabled={loading}
              className="w-full border p-2 rounded h-24"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1">Price (Rs)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={onChange}
              required
              disabled={loading}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={onChange}
              disabled={loading}
              className="w-full border p-2 rounded"
            >
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
              <option>Drinks</option>
              <option>Snacks</option>
              <option>Other</option>
            </select>
          </div>

          {/* Rating */}
          <div>
            <label className="block mb-1">Rating</label>
            <input
              type="number"
              name="rating"
              value={form.rating}
              min="0"
              max="5"
              step="0.1"
              onChange={onChange}
              disabled={loading}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Badge */}
          <div>
            <label className="block mb-1">Badge (Optional)</label>
            <input
              type="text"
              name="badge"
              value={form.badge}
              onChange={onChange}
              disabled={loading}
              className="w-full border p-2 rounded"
              placeholder="Hot, New, Popular..."
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-1">Food Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={onImageChange}
              disabled={loading}
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-48 h-32 object-cover mt-3 rounded border"
              />
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-2 rounded disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Adding..." : "Add Food"}
          </button>
        </form>
      </div>
    </section>
  );
}
