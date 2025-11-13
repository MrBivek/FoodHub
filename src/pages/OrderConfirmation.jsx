import { useParams, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useOrder } from "../context/OrderContext";

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const { getOrderById } = useOrder();
  const order = getOrderById(orderId);

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 font-sans px-6 py-20">
        <h1 className="text-3xl font-bold text-yellow-900 mb-4">Order Not Found</h1>
        <Link
          to="/menu"
          className="text-yellow-700 underline hover:text-yellow-900"
        >
          Back to Menu
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-yellow-100 font-sans px-6 py-20">
      <CheckCircle className="w-24 h-24 text-green-500 mb-8" />
      <h1 className="text-5xl font-extrabold text-yellow-900 mb-4">Order Confirmed!</h1>
      <p className="text-lg text-yellow-800 mb-8">
        Thank you for your order. Your order ID is <span className="font-semibold">{order.id}</span>.
      </p>
      <p className="text-yellow-700 mb-12">
        Estimated delivery time: <span className="font-semibold">30 minutes</span>
      </p>

      <div className="flex gap-6">
        <Link
          to={`/track-order/${order.id}`}
          className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition transform"
        >
          Track Your Order
        </Link>
        <Link
          to="/menu"
          className="border-2 border-yellow-400 text-yellow-600 px-8 py-3 rounded-full font-semibold hover:bg-yellow-50 transition"
        >
          Order More
        </Link>
      </div>
    </section>
  );
}
