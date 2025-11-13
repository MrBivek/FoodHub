import { useParams, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useOrder } from "../context/OrderContext";

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const { getOrderById } = useOrder();
  const order = getOrderById(orderId);

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFE9E3] font-sans px-6 py-20">
        <h1 className="text-3xl font-bold text-[#E94E1B] mb-4">Order Not Found</h1>
        <Link
          to="/menu"
          className="text-[#FF7A38] underline hover:text-[#E94E1B]"
        >
          Back to Menu
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#FFF1EB] via-[#FFE9E3] to-[#FFD6C2] font-sans px-6 py-20">
      <CheckCircle className="w-24 h-24 text-[#FF7A38] mb-8" />
      <h1 className="text-5xl font-extrabold text-[#E94E1B] mb-4">Order Confirmed!</h1>
      <p className="text-lg text-[#E94E1B] mb-8 text-center max-w-md">
        Thank you for your order. Your order ID is <span className="font-semibold">{order.id}</span>.
      </p>
      <p className="text-[#FF7A38] mb-12 text-center max-w-md">
        Estimated delivery time: <span className="font-semibold">30 minutes</span>
      </p>

      <div className="flex flex-col sm:flex-row gap-6">
        <Link
          to={`/track-order/${order.id}`}
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
    </section>
  );
}
