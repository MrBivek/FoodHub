// src/pages/Checkout.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/API";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { items, totals, clear } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    postalCode: "",
    country: "Nepal",
  });

  const handlePlaceOrder = async () => {
    if (!items || items.length === 0) {
      setErr("Cart is empty");
      return;
    }

    // Build backend-friendly items array
    const orderItems = items.map(i => ({
      id: i.id,
      name: i.name,
      quantity: i.quantity,
      price: i.price,
      img: i.img
    }));

    const payload = {
      items: orderItems.map(it => ({
        id: it.id,
        name: it.name,
        quantity: it.quantity,
        price: it.price
      })),
      totalAmount: totals.amount,
      deliveryAddress: address,
    };

    try {
      setLoading(true);
      setErr("");
      const res = await API.post("/orders", payload); // POST /api/orders
      const order = res.data;
      // clear cart and go to confirmation (backend order id likely in order._id)
      clear();
      navigate(`/order-confirmation/${order._id ?? order.id ?? ""}`);
    } catch (error) {
      console.error("Place order error:", error);
      setErr(error?.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFE9E3] py-12 px-6 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-[#FF7A38] p-12">
        <h1 className="text-4xl font-extrabold text-[#E94E1B] mb-8 text-center">Checkout</h1>

        {err && <div className="mb-6 text-center text-red-600 font-semibold">{err}</div>}

        <div className="space-y-4">
          <label className="block text-[#E94E1B] font-semibold">Street</label>
          <input value={address.street} onChange={(e)=>setAddress({...address, street:e.target.value})} className="w-full rounded-lg border px-4 py-3" />

          <label className="block text-[#E94E1B] font-semibold">City</label>
          <input value={address.city} onChange={(e)=>setAddress({...address, city:e.target.value})} className="w-full rounded-lg border px-4 py-3" />

          <label className="block text-[#E94E1B] font-semibold">Postal Code</label>
          <input value={address.postalCode} onChange={(e)=>setAddress({...address, postalCode:e.target.value})} className="w-full rounded-lg border px-4 py-3" />

          <label className="block text-[#E94E1B] font-semibold">Country</label>
          <input value={address.country} onChange={(e)=>setAddress({...address, country:e.target.value})} className="w-full rounded-lg border px-4 py-3" />
        </div>

        <div className="mt-8 flex justify-between items-center">
          <div>
            <div className="text-gray-700">Total items: <strong>{totals.count}</strong></div>
            <div className="text-2xl font-bold text-[#FF7A38]">Rs {totals.amount.toFixed(2)}</div>
          </div>

          <div>
            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className={`px-6 py-3 rounded-full text-white font-bold ${loading ? "bg-gray-300 cursor-not-allowed" : "bg-gradient-to-r from-[#FF7A38] to-[#E94E1B]"}`}
            >
              {loading ? "Placing order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
