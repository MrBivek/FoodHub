import { useParams } from "react-router-dom";
import { useOrder } from "../context/OrderContext";

const steps = ["Placed", "Preparing", "On the Way", "Delivered"];

export default function OrderTracking() {
  const { id } = useParams();
  const { getOrderById } = useOrder();
  const order = getOrderById(id);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFE9E3] px-6">
        <h2 className="text-3xl font-extrabold text-[#E94E1B] drop-shadow-md">
          Order not found ❌
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFE9E3] py-16 px-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg border border-[#FF7A38] p-10">
        <h1 className="text-4xl font-extrabold text-[#E94E1B] mb-8 text-center lg:text-left">
          Track Your Order 🚚
        </h1>

        <div className="flex flex-col lg:flex-row justify-between mb-10 gap-6 text-[#E94E1B] font-medium">
          <p>
            Order ID: <span className="font-bold">{order.id}</span>
          </p>
          <p>
            Placed on:{" "}
            <span className="font-bold">
              {order.createdAt.toLocaleString()}
            </span>
          </p>
        </div>

        {/* Progress Bar */}
        <div className="relative mb-12">
          <div className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 bg-[#FF7A38] rounded-full opacity-30"></div>
          <div
            className="absolute top-1/2 left-0 h-1 -translate-y-1/2 bg-[#E94E1B] rounded-full transition-all duration-500"
            style={{
              width: `${(order.status / (steps.length - 1)) * 100}%`,
            }}
          ></div>

          <div className="flex justify-between relative z-10">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center w-24"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-transform duration-500 ${
                    idx <= order.status
                      ? "bg-[#E94E1B] text-white shadow-lg scale-110"
                      : "bg-[#FF7A38] text-white opacity-50"
                  }`}
                >
                  {idx + 1}
                </div>
                <span
                  className={`mt-2 text-sm font-semibold transition-colors duration-500 ${
                    idx <= order.status ? "text-[#E94E1B]" : "text-[#FF7A38]"
                  }`}
                >
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Order Items */}
        <h2 className="text-2xl font-bold text-[#E94E1B] mb-4">Order Items</h2>
        <div className="space-y-3">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover border border-[#FF7A38]"
                />
                <span className="font-semibold text-[#E94E1B]">
                  {item.name} x {item.quantity}
                </span>
              </div>
              <span className="font-bold text-[#E94E1B]">
                Rs {item.price * item.quantity}
              </span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="border-t border-[#FF7A38] mt-6 pt-6 flex justify-between font-bold text-[#E94E1B] text-xl">
          <span>Total:</span>
          <span>Rs {order.totals.amount}</span>
        </div>

        {/* Action Button */}
        <button className="mt-8 w-full py-3 bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] text-white rounded-full font-bold shadow-md hover:shadow-lg hover:scale-105 transition transform duration-300">
          Contact Support 📞
        </button>
      </div>
    </div>
  );
}
