// frontend/src/pages/OrderConfirmation.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import API from "../utils/API";

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let mounted = true;
    async function loadOrder() {
      try {
        setLoading(true);
        const res = await API.get(`/orders/${orderId}`);
        if (mounted) setOrder(res.data);
      } catch (e) {
        if (mounted) setErr(e?.response?.data?.message || "Order not found");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadOrder();
    return () => {
      mounted = false;
    };
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFE9E3]">
        <div>Loading order...</div>
      </div>
    );
  }

  if (err || !order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFE9E3] font-sans px-6 py-20">
        <h1 className="text-3xl font-bold text-[#E94E1B] mb-4">Order Not Found</h1>
        <Link to="/menu" className="text-[#FF7A38] underline hover:text-[#E94E1B]">
          Back to Menu
        </Link>
      </div>
    );
  }

  // Backend uses totalAmount field in order
  const orderIdDisplay = order._id ?? order.id ?? order.id;
  const createdAt = order.createdAt ? new Date(order.createdAt).toLocaleString() : "";

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#FFF1EB] via-[#FFE9E3] to-[#FFD6C2] font-sans px-6 py-20">
      <CheckCircle className="w-24 h-24 text-[#FF7A38] mb-8" />
      <h1 className="text-5xl font-extrabold text-[#E94E1B] mb-4">Order Confirmed!</h1>
      <p className="text-lg text-[#E94E1B] mb-4 text-center max-w-md">
        Thank you for your order. Your order ID is{" "}
        <span className="font-semibold">{orderIdDisplay}</span>.
      </p>
      <p className="text-gray-700 mb-6">Placed on: <strong>{createdAt}</strong></p>
      <p className="text-[#FF7A38] mb-12 text-center max-w-md">
        Estimated delivery time: <span className="font-semibold">30 minutes</span>
      </p>

      <div className="flex flex-col sm:flex-row gap-6">
        <Link
          to={`/track-order/${order._id ?? order.id}`}
          className="bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition transform text-center"
        >
          Track Your Order
        </Link>

        <Link
          to="/menu"
          className="border-2 border-[#FF7A38] text-[#FF7A38] px-8 py-3 rounded-full font-semibold hover:bg-[#FF7A38] hover:text-white transition text-center"
        >
          Order More
        </Link>
      </div>

      {/* Order items summary */}
      <div className="mt-12 w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-[#E94E1B] mb-4">Order Summary</h2>
        <div className="space-y-3">
          {order.items.map((it, idx) => (
            <div key={idx} className="flex justify-between items-center bg-white rounded-xl p-4 shadow-md border border-[#FF7A38]">
              <div className="flex items-center gap-4">
                <img
                  src={it.image || it.img || ""}
                  alt={it.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#FF7A38]"
                />
                <span className="font-semibold text-gray-900">{it.name} x {it.quantity}</span>
              </div>
              <span className="font-bold text-[#FF7A38]">
                Rs {( (it.priceAtOrder ?? it.price ?? 0) * (it.quantity ?? 1) ).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between font-bold text-[#E94E1B] text-xl">
          <span>Total:</span>
          <span>Rs { (order.totalAmount ?? order.totals?.amount ?? 0).toFixed(2) }</span>
        </div>
      </div>
    </section>
  );
}
