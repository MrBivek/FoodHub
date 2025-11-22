import { useEffect, useState } from "react";
import API from "../services/api";

export default function FoodList() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Food List
  useEffect(() => {
    const loadFoods = async () => {
      try {
        const { data } = await API.get("/foods");
        setFoods(data);
      } catch (err) {
        console.error("Error fetching foods:", err);
        setError("Failed to load foods. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadFoods();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Available Foods</h2>

      {/* Loading */}
      {loading && <p className="text-gray-600">Loading foods...</p>}

      {/* Error */}
      {error && (
        <p className="text-red-500 font-medium bg-red-100 p-3 rounded-md mb-4">
          {error}
        </p>
      )}

      {/* Food Items */}
      <ul className="space-y-3">
        {foods.map((food) => (
          <li
            key={food._id}
            className="border p-4 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">{food.name}</span>
              <span className="text-orange-600 font-bold">${food.price}</span>
            </div>
          </li>
        ))}
      </ul>

      {/* Empty State */}
      {!loading && foods.length === 0 && (
        <p className="text-gray-500 mt-4">No food items found.</p>
      )}
    </div>
  );
}
