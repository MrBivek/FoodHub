// frontend/src/pages/OrderTracking.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/API";

const steps = ["Placed", "Preparing", "On the Way", "Delivered"];
const statusToIndex = {
  pending: 0,
  preparing: 1,
  "on the way": 2,
  delivered: 3,
};

export default function OrderTracking() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        const res = await API.get(`/orders/${id}`);
        if (mounted) setOrder(res.data);
      } catch (e) {
        if (mounted) setErr(e?.response?.data?.message || "Order not found");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFE9E3]">
        <div>Loading order...</div>
      </div>
    );
  }

  if (err || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFE9E3] font-sans px-6 py-20">
        <h2 className="text-2xl font-bold text-[#E94E1B]">Order not found ❌</h2>
      </div>
    );
  }

  const stepIndex = statusToIndex[order.status] ?? 0;
  const progressPercent = (stepIndex / (steps.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-[#FFE9E3] py-16 px-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-10">
        <h1 className="text-4xl font-extrabold text-[#E94E1B] mb-8 text-center lg:text-left">
          Track Your Order 🚚
        </h1>

        <div className="flex flex-col lg:flex-row justify-between mb-10 gap-6 text-gray-700 text-lg font-semibold">
          <p>Order ID: <span className="font-bold text-[#FF7A38]">{order._id}</span></p>
          <p>Placed on: <span className="font-bold text-[#FF7A38]">{ new Date(order.createdAt).toLocaleString() }</span></p>
        </div>

        {/* Progress Bar */}
        <div className="relative mb-12">
          <div className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 bg-gray-300 rounded-full"></div>
          <div
            className="absolute top-1/2 left-0 h-1 -translate-y-1/2 bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>

          <div className="flex justify-between relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center w-24 cursor-default select-none">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-transform duration-500
                    ${idx <= stepIndex ? "bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] text-white shadow-lg scale-110" : "bg-gray-300 text-gray-400"}`}
                >
                  {idx + 1}
                </div>
                <span className={`mt-2 text-sm font-semibold ${ idx <= stepIndex ? "text-[#E94E1B]" : "text-gray-400" }`}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Order Items */}
        <h2 className="text-2xl font-bold text-[#E94E1B] mb-4">Order Items</h2>
        <div className="space-y-3">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center bg-white rounded-xl p-4 hover:shadow-lg transition shadow-md border border-[#FF7A38]">
              <div className="flex items-center gap-4">
                <img src={item.image || item.img || ""} alt={item.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#FF7A38]" />
                <span className="font-semibold text-gray-900">{item.name} x {item.quantity}</span>
              </div>
              <span className="font-bold text-[#FF7A38]">Rs {((item.priceAtOrder ?? item.price ?? 0) * (item.quantity ?? 1)).toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="border-t border-[#FF7A38] mt-6 pt-6 flex justify-between font-bold text-[#E94E1B] text-xl">
          <span>Total:</span>
          <span>Rs { (order.totalAmount ?? 0).toFixed(2) }</span>
        </div>
      </div>
    </div>
  );
}
