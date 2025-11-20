import { useEffect, useState } from "react";
import API from "../../utils/API";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { Link } from "react-router-dom";

export default function FoodList() {
  const [foods, setFoods] = useState([]);

  const loadFoods = async () => {
    const res = await API.get("/foods");
    setFoods(res.data);
  };

  useEffect(() => {
    loadFoods();
  }, []);

  const deleteFood = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    await API.delete(`/foods/${id}`);
    loadFoods();
  };

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-10">
        <h1 className="text-4xl font-bold text-[#E94E1B] mb-6">Food Items</h1>

        <Link
          to="/admin/add-food"
          className="px-4 py-2 bg-[#FF7A38] text-white rounded-lg"
        >
          + Add New Food
        </Link>

        <table className="w-full mt-6 bg-white shadow rounded-xl border border-[#FF7A38]">
          <thead className="bg-[#FFE9E3]">
            <tr>
              <th className="p-3">Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {foods.map((f) => (
              <tr key={f._id} className="border-b">
                <td className="p-3">
                  <img src={f.image} className="h-16 w-20 object-cover rounded" />
                </td>
                <td>{f.name}</td>
                <td>Rs {f.price}</td>
                <td>{f.category}</td>
                <td>
                  <Link
                    to={`/admin/edit-food/${f._id}`}
                    className="text-blue-600 mr-3"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteFood(f._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
