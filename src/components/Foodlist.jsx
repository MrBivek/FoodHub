import React, { useEffect, useState } from "react";
import API from "../services/api";

function FoodList() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const { data } = await API.get("/foods");
        setFoods(data);
      } catch (err) {
        console.error("Error fetching foods:", err);
      }
    };
    fetchFoods();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Available Foods</h2>
      <ul>
        {foods.map((food) => (
          <li key={food._id}>
            {food.name} — ${food.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FoodList;
