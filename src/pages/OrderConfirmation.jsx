import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle, Package, Clock, MapPin } from "lucide-react";
import API from "../utils/API";

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  const timerRef = useRef(null);
  const pollingRef = useRef(null);
  const mountedRef = useRef(true);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const loadOrder = async () => {
    if (!orderId) {
      setErr("No order ID provided");
      setLoading(false);
      return;
    }
    try {
      const res = await API.get(`/orders/${orderId}`);
      if (mountedRef.current) {
        const orderData = res.data.data || res.data;
        setOrder(orderData);
        setErr("");
      }
    } catch (e) {
      console.error("Load order error:", e);
      if (mountedRef.current) {
        setErr(e?.response?.data?.message || "Order not found");
      }
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  };

  useEffect(() => {
    mountedRef.current = true;
    loadOrder();
    return () => (mountedRef.current = false);
  }, [orderId]);

  useEffect(() => {
    if (!orderId || !order) return;
    if (order.status === "delivered" || order.status === "cancelled") return;

    pollingRef.current = setInterval(async () => {
      if (mountedRef.current) {
        try {
          const res = await API.get(`/orders/${orderId}`);
          const orderData = res.data.data || res.data;
          if (mountedRef.current) setOrder(orderData);
        } catch (e) {
          console.error("Polling order error:", e);
        }
      }
    }, 15000);

    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [orderId, order?.status]);

  useEffect(() => {
    if (!order) return;
    if (order.status === "delivered" || order.status === "cancelled") {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    setTimeLeft(30 * 60);
    timerRef.current = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return time - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [order?._id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-white to-red-50" aria-live="polite">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-500 border-t-transparent mb-4"></div>
        <p className="text-red-500 font-semibold text-lg">Loading order details...</p>
      </div>
    );
  }

  if (err || !order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-white to-red-50 font-sans px-6 py-20" aria-live="polite">
        <div className="bg-white rounded-3xl shadow-xl border border-red-500 p-12 text-center max-w-md">
          <h1 className="text-3xl font-bold text-red-500 mb-4">Order Not Found</h1>
          <p className="text-gray-700 mb-8">{err || "Unable to load order details"}</p>
          <Link
            to="/menu"
            className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition"
          >
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  const orderIdDisplay = order._id || order.id;
  const createdAt = order.createdAt
    ? new Date(order.createdAt).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })
    : "";
  const deliveryAddress = order.deliveryAddress || {};

  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 font-sans px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <CheckCircle className="w-24 h-24 text-red-500 mx-auto mb-6 animate-bounce" />
          <h1 className="text-5xl font-extrabold text-red-500 mb-4">Order Confirmed! 🎉</h1>
          <p className="text-xl text-gray-700 mb-2">Thank you for your order!</p>
          <p className="text-lg text-red-500 font-semibold">
            Order ID: <span className="font-bold">#{orderIdDisplay.slice(-8)}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg border border-red-500 p-6 text-center">
            <Package className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <h3 className="font-bold text-red-500 mb-2">Status</h3>
            <p className="text-gray-700 capitalize font-semibold">{order.status || "Pending"}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-red-500 p-6 text-center">
            <Clock className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <h3 className="font-bold text-red-500 mb-2">Placed At</h3>
            <p className="text-gray-700 text-sm">{createdAt}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-red-500 p-6 text-center">
            <Clock className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <h3 className="font-bold text-red-500 mb-2">Estimated Time</h3>
            <p className="text-red-500 font-bold text-lg">{timeLeft > 0 ? formatTime(timeLeft) : "Arriving Soon"}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-red-500 p-6 text-center">
            <MapPin className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <h3 className="font-bold text-red-500 mb-2">Delivery Address</h3>
            {deliveryAddress.street ? (
              <p className="text-gray-700 text-sm">
                {deliveryAddress.street}, {deliveryAddress.city}, {deliveryAddress.postalCode}
                <br />
                {deliveryAddress.country}
              </p>
            ) : (
              <p className="text-gray-600">No delivery address provided</p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          <Link
            to={`/track-order/${orderIdDisplay}`}
            className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition text-center"
          >
            📍 Track Your Order
          </Link>

          <Link
            to="/menu"
            className="border-2 border-red-500 text-red-500 px-8 py-4 rounded-full font-bold hover:bg-red-500 hover:text-white transition text-center"
          >
            🍴 Order More
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-red-500 p-8">
          <h2 className="text-3xl font-bold text-red-500 mb-6">Order Summary</h2>

          <div className="space-y-4">
            {order.items && order.items.length > 0 ? (
              order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-5 shadow-md border border-red-500"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image || item.img || "https://via.placeholder.com/100x100.png?text=Food"}
                      alt={`Image of ${item.name}`}
                      className="w-20 h-20 rounded-full object-cover border-2 border-red-500 shadow-md"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/100x100.png?text=Food"; }}
                    />
                    <div>
                      <span className="font-bold text-gray-900 text-lg">{item.name}</span>
                      <p className="text-gray-600 text-sm">Quantity: {item.quantity || 1}</p>
                    </div>
                  </div>
                  <span className="font-bold text-red-500 text-xl">
                    Rs {(item.priceAtOrder || item.price || 0) * (item.quantity || 1).toFixed(2)}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center py-4">No items found</p>
            )}
          </div>

          <div className="mt-8 pt-6 border-t-2 border-red-500 flex justify-between items-center">
            <span className="text-2xl font-bold text-red-500">Total:</span>
            <span className="text-3xl font-extrabold text-red-500">
              Rs {(order.totalAmount || 0).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
