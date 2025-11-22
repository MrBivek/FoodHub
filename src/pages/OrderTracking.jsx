import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Package, Clock, MapPin, Phone, User, CheckCircle, Truck, ChefHat, Home
} from "lucide-react";
import API from "../utils/API";

const steps = [
  { key: "pending", label: "Order Placed", icon: Package },
  { key: "preparing", label: "Preparing", icon: ChefHat },
  { key: "on the way", label: "On the Way", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CheckCircle },
];

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
  
  const mountedRef = useRef(true);
  const intervalRef = useRef(null);

  const loadOrder = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/orders/${id}`);
      if (mountedRef.current) {
        const orderData = res.data.data || res.data;
        setOrder(orderData);
        setErr("");
      }
    } catch (e) {
      console.error("Load order error:", e);
      if (mountedRef.current) setErr(e?.response?.data?.message || "Order not found");
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  };

  useEffect(() => {
    mountedRef.current = true;
    loadOrder();
    return () => (mountedRef.current = false);
  }, [id]);

  useEffect(() => {
    if (!id || !order) return;
    if (order.status === "delivered" || order.status === "cancelled") return;

    intervalRef.current = setInterval(() => {
      if (mountedRef.current) loadOrder();
    }, 30000);

    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, [id, order?.status]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-white to-red-50">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-500 border-t-transparent mb-4"></div>
        <p className="text-red-500 font-semibold text-lg">Loading order details...</p>
      </div>
    );
  }

  if (err || !order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-white to-red-50 font-sans px-6 py-20">
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-red-500 p-12 text-center max-w-md">
          <Package className="w-24 h-24 text-red-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-red-500 mb-4">Order Not Found</h2>
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

  const stepIndex = statusToIndex[order.status] ?? 0;
  const progressPercent = (stepIndex / (steps.length - 1)) * 100;
  const isDelivered = order.status === "delivered";
  const isCancelled = order.status === "cancelled";

  const estimatedTime = order.tracking?.estimatedDelivery 
    ? new Date(order.tracking.estimatedDelivery).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    : "30 minutes";

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-16 px-6 font-sans">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-red-500 mb-4 flex items-center justify-center gap-3">
            <MapPin className="w-12 h-12" />
            Track Your Order
          </h1>
          <p className="text-gray-700 text-lg">Real-time updates on your delicious food</p>
        </div>

        {/* Order Info */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 mb-8 border-2 border-red-500">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/** Order ID */}
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-red-500 to-orange-500 p-3 rounded-full">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Order ID</p>
                <p className="font-bold text-red-500">#{(order._id || order.id).slice(-8)}</p>
              </div>
            </div>
            {/** Placed At */}
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-red-500 to-orange-500 p-3 rounded-full">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Placed At</p>
                <p className="font-bold text-gray-900">{new Date(order.createdAt).toLocaleString()}</p>
              </div>
            </div>
            {/** Estimated Delivery */}
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-red-500 to-orange-500 p-3 rounded-full">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{isDelivered ? "Delivered" : "Estimated Delivery"}</p>
                <p className="font-bold text-red-500">{isDelivered ? "Completed" : estimatedTime}</p>
              </div>
            </div>
          </div>

          {/* Status Alert */}
          {!isCancelled && (
            <div className={`p-4 rounded-xl border-2 ${isDelivered ? "bg-green-50 border-green-300" : "bg-orange-50 border-orange-300"}`}>
              <p className="text-center font-semibold text-gray-800">
                {order.tracking?.statusHistory?.slice(-1)[0]?.message || `Your order is ${order.status}`}
              </p>
              {order.tracking?.currentLocation && (
                <p className="text-center text-sm text-gray-600 mt-1">📍 {order.tracking.currentLocation}</p>
              )}
            </div>
          )}

          {isCancelled && (
            <div className="p-4 rounded-xl border-2 bg-red-50 border-red-300">
              <p className="text-center font-semibold text-red-700">❌ This order has been cancelled</p>
              {order.cancellationReason && (
                <p className="text-center text-sm text-red-600 mt-1">Reason: {order.cancellationReason}</p>
              )}
            </div>
          )}
        </div>

        {/* Progress Tracker */}
        {!isCancelled && (
          <div className="bg-white rounded-3xl shadow-2xl p-10 mb-8 border-2 border-red-500">
            <h2 className="text-2xl font-bold text-red-500 mb-8 text-center">Order Progress</h2>

            <div className="relative mb-16">
              <div className="absolute top-1/2 left-0 w-full h-2 -translate-y-1/2 bg-gray-200 rounded-full"></div>
              <div
                className="absolute top-1/2 left-0 h-2 -translate-y-1/2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all duration-1000 ease-out shadow-lg"
                style={{ width: `${progressPercent}%` }}
              ></div>

              <div className="flex justify-between relative z-10">
                {steps.map((step, idx) => {
                  const Icon = step.icon;
                  const isActive = idx <= stepIndex;
                  const isCurrent = idx === stepIndex;

                  return (
                    <div key={step.key} className="flex flex-col items-center w-24 md:w-32">
                      <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center font-bold transition-all duration-500 shadow-lg ${
                        isActive ? "bg-gradient-to-br from-red-500 to-orange-500 text-white scale-110" : "bg-gray-200 text-gray-400"
                      } ${isCurrent ? "animate-pulse ring-4 ring-red-500/30" : ""}`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <span className={`mt-3 text-sm md:text-base font-semibold text-center transition-colors duration-300 ${isActive ? "text-red-500" : "text-gray-400"}`}>
                        {step.label}
                      </span>
                      {isActive && <span className="mt-1 text-xs text-red-500 font-medium">{isCurrent ? "In Progress" : "✓ Complete"}</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Driver Info */}
        {order.tracking?.driverInfo && order.status === "on the way" && (
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border-2 border-red-500">
            <h2 className="text-2xl font-bold text-red-500 mb-6 flex items-center gap-2">
              <Truck className="w-7 h-7" /> Driver Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <User className="w-10 h-10 text-red-500" />
                <div>
                  <p className="text-sm text-gray-600">Driver Name</p>
                  <p className="font-bold text-gray-900">{order.tracking.driverInfo.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-10 h-10 text-red-500" />
                <div>
                  <p className="text-sm text-gray-600">Contact</p>
                  <a href={`tel:${order.tracking.driverInfo.phone}`} className="font-bold text-red-500 hover:underline">
                    {order.tracking.driverInfo.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delivery Address */}
        {order.deliveryAddress && (
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border-2 border-red-500">
            <h2 className="text-2xl font-bold text-red-500 mb-6 flex items-center gap-2">
              <Home className="w-7 h-7" /> Delivery Address
            </h2>
            <div className="text-gray-700 space-y-2 text-lg">
              <p>{order.deliveryAddress.street}</p>
              <p>{order.deliveryAddress.city}, {order.deliveryAddress.postalCode}</p>
              <p>{order.deliveryAddress.country}</p>
            </div>
          </div>
        )}

        {/* Order Items */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border-2 border-red-500">
          <h2 className="text-2xl font-bold text-red-500 mb-6">Order Items</h2>
          <div className="space-y-4">
            {order.items?.length > 0 ? order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 hover:shadow-lg transition border border-red-500">
                <div className="flex items-center gap-4">
                  <img
                    src={item.image || item.img || "https://via.placeholder.com/100x100.png?text=Food"}
                    alt={item.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-red-500 shadow-md"
                    onError={(e) => e.target.src="https://via.placeholder.com/100x100.png?text=Food"}
                  />
                  <div>
                    <span className="font-bold text-gray-900 text-lg block">{item.name}</span>
                    <p className="text-gray-600">Quantity: <span className="font-semibold">{item.quantity}</span></p>
                  </div>
                </div>
                <span className="font-bold text-red-500 text-xl">Rs {((item.priceAtOrder || item.price || 0)*(item.quantity || 1)).toFixed(2)}</span>
              </div>
            )) : <p className="text-gray-600 text-center py-4">No items found</p>}
          </div>
          <div className="border-t-2 border-red-500 mt-6 pt-6 flex justify-between items-center">
            <span className="text-2xl font-bold text-red-500">Total:</span>
            <span className="text-3xl font-extrabold text-red-500">Rs {(order.totalAmount || 0).toFixed(2)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/menu" className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition text-center">
            🍴 Order More Food
          </Link>
          <Link to="/profile" className="border-2 border-red-500 text-red-500 px-8 py-4 rounded-full font-bold hover:bg-red-500 hover:text-white transition text-center">
            📋 View Order History
          </Link>
        </div>
      </div>
    </div>
  );
}
