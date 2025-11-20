import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../utils/API";
import AdminSidebar from "../../components/admin/AdminSidebar";

export default function EditFood() {
  const { id } = useParams();

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

  useEffect(() => {
    async function loadFood() {
      const res = await API.get(`/foods/${id}`);
      setForm(res.data);
      setPreview(res.data.image);
    }
    loadFood();
  }, [id]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const update = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    Object.keys(form).forEach((k) => fd.append(k, form[k]));
    if (image) fd.append("image", image);

    await API.put(`/foods/${id}`, fd);
    alert("Updated!");
  };

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-4 text-[#E94E1B]">Edit Food</h1>

        <form onSubmit={update} className="space-y-4 max-w-xl">
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            className="w-full border p-2 rounded"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="price"
            type="number"
            value={form.price}
            onChange={onChange}
            className="w-full border p-2 rounded"
          />

          <select
            name="category"
            value={form.category}
            onChange={onChange}
            className="w-full border p-2 rounded"
          >
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Drinks</option>
            <option>Snacks</option>
            <option>Other</option>
          </select>

          {/* Image */}
          <div>
            <input type="file" accept="image/*" onChange={onImageChange} />
            {preview && (
              <img
                src={preview}
                className="h-32 w-48 object-cover rounded mt-3"
              />
            )}
          </div>

          <button className="px-6 py-2 bg-[#FF7A38] text-white rounded">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
