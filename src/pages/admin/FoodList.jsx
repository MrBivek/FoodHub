import { useEffect, useState } from "react";
import API from "../../utils/API";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function FoodList() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const loadFoods = async () => {
    try {
      setLoading(true);
      const res = await API.get("/foods");
      setFoods(res.data);
    } catch (err) {
      console.error("Load foods error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFoods();
  }, []);

  const deleteFood = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    setDeletingId(id);
    try {
      await API.delete(`/foods/${id}`);
      await loadFoods();
    } catch (err) {
      alert("Failed to delete food item.");
      console.error("Delete error:", err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FFF7F3]">
      <AdminSidebar />

      <div className="flex-1 p-4 sm:p-6 lg:p-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#E94E1B]">Food Items</h1>
          <Link
            to="/admin/add-food"
            className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] text-white rounded-lg font-semibold hover:shadow-lg transition text-sm sm:text-base"
          >
            <Plus size={20} />
            Add New Food
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#FF7A38] border-t-transparent"></div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-[#FF7A38]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-[#FFE9E3]">
                  <tr>
                    <th className="p-3 text-left text-sm sm:text-base">Image</th>
                    <th className="p-3 text-left text-sm sm:text-base">Name</th>
                    <th className="p-3 text-left text-sm sm:text-base">Price</th>
                    <th className="p-3 text-left text-sm sm:text-base">Category</th>
                    <th className="p-3 text-left text-sm sm:text-base">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {foods.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-gray-600">
                        No food items found.
                      </td>
                    </tr>
                  ) : (
                    foods.map((f) => (
                      <tr
                        key={f._id}
                        className="border-b hover:bg-orange-50 transition"
                      >
                        <td className="p-3">
                          <img
                            src={f.image || "https://via.placeholder.com/80x60?text=No+Image"}
                            className="h-12 w-16 sm:h-16 sm:w-20 object-cover rounded"
                            alt={f.name || "Food item"}
                            loading="lazy"
                          />
                        </td>
                        <td className="p-3 text-sm sm:text-base">{f.name}</td>
                        <td className="p-3 font-bold text-[#FF7A38] text-sm sm:text-base">
                          Rs {f.price}
                        </td>
                        <td className="p-3 text-sm sm:text-base">{f.category}</td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Link
                              to={`/admin/edit-food/${f._id}`}
                              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                              aria-label={`Edit ${f.name}`}
                            >
                              <Pencil size={16} />
                            </Link>

                            <button
                              onClick={() => deleteFood(f._id)}
                              disabled={deletingId === f._id}
                              className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition disabled:opacity-60"
                              aria-label={`Delete ${f.name}`}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
