import { useParams } from "react-router-dom";
import { useOrder } from "../context/OrderContext";

const steps = ["Placed", "Preparing", "On the Way", "Delivered"];

export default function OrderTracking() {
  const { id } = useParams();
  const { getOrderById } = useOrder();
  const order = getOrderById(id);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-50 font-sans px-6 py-20">
        <h2 className="text-2xl font-bold text-gray-800">
          Order not found ❌
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-50 py-16 px-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-10">
        <h1 className="text-4xl font-extrabold text-yellow-800 mb-8 text-center lg:text-left">
          Track Your Order 🚚
        </h1>

        <div className="flex flex-col lg:flex-row justify-between mb-10 gap-6 text-gray-600 text-lg">
          <p>
            Order ID: <span className="font-semibold">{order.id}</span>
          </p>
          <p>
            Placed on: <span className="font-semibold">{order.createdAt.toLocaleString()}</span>
          </p>
        </div>

        {/* Progress Bar */}
        <div className="relative mb-12">
          <div className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 bg-gray-200 rounded-full"></div>
          <div
            className="absolute top-1/2 left-0 h-1 -translate-y-1/2 bg-yellow-400 rounded-full"
            style={{ width: `${(order.status / (steps.length - 1)) * 100}%` }}
          ></div>

          <div className="flex justify-between relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center w-24">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-500
                  ${idx <= order.status ? "bg-yellow-500 text-white shadow-lg scale-110" : "bg-gray-200 text-gray-400"}`}
                >
                  {idx + 1}
                </div>
                <span
                  className={`mt-2 text-sm font-medium transition-colors duration-500
                  ${idx <= order.status ? "text-yellow-700" : "text-gray-400"}`}
                >
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Order Items */}
        <h2 className="text-2xl font-bold text-yellow-900 mb-4">Order Items</h2>
        <div className="space-y-3">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white/50 backdrop-blur-md rounded-xl p-4 hover:shadow-lg transition shadow-md"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover border border-yellow-200"
                />
                <span className="font-medium text-gray-900">
                  {item.name} x {item.quantity}
                </span>
              </div>
              <span className="font-bold text-yellow-900">Rs {item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="border-t border-gray-200 mt-6 pt-6 flex justify-between font-bold text-gray-900 text-xl">
          <span>Total:</span>
          <span>Rs {order.totals.amount}</span>
        </div>

        {/* Support Button */}
        <button className="mt-8 w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 rounded-full font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition transform duration-300">
          Contact Support 📞
        </button>
      </div>
    </div>
  );
}
